<template>
  <div id="taskWeekCalendar">
    <p>task-week-calendar</p>
    <div class="task-week-calendar-wrapper">
      <background :weekData="weekData"/>
    </div>
  </div>
</template>

<script>
import background from '../components/taskWeekCalendar/background'
import { getWeekDataApi } from '../service/taskWeekCalendar'

export default {
  name: 'taskWeekCalendar',
  components: {
    background
  },
  data () {
    return {
      weekData: []
    }
  },
  methods: {
    async getWeekData () {
      this.weekData = (await getWeekDataApi()).result
    }
  },
  created () {
    this.getWeekData()
  }
}
</script>

<style scoped lang="scss">
.task-week-calendar-wrapper {
  width: 90%;
  height: 800px;
  margin: 50px auto;
}
</style>
