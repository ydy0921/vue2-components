<template>
  <div class="tree-list-wrapper">
    <el-input placeholder="请输入人员姓名" v-model="searchKey" maxlength="20" clearable @clear="clear"
              @keyup.enter.native="searchData">
    </el-input>
    <div class="tree-list" @scroll='onScrollDebounce'>
      <c-tree-item :ids="rootIds" v-if='rootIds && rootIds.length'/>
      <div v-else>未查询到相关人员</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'treeList',
  props: ['initData', 'loadItems'],
  data () {
    return {
      searchKey: null,
      rootIds: [],
      itemsObj: {
        0: {
          id: '0',
          checked: 0,
          childrenIds: this.rootIds,
          status: []
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
          // _item.expand = 0
          // _item.checkedWithExcept = {}
          // _item.search_expand = 0
          item.children && this.getChildren(key, item.children, false)
        } else {
          // _item.name = item.userName
          // _item.deptPath = item.deptPath
          // _item.policeNum = item.policeNum
          // _item.userType = item.userType
        }
        this.itemsObj[key] = _item
        // childrenIds.push(key)
      })
      // return childrenIds
    }
  },
  created () {
    const initData = [...this.initData]
    this.rootIds = initData.map(v => v.code)
    this.getChildren('0', initData)
    this.itemsObj = { ...this.itemsObj }
    // todo 根节点的childrenids为undefined
  }
}
</script>

<style scoped lang="scss">
.tree-list-wrapper {
  height: 100%;
  margin: 0 14px;
  display: flex;
  flex-direction: column;

  .el-input {
    line-height: 38px;

    /deep/ .kc-input__suffix-inner {
      margin-right: 5px;
    }
  }
}
</style>
