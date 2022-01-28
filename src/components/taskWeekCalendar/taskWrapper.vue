<template>
  <div id="task-wrapper"></div>
</template>

<script>
export default {
  name: 'taskWrapper',
  props: ['taskData']
}
</script>

<style scoped lang="scss">
.task-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
