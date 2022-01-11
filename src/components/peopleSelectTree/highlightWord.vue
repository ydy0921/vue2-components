<template>
  <div>
    <span v-html="ruleTitle"/>
  </div>
</template>

<script>
export default {
  name: 'highlightWord',
  props: {
    name: String,
    keyWord: String
  },
  computed: {
    ruleTitle () {
      let titleString = this.name
      if (!titleString) {
        return ''
      }
      if (this.keyWord && this.keyWord.length > 0) {
        const replaceReg = new RegExp(this.keyWord, 'g')
        const replaceString = `<span class="search-text">${this.keyWord}</span>`
        titleString = titleString.replace(replaceReg, replaceString)
      }
      return titleString
    }
  }
}
</script>
