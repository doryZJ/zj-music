<template>
  <div class="recommend-view">
    <div class="recommend-content">
      <div class="slider-wrapper" ref="sliderWrapper">
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
      </div>
    </div>
  </div>
</template>
<script>
  import { getRecommend } from '../../api/recommend'
  import { ERR_OK } from '../../api/config'
  export default {
    name: 'recommend',
    data () {
      return {
      }
    },
    created () {
      this.getRecommend()
    },
    methods: {
      getRecommend () {
        getRecommend()
          .then(res => {
            if (res.code === ERR_OK) {
              console.log(res)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style lang="stylus">
  @import "~common/stylus/variable"
  .recommend-view
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    
    .recommend-content
      height: 100%
      overflow: hidden
      
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
</style>
