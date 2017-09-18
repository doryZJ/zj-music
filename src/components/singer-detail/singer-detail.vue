<template>
    <div class="singerDetail">
      <transition name="custom-transition"
              enter-active-class="animated tada"
              leave-active-class="animated bounceOutRight">
        <p v-show="textShow">123</p>
      </transition>
      <div class="show" @click="tiggerShow"></div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetail } from '../../api/singer'
  export default {
    name: 'singerDetail',
    data () {
      return {
        textShow: false
      }
    },
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
      },
      tiggerShow () {
        this.textShow = !this.textShow
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
    p
      width: 200px
      height: 50px
      background: #fff
      color: #000
    
  // .slide-enter-active, .slide-leave-active
  //   transition: all 0.3s

  // .slide-enter, .slide-leave-to
  //   transform: translate3d(100%, 0, 0)
</style>
