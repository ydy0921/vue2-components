<template>
  <div id="background">
    <div class="header">
      <div/>
      <div v-for="i of 7" :key="i">
        <div>{{ week[i - 1] }}</div>
      </div>
    </div>
    <div class="content">
      <div class="time-line-wrapper">
        <div v-for="(v, i) in timeLine" :key="i"><span>{{ v }}</span></div>
      </div>
      <div class="row-line-wrapper">
        <div v-for="i of 25" :key="i"/>
      </div>
      <div class="day-task-wrapper">
        <div v-for="i of 7" :key="i">
          <day-wrapper :taskData="weekData[week[i - 1] + 'Data']"/>
        </div>
      </div>
    </div>
    <div class="bottom-line"/>
  </div>
</template>

<script>
import dayWrapper from './dayWrapper'

export default {
  name: 'background',
  components: {
    dayWrapper
  },
  props: ['weekData'],
  data () {
    return {
      week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      timeLine: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
div, /deep/ div {
  box-sizing: border-box;
}

#background {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .header {
    height: 60px;
    width: 100%;
    padding-right: 12px;
    background: #f0f5ff;
    background-clip: content-box;
    display: flex;

    > div:not(:first-child) {
      height: 100%;
      flex: 1;
      border: 1px solid #e0e2e8;
      border-left: none;
      display: flex;
      justify-content: center;
      align-items: center;

      > div:first-child {
        font-weight: bold;
        font-size: 18px;
      }
    }

    > div:first-child {
      width: 68px;
      height: 100%;
      border: 1px solid #e0e2e8;
    }
  }

  .content {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    display: flex;
    padding-right: 4px;

    .time-line-wrapper {
      height: 1500px;
      width: 68px;
      border-left: 1px solid #e0e2e8;
      border-right: 1px solid #e0e2e8;

      > div {
        height: 60px;
        border-bottom: 1px solid #e0e2e8;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f0f5ff;
      }
    }

    .row-line-wrapper {
      height: 1500px;
      flex: 1;
      border-right: 1px solid #e0e2e8;

      > div {
        border-bottom: 1px solid #e0e2e8;
        height: 60px;
      }
    }

    .day-task-wrapper {
      width: calc(100% - 72px);
      height: 1500px;
      position: absolute;
      left: 68px;
      display: flex;

      > div {
        flex: 1;
        height: 100%;
        padding-left: 4px;
        padding-right: 4px;
        margin-right: 1px;
      }

      > :hover {
        background-color: rgba(240, 245, 255, 0.5);
      }
    }
  }

  .bottom-line {
    border-top: 1px solid #e0e2e8;
    width: calc(100% - 12px);
    height: 1px;
    position: absolute;
    bottom: 0;
  }
}
</style>
