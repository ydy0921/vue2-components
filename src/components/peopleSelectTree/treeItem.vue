<template>
  <div v-if="!isHideHeight" :class="['tree-children', {'leaf': !root.itemsObj[ids[0]].childrenIds}]">
    <template v-for="id in ids">
      <div v-if="root.itemsObj[id] && !selfIdsObj[id].hideHeight" class="tree-item"
           :ref="'r_' + id" :key="id">
        <div class="tree-item-detail" :style="{height: root.detailHeight}"
             @click.stop='toggle(id)'>
          <div v-if='root.itemsObj[id].childrenIds'
               :class="['tree-arrow', root.itemsObj[id][root.sStatus + 'expand'] ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"/>
          <div v-if="!noCheckBox"
               :class="['check-box','check-' + (Object.keys(root.itemsObj[id].checkedWithExcept || {}).length ? 1 : root.itemsObj[id].checked)]"
               @click.stop="toggleCheck(id, root.itemsObj[id].checked ? 0 : 2)"/>
          <img v-if='root.itemsObj[id].childrenIds' class="tree-icon" src="./department.png" alt=""/>
          <img v-if='!root.itemsObj[id].childrenIds' class="tree-icon" src="./person.png" alt=""/>
          <component v-if="root.renderContent" :is="root.renderContent" :id="id">
            <template slot-scope='{sid, searchKey}'>
              <highlight-word v-if="searchKey" :name="root.getTitle(sid)" :keyWord="searchKey"/>
              {{ !searchKey ? root.getTitle(sid) : '' }}
            </template>
          </component>
        </div>
      </div>
      <div v-else-if="selfIdsObj[id].hideHeight" :style="{height: selfIdsObj[id].hideHeight}"
           @click.stop :ref="'r_' + id" :key="id"/>
    </template>
  </div>
  <div v-else :style="{height: isHideHeight}"/>
</template>

<script>
import highlightWord from '@/components/peopleSelectTree/highlightWord'

export default {
  name: 'treeItem',
  props: ['ids', 'noCheckBox'],
  inject: ['root'],
  components: { highlightWord },
  data () {
    return {
      isHideHeight: '',
      selfIdsObj: {}
    }
  },
  watch: {
    // 'root.scrollTop': {
    //   handler: function (top) {
    //     this.$nextTick(() => {
    //       const rect = this.$el.getBoundingClientRect()
    //       if (rect.top > 1200 || rect.bottom < -100) {
    //         this.isHideHeight = rect.height + 'px'
    //       } else {
    //         this.isHideHeight = ''
    //         if (this.ids.length > 50 || this.root.itemsObj[this.ids[0]].childrenIds) {
    //           this.$nextTick(() => {
    //             this.ids.forEach(id => {
    //               if (!this.$refs['r_' + id]) {
    //                 return
    //               }
    //               const rect = this.$refs['r_' + id][0].getBoundingClientRect()
    //               if (rect.top > 1200 || rect.bottom < -100) {
    //                 this.selfIdsObj[id].hideHeight = rect.height + 'px'
    //               } else {
    //                 this.selfIdsObj[id].hideHeight = ''
    //               }
    //             })
    //           })
    //         }
    //       }
    //     })
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
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
    },
    toggleCheck (id, val) {
      // this.root.checkItem(id, val);
      // this.root.changeSelectedObj(this.root.itemsObj[id].childrenIds, id);
    },
    async toggle (id) {
    }
  },
  created () {
    this.resetIds(this.root.detailHeight)
    this.resetChecks()
  }
}
</script>

<style scoped lang="scss">
.tree-item {
  > .tree-children {
    margin-left: 15px;

    &.leaf {
      margin-left: 31px;
    }
  }
}

.tree-item-detail {
  line-height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;

  > span {
    flex: 1;
    display: flex;
    justify-self: start;
  }

  .check-box {
    width: 16px;
    height: 16px;
    margin: 0 16px 0 2px;
    border: 1px solid #d5d8de;
    border-radius: 2px;
    cursor: pointer;

    &.check-2 {
      border-color: pink;
      background-color: pink;
      position: relative;

      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 10px;
        height: 5px;
        border-style: solid;
        border-color: #ffffff;
        border-width: 0 0 2px 2px;
        transform: rotate(-45deg);
        top: 3px;
        left: 2px;
      }
    }

    &.check-1 {
      position: relative;

      &::after {
        content: "-";
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
        line-height: 60%;
        text-align: center;
        width: 100%;
        position: absolute;
        color: pink;
      }
    }
  }
}

.tree-arrow {
  width: 16px;
  height: 16px;
  margin-top: 3px;
}

.tree-icon {
  margin-right: 6px;
}
</style>
