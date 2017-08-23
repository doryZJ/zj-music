<template>
  <div class="m-header-view">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>
<script>
  export default {
    name: 'm-header'
  }
</script>
<style lang="stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  
  .m-header-view 
    positive: relative
    text-align: center
    font-size: 0
    color: #ffcd32
    height: 44px
    
    .icon 
      bg-image(logo)
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      background-size: 30px 32px
    
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
      
      
</style>