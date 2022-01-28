<template>
  <div id="task-wrapper"></div>
</template>

<script>
import { arrange } from '@/components/taskWeekCalendar/arrange'

export default {
  name: 'taskWrapper',
  props: ['taskData'],
  watch: {
    taskData (n) {
      this.arrangeData = arrange(n)
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
.task-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
