<template>
	<div class="outer-container" :style="{height:this.height - 60 + 'px', width:180 + 'px'}">
		<div class="inner-container">
			<div class="content" :style="{height:this.height - 60 + 'px', width:190 + 'px'}">

				<el-menu :default-active="active" :collapse="isCollapse" unique-opened="true" background-color="#1F2D3D" text-color="#fff" active-text-color="#20a0ff">
					<tempalte v-if="secMenu.child" v-for="secMenu in menuData">
						<el-submenu :index="secMenu.id" >
							<template slot="title">
								<icon :class="secMenu.icon + '-icon'" :name="secMenu.icon"></icon>
								<span>{{ secMenu.title }}</span>
							</template>
							<template v-for="item in secMenu.child">
								<el-menu-item :index="item.url" @click="routerChange(item)">{{ item.title }}</el-menu-item>
							</template>
						</el-submenu>
					</tempalte>
					<template v-else>
						<el-menu-item :index="secMenu.url" @click="routerChange(secMenu)">
							<icon :class="secMenu.icon + '-icon'" :name="secMenu.icon"></icon>
							<span>{{ secMenu.title }}</span>
						</el-menu-item>
					</template>
				</el-menu>
			
			</div>
		</div>
	</div>
</template>

<style>
	.outer-container {
		position: relative;
		overflow: hidden;
	}
	.inner-container {
		position: absolute; left: 0;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	/* for Chrome */
	.inner-container::-webkit-scrollbar {
		display: none;
	}

	/* for svg icon */
	[class^='svg-icon'], [class*=' svg-icon']{
		width:14px;
		height:14px;
		margin-right: 5px;
	}
	.el-submenu__title{
		background-color: #324157!important
	}
</style>

<script>
export default {
  props: ['menuData', 'menu', 'isCollapse'],
  data() {
    return {
			height: document.documentElement.clientHeight,
			active:''
    }
  },
  methods: {
    routerChange(item) 	{
      // 与当前页面路由相等则刷新页面
      if (item.url != this.$route.path) {
        router.push(item.url)
      } else {
        _g.shallowRefresh(this.$route.name)
      }
    },
	  init() {
			this.height = document.documentElement.clientHeight
	  }
	},
	mounted () {
		const that = this
		window.onresize = () => {
				return (() => {
						window.screenWidth = document.documentElement.clientHeight
						that.height = window.screenWidth
				})()
		}
	},
	watch: {
		height (val) {
				this.height = val
				this.height
		}
  },
	created() {
		  this.active = this.$route.path
			this.init()
			// 延迟绑定监听
			this.$watch('$route', {deep: true,handler:function(){
				 this.active = this.$route.path
			}})
	}
}
</script>
