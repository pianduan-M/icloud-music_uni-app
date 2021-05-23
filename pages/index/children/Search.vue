<template>
	<!-- head 搜索框 -->
	<view class="search_wrap">
		<button @click="goSearch">
			<icon class="" type="search" size="20" color="#919191"></icon>
			<text>搜索</text>
		</button>
	</view>
</template>

<script>
	export default {
		methods:{
			// 跳转搜索页面
			goSearch() {
				// 跳转到搜索页面
				uni.navigateTo({
					url: '/pages/search/search',
				});
			},
		}
	}
</script>

<style lang="less">
	// 搜索框
	.search_wrap {
		padding: 30rpx;
		background-color: #fff;
		position: fixed;
		top: var(--window-top);
		left: 0;
		right: 0;
		height: 70px;
		z-index: 1;
		box-sizing: border-box;

		button {
			width: 100%;
			background-color: #f8f8f8;
			border-radius: 90rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-size: 28rpx;
			font-weight: 300;
			color: #919191;

			&::after {
				border-radius: 90rpx;
			}
		}
	}
</style>
