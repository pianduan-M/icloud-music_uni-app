<template>
	<!-- 推荐歌单 -->
	<view class="recommend_resource " v-if="recommendList.length">
		<view class="recommed_title">
			<view class="recommed_title_left">推荐歌单</view>
			<view class="recommed_title_right">
				<text class="more">更多</text>
				<text class="iconfont icon-rightarrow"> </text>
			</view>
		</view>
		<scroll-view :show-scrollbar="false" enhanced class="" scroll-x enable-flex>
			<view class="recommend_resource_content">
	
				<navigator hover-class="none" :url="'/pages/playlist_detail/playlist_detail?id='+item.id"
					class="recomment_item" v-for="item in recommendList" :key="item.id">
					<image :src="item.picUrl" mode="scaleFix"></image>
					<view class="recomment_name">{{item.name}}</view>
					<view class="recomment_icon" v-if="item.playCount">
						<text class="iconfont icon-play"></text>
						<text>{{item.playCount }}</text>
					</view>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			recommendList:{
				type:Array,
				default:[]
			}
		},
	}
</script>

<style lang="less">
	
	//推荐歌单
	.recommend_resource {
		margin-bottom: 20rpx;
		background-color: #fff;
		padding: 30rpx 0;
	
		// 头部
		.recommed_title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			padding: 0 30rpx;
	
			.recommed_title_left {
				font-size: 36rpx;
	
			}
	
			.recommed_title_right {
				color: #616161;
				font-size: 24rpx;
				border: 1px solid #ddd;
				padding: 0 20rpx;
				border-radius: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
	
				.iconfont {
					font-size: 20rpx;
				}
			}
		}
	
		// 内容
		.recommend_resource_content {
			height: 300rpx;
			display: flex;
			margin-left: 30rpx;
	
			.recomment_item {
				width: 200rpx;
				margin-right: 15rpx;
				color: #000000;
				font-size: 26rpx;
				font-weight: 300;
				position: relative;
	
				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 20rpx;
				}
	
				.recomment_name {
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
	
				.recomment_icon {
					position: absolute;
					right: 10rpx;
					top: 10rpx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					padding: 0 10rpx;
					border-radius: 30rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
	
			}
		}
	}
</style>
