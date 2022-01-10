<template>
  <div></div>
</template>

<script>
export default {
  name: 'treeItem',
  props: ['ids'],
  inject: ['root'],
  data () {
    return {
      selfIdsObj: {}
    }
  },
  watch: {},
  methods: {
    resetIds (detailHeight) {
      const idsObj = {}
      this.ids.forEach((id, i) => {
        if (this.root.itemsObj[id] && this.root.itemsObj[id].childrenIds) {
          const total = this.root.itemsObj[id].leafIds ? this.root.itemsObj[id].leafIds.length : 0
          idsObj[id] = {
            currentPage: total / this.root.pageCount,
            hideHeight: ''
          }
        } else {
          idsObj[id] = { hideHeight: i > 50 && detailHeight ? detailHeight : '' }
        }
      })
      this.selfIdsObj = idsObj
    },
    resetChecks () {
      // const val = this.checked;
      // (val === 0 || val === 2) && this.ids.forEach((id, i) => {
      //   val || (this.root.itemsObj[id].checkedWithExcept = {})
      //   this.root.itemsObj[id].checked = val
      //   if (this.root.exceptItems[id]) {
      //     setTimeout(() => {
      //       delete this.root.exceptItems[id]
      //       this.root.checkItem(id, 0)
      //     })
      //   }
      // })
    }
  },
  created () {
    this.resetIds(this.root.detailHeight)
    this.resetChecks()
  }
}
</script>

<style scoped lang="scss">

</style>
