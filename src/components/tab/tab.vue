<template>
  <div class="tab-view">
    <router-link tag="div" class="tag-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tag-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tag-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tag-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: 'tab'
  }
</script>
<style lang="stylus">
  @import "~common/stylus/variable"
  .tab-view
    display: flex
    height: 44px
    line-height: 44px
    font-size: 
</style>
