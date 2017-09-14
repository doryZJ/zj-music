<template>
	<scroll class="listview"
					:data="data"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          @scroll="scroll"
					ref="listview">
		<ul>
			<li v-for="(group, index) in data"
          :key="index"
          class="list-group"
          ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for="item in group.items" class="list-group-item">
						<img v-lazy="item.avatar" class="avatar" alt="">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList"
            :key="index"
            class="item" 
            :data-index="index"
            :class="{'current': currentIndex === index }">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" 
         v-show="fixedTitle"
         ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading> 
    </div>
	</scroll>
</template>
<script>
import Scroll from '../scroll/scroll'
import Loading from '../loading/loading'
import { getData } from 'common/js/dom'
const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18
export default {
  name: 'listview',
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  created () {
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  components: {
    Scroll,
    Loading
  },
  mounted () {
    setTimeout(() => {
      this._calculateHeight()
    }, 20)
  },
  methods: {
    onShortcutTouchStart (e) {
      let anthorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anthorIndex = anthorIndex
      this.scrollTo(anthorIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anthorIndex = parseInt(this.touch.anthorIndex) + delta
      this.scrollTo(anthorIndex)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      list.forEach((item) => {
        height += item.clientHeight
        this.listHeight.push(height)
      })
    }
  },
  watch: {
    scrollY: {
      handler (val) {
        const listHeight = this.listHeight
        if (val > 0) {
          this.currentIndex = 0
          return
        }
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-val > height1 && -val < height2) {
            this.currentIndex = i
            this.diff = height2 + val
            return
          }
        }
        this.currentIndex = listHeight.length - 2
      }
    },
    diff: {
      handler (val) {
        let fixedTop = (val > 0 && val < TITLE_HEIGHT) ? val - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    }
  }
}
</script>
<style lang="stylus">
  @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
