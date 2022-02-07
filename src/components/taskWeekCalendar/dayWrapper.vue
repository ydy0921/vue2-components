<template>
  <div id="day-wrapper">
    <template v-for="(item, index) in arrangeData">
      <template v-for="(item1, index1) in item">
        <template v-for="(item2, index2) in item1">
          <div class="task-box-wrapper" :key="index + '-' + index1 + '-' + index2"
               :style="{height: ((item2.d < 30 ? 30 : item2.d) / 20) + 'rem', width: (item2.w * 100 / arrangeData[index].length).toFixed(2) + '%', left: index1 === 0 ? 0: (index1 * 100 / arrangeData[index].length).toFixed(2) + '%', top: (item2.s / 20) + 'rem'}">
            <task-box :taskData="item2"/>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { arrange } from './arrange'
import taskBox from './taskBox'

export default {
  name: 'taskWrapper',
  props: ['taskData', 'week'],
  components: {
    taskBox
  },
  watch: {
    taskData (n) {
      this.arrangeData = arrange(n, this.week === 'Sunday')
    }
  },
  data () {
    return {
      arrangeData: []
    }
  }
}
</script>

<style scoped lang="scss">
#day-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .task-box-wrapper {
    position: absolute;
    padding: 2px 2px calc(0.1rem + 1px) 2px;
  }
}
</style>
