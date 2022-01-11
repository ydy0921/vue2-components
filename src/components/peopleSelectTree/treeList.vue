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
      // const childrenIds = []
      items && items.forEach(item => {
        const children = item.children && item.children.map(v => v.code)
        const key = item.code
        const _item = this.itemsObj[key] || {
          id: key,
          name: item.name,
          checked: item.checked || 0
        }
        _item.pid = item.pCode || pid
        if (!isLeaf) {
          _item.childrenIds = children || []
          // _item.code = item.code
          // _item.leafIds = null
          // _item.searchIds = null
          _item.expand = 0
          // _item.checkedWithExcept = {}
          // _item.search_expand = 0
          item.children && this.getChildren(key, item.children, false)
        } else {
          // _item.name = item.userName
          // _item.deptPath = item.deptPath
          // _item.personId = item.id
          // _item.userType = item.userType
        }
        this.itemsObj[key] = _item
        // childrenIds.push(key)
      })
      // return childrenIds
    },
    onScroll (e) {
      this.scrollTop = e.target.scrollTop
      console.log(this.scrollTop)
    },
    getTitle (id) {
      let text = this.itemsObj[id].name
      text += this.itemsObj[id].personId ? `（${this.itemsObj[id].personId}）` : ''
      return text
    },
    async loadData (id) {
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
