<template>
	<scroll class="listview"
					:data="data"
					ref="listview">
		<ul>
			<li v-for="group in data" class="list-group">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for="item in group.items" class="list-group-item">
						<img v-lazy="item.avatar" class="avatar" alt="">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
	</scroll>
</template>
<script>
import Scroll from '../scroll/scroll'
export default {
  name: 'listview',
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll
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
</style>
