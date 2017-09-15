<template>
  <transition name="slide">
    <div class="singerDetail"></div>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetail } from '../../api/singer'
  export default {
    name: 'singerDetail',
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    mounted () {
      this.getSingerDetail()
    },
    methods: {
      getSingerDetail () {
        getSingerDetail(this.singer.id)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style lang="stylus">
  .singerDetail
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 100
    background: #222
    
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
