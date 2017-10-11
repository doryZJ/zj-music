<template>
  <div class="singer-view" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
  import { getSingerList } from '../../api/singer'
  import { ERR_OK } from '../../api/config'
  import Singer from 'common/js/singer'
  import ListView from '../../base/listview/listview'
  import { mapMutations } from 'vuex'
  import * as types from '../../store/mutations_types'
  import {playlistMixin} from 'common/js/mixin'
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default {
    name: 'singer',
    mixins: [playlistMixin],
    data () {
      return {
        singers: []
      }
    },
    created () {
      this.getSingerList()
    },
    components: {
      ListView
    },
    methods: {
      ...mapMutations({
        setSinger: types.SET_SINGER
      }),
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger (singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      getSingerList () {
        getSingerList()
          .then(res => {
            if (res.code === ERR_OK) {
              const data = res.data.list
              this.singers = this.normalizeSinger(data)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      normalizeSinger (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          let key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    }
  }
</script>
<style lang="stylus">
  .singer-view
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
