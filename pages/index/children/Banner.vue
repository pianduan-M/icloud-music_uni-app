<template>
	<!-- 轮播图 -->
	<swiper class="banner" v-if="bannerList.length" indicator-active-color="#f64649" autoplay indicator-dots circular>
		<swiper-item class="banner_item" v-for="item in bannerList" :key="item.imageUrl">
			<image :src="item.imageUrl" mode="widthFix">
				<!-- <view class="banner_title" style="{{'background:'+item.titleColor}}">{{item.typeTitle}}
				</view> -->
			</image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props:{
			bannerList:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style lang="less">
	// 轮播图
	.banner {
		background-color: #fff;
		height: 300rpx;

		.banner_item {
			// margin-right: 30rpx;
			// padding: 0 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 90%;
				border-radius: 30rpx;
				position: relative;
				vertical-align: middle;

				.banner_title {
					position: absolute;
					right: 0;
					bottom: 0;
					color: #fff;
					font-size: 26rpx;
					font-weight: 400;
					padding: 3rpx 20rpx 6rpx 20rpx;
					border-top-left-radius: 20rpx;

				}
			}
		}
	}
</style>
