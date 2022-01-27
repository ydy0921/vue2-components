<template>
  <div id="taskWeekCalendar">
    <p>task-week-calendar</p>
    <div class="task-week-calendar-wrapper">
      <background/>
    </div>
  </div>
</template>

<script>
import background from '../components/taskWeekCalendar/background'

export default {
  name: 'taskWeekCalendar',
  components: {
    background
  }
}
</script>

<style scoped lang="scss">
.task-week-calendar-wrapper {
  width: 80%;
  height: 800px;
  margin: 50px auto;
}
</style>
