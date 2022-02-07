<template>
  <div id="task-box" :class="getBoxColor()" :title="taskData.startTime + '-' + taskData.endTime">
    <div class="content">{{ taskData.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'taskBox',
  props: ['taskData'],
  methods: {
    getBoxColor () {
      // get a random number from 1 to 4
      const index = Math.floor(Math.random() * 4) + 1
      let color
      switch (index) {
        case 1:
          color = 'yellow'
          break
        case 2:
          color = 'blue'
          break
        case 3:
          color = 'grey'
          break
        case 4:
          color = 'pink'
          break
      }
      return color + '-box'
    }
  }
}
</script>

<style scoped lang="scss">
#task-box {
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
