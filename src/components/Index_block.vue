<template>
  <div class="blocks">
    <h1>标题是:{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: "Index_block",
  props:['title']
}
</script>

<style scoped>
.blocks{
  float: left;
  width: 100%;
}
</style>
