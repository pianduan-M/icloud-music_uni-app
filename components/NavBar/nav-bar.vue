<template>
	<view class="nav_bar_container" :style="{marginTop:navbarTop+'px'}">
		<view class="nav_bar_left">
			<slot name="left"></slot>
		</view>
		<view class="nav_bar_center">
			<slot name="center"></slot>
		</view>
		<view class="nav_bar_right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navbarTop: 30
			}
		},

		created() {
			let res = uni.getSystemInfoSync();
			this.navbarTop = res.statusBarHeight + 5
		}
	}
</script>

<style lang="less">
	.nav_bar_container {
		position: fixed;
		top: var(--window-top);
		left: 0;
		right: 0;
		height: 40px;
		z-index: 99999;
		margin-top: 26px;
		color: #fff;
		display: flex;

		.nav_bar_left,
		.nav_bar_right {
			flex: 1;
			flex-shrink: 0;
			padding-left: 30rpx;

			.iconfont {
				padding: 20rpx;
			}
		}

		.nav_bar_center {
			flex: 3;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			overflow: hidden;
		}

	}
</style>
