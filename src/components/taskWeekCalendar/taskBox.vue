<template>
  <div v-if="taskData.hiddenData && taskData.hiddenData.length > 0" style="height: 100%">
    <el-tooltip :effect="'light task-slide-wrapper' + (isExpired ? ' grey-wrapper' : '')" placement="right-start">
      <div :class="'task-box' + (isExpired ? ' grey-box' : ' pink-box')">
        <div class="content">+{{ taskData.hiddenData.length }}</div>
      </div>
      <slide-box slot="content" :hiddenData="taskData.hiddenData" :isExpired="isExpired"/>
    </el-tooltip>
  </div>
  <div v-else class="task-box" :class="getBoxColor()" :title="taskData.startTime + '-' + taskData.endTime">
    <div class="content">{{ taskData.name }}</div>
  </div>
</template>

<script>
import slideBox from './slideBox'

export default {
  name: 'taskBox',
  props: ['taskData'],
  components: {
    slideBox
  },
  methods: {
    getBoxColor () {
      if (this.isExpired) {
        return 'grey-box'
      } else {
        // get a random number from 1 to 2
        const index = Math.floor(Math.random() * 2) + 1
        let color
        switch (index) {
          case 1:
            color = 'yellow'
            break
          case 2:
            color = 'blue'
            break
        }
        return color + '-box'
      }
    }
  },
  computed: {
    isExpired () {
      return false
    }
  }
}
</script>

<style scoped lang="scss">
.task-box {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blue-box {
  border: 1px solid rgba(8, 151, 156, 0.5);
  background: rgba(230, 255, 251, 0.5);

  &:hover {
    background: rgba(230, 255, 251, 1);
  }
}

.pink-box {
  border: 1px solid rgba(207, 19, 34, 0.5);
  background: rgba(255, 241, 240, 0.5);

  &:hover {
    background: rgba(255, 241, 240, 1);
  }
}

.yellow-box {
  background: rgba(255, 247, 230, 0.5);
  border: 1px solid rgba(212, 107, 8, 0.5);

  &:hover {
    background: rgba(255, 247, 230, 1);
  }
}

.grey-box {
  border: 1px solid rgba(207, 216, 220, 1);
  background: rgba(236, 239, 241, 0.5);

  &:hover {
    background: rgba(236, 239, 241, 1);
  }
}

.content {
  font-size: 14px;
}
</style>

<style lang="scss">
.task-slide-wrapper {
  width: 58px !important;
  border-radius: 8px;
  padding: 0 !important;
  background: #fffdfd !important;
  border: 1px solid #ffccc7 !important;

  .popper__arrow {
    display: none !important;
  }
}

.grey-wrapper {
  background: #fbfcff !important;
  border: 1px solid #e0e2e8 !important;
}
</style>
