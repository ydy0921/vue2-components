<template>
  <div class="tree-list-wrapper">
    <el-input placeholder="请输入人员姓名" v-model="searchKey" maxlength="20" clearable @clear="clear"
              @keyup.enter.native="searchData">
    </el-input>
    <div class="tree-list" @scroll='onScrollDebounce'>
      <tree-item :ids="rootIds" v-if='rootIds && rootIds.length'/>
      <div v-else>未查询到相关人员</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import treeItem from './treeItem'

export default {
  name: 'treeList',
  props: ['initData', 'loadItems'],
  components: { treeItem },
  provide () {
    return {
      root: this
    }
  },
  data () {
    const root = this
    return {
      searchKey: null,
      sStatus: '',
      rootIds: [],
      itemsObj: {
        0: {
          id: '0',
          checked: 0,
          childrenIds: [],
          status: []
        }
      },
      onScrollDebounce: _.debounce(this.onScroll, 200),
      scrollTop: 0,
      detailHeight: '1.3rem',
      renderContent: {
        props: ['id'],
        render () {
          return <span class="tree-name">
            <span title={root.getTitle(this.id)}>
              {this.$scopedSlots.default({
                sid: this.id,
                searchKey: root.searchKey
              })}
            </span>
          </span>
        }
      }
    }
  },
  methods: {
    async searchData () {
    },
    clear () {
      this.searchKey = ''
      this.searchData()
    },
    getChildren (pid, items, isLeaf) {
      const leafIds = []
      items && items.forEach(item => {
        const children = item.children && item.children.map(v => v.code)
        // code for department, id for user
        const key = item.code || item.id
        const _item = this.itemsObj[key] || {
          id: key,
          name: item.name,
          checked: item.checked || 0
        }
        // pCode for department, pid for user
        _item.pid = item.pCode || pid
        if (!isLeaf) {
          // department
          _item.childrenIds = children || []
          _item.leafIds = null
          // _item.searchIds = null
          _item.expand = 0
          // _item.checkedWithExcept = {}
          // _item.search_expand = 0
          item.children && this.getChildren(key, item.children, false)
        } else {
          // user
          _item.name = item.userName
          _item.deptCode = item.deptCode
        }
        this.itemsObj[key] = _item
        leafIds.push(key)
      })
      // for loadData
      return leafIds
    },
    onScroll (e) {
      this.scrollTop = e.target.scrollTop
    },
    getTitle (id) {
      return this.itemsObj[id].name + (this.itemsObj[id].childrenIds ? '' : `（${id}）`)
    },
    async loadData (id) {
      if (!id || (!this.sStatus && this.itemsObj[id].leafIds)) {
        return
      }
      const result = await this.loadItems(id)
      const items = this.getChildren(id, result, true)
      this.itemsObj = { ...this.itemsObj }
      const key = this.sStatus ? 'searchIds' : 'leafIds'
      this.itemsObj[id][key] = items
    }
  },
  created () {
    this.rootIds = this.initData.map(v => v.code)
    this.itemsObj['0'].childrenIds = this.rootIds
    this.getChildren('0', this.initData)
    this.itemsObj = { ...this.itemsObj }
  }
}
</script>

<style scoped lang="scss">
.tree-list-wrapper {
  height: 100%;
  margin: 0 14px;
  display: flex;
  flex-direction: column;

  > .tree-list {
    flex: 1;
    overflow-y: auto;
    position: relative;
    margin-top: 16px;
  }
}
</style>
