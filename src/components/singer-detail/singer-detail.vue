<template>
    <div class="singerDetail">
      <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
      </transition>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetail } from '../../api/singer'
  import { createSong } from 'common/js/song'
  import { ERR_OK } from '../../api/config'
  import musicList from 'components/music-list/music-list'

  export default {
    name: 'singerDetail',
    data () {
      return {
        textShow: false,
        songs: []
      }
    },
    computed: {
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    mounted () {
      this.getSingerDetail()
    },
    components: {
      musicList
    },
    methods: {
      getSingerDetail () {
        getSingerDetail(this.singer.id)
          .then(res => {
            const code = res.code
            if (code === ERR_OK) {
              this.songs = this._normalizeSongs(res.data.list)
              console.log(this.songs)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      tiggerShow () {
        this.textShow = !this.textShow
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
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
