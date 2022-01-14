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
          <img v-if='root.itemsObj[id].childrenIds' class="department-icon"
               src="../../assets/peopleSelectTree/department.png" alt=""/>
          <img v-if='!root.itemsObj[id].childrenIds' class="person-icon" src="../../assets/peopleSelectTree/person.png"
               alt=""/>
          <component v-if="root.renderContent" :is="root.renderContent" :id="id">
            <template slot-scope='{sid, searchKey}'>
              <highlight-word v-if="searchKey" :name="root.getTitle(sid)" :keyWord="searchKey"/>
              {{ !searchKey ? root.getTitle(sid) : '' }}
            </template>
          </component>
        </div>
        <!--users-->
        <tree-item :ids="root.itemsObj[id].leafIds" :checked='root.itemsObj[id].checked'
                   v-if="!root.sStatus && root.itemsObj[id].expand && root.itemsObj[id].leafIds && root.itemsObj[id].leafIds.length"/>
        <!--departments-->
        <tree-item :ids="root.itemsObj[id].childrenIds" :checked='root.itemsObj[id].checked'
                   v-if='root.itemsObj[id][root.sStatus + "expand"] && root.itemsObj[id].childrenIds && root.itemsObj[id].childrenIds.length'/>
      </div>
      <div v-else-if="selfIdsObj[id].hideHeight" :style="{height: selfIdsObj[id].hideHeight}"
           @click.stop :ref="'r_' + id" :key="id"/>
    </template>
  </div>
  <div v-else :style="{height: isHideHeight}"/>
</template>

<script>
import highlightWord from './highlightWord'

export default {
  name: 'treeItem',
  props: ['ids', 'noCheckBox', 'checked'],
  inject: ['root'],
  components: { highlightWord },
  data () {
    return {
      isHideHeight: '',
      selfIdsObj: {}
    }
  },
  watch: {
    checked () {
      this.resetChecks()
    },
    ids: {
      handler: function () {
        this.resetIds()
        this.resetChecks()
      },
      immediate: true
    },
    'root.scrollTop': {
      handler: function () {
        this.rootScroll()
      },
      immediate: true
    }
  },
  methods: {
    rootScroll () {
      this.$nextTick(() => {
        const rect = this.$el.getBoundingClientRect()
        if (rect.top > 1200 || rect.bottom < -100) {
          this.isHideHeight = rect.height + 'px'
        } else {
          this.isHideHeight = ''
          this.$nextTick(() => {
            this.ids.forEach(id => {
              if (!this.$refs['r_' + id]) {
                return
              }
              const rect = this.$refs['r_' + id][0].getBoundingClientRect()
              if (rect.top > 1200 || rect.bottom < -100) {
                this.selfIdsObj[id].hideHeight = rect.height + 'px'
              } else {
                this.selfIdsObj[id].hideHeight = ''
              }
            })
          })
        }
      })
    },
    resetIds () {
      const idsObj = {}
      this.ids.forEach(id => {
        if (this.root.itemsObj[id] && this.root.itemsObj[id].childrenIds) {
          // departments
          idsObj[id] = { hideHeight: '' }
        } else {
          // users
          idsObj[id] = { hideHeight: this.root.detailHeight }
        }
      })
      this.selfIdsObj = idsObj
      this.rootScroll()
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
      if (this.selfIdsObj[id] && this.root.itemsObj[id] && this.root.itemsObj[id].childrenIds) {
        // only departments have childrenIds
        const expand = this.root.sStatus + 'expand'
        this.root.itemsObj[id][expand] = this.root.itemsObj[id][expand] ? 0 : 2
        this.root.itemsObj[id][expand] && await this.root.loadData(id)
      }
    }
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

  > .tree-item-detail {
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
}

.tree-arrow {
  width: 16px;
  height: 16px;
}

.department-icon {
  width: 15px;
  height: 13px;
  margin-right: 6px;
}

.person-icon {
  width: 14px;
  height: 16px;
  margin-right: 6px;
}
</style>
