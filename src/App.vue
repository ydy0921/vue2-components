<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    window.onresize = () => {
      const fs = Math.round(document.body.clientWidth / 192)
      document.getElementsByTagName('html')[0].style.fontSize = Math.min(24, fs * 2) + 'px'
    }
    window.onresize(undefined)
  }
}
</script>
