<template>
	<div class="recommend_vedio_container">

		<view class="recommed_title">
			<view class="recommed_title_left">精选音乐视频</view>
			<view class="recommed_title_right" @click="reload">
				<text class="more">换一批</text>
				<text class="iconfont icon-rightarrow"> </text>
			</view>
		</view>
		<scroll-view :show-scrollbar="false" enhanced class="" scroll-x enable-flex>
			<view class="recommend_resource_content">

				<navigator hover-class="none" class="recomment_item"
					:url="'/pages/play_video/play_video?id=' + item.data.vid" v-for="(item,index) in recommendvideos"
					:key="item.data.vid" :style="{marginRight:index===recommendvideos.length-1?'30rpx':''}">
					<image :src="item.data.coverUrl" mode="aspectFill"></image>
					<view class="recomment_name">{{item.data.title}}</view>
					<view class="recomment_icon">
						<text class="iconfont icon-play"></text>
						<text>{{item.data.praisedCount | FormatPlayCount }}</text>
					</view>
					<text class="iconfont icon-bofang "></text>
				</navigator>

			</view>

		</scroll-view>

	</div>
</template>

<script>
	import request from '@/request/index'
	// 格式化数字
	import {
		showToast
	} from '@/utils/utils.js'

	import {
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				offset: -1,
				recommendvideos: []
			}
		},
		created() {
			this.getRecommendVideo()
		},
		methods: {
			...mapMutations(['setVideos']),
			async getRecommendVideo() {
				this.offset++
				const res = await request({
					url: '/video/timeline/recommend',
					data: {
						offset: this.offset
					}
				})
				if (res.data.code !== 200) {
					return
				}
				this.recommendvideos = res.data.datas
			},
			// 换一批
			reload() {
				this.getRecommendVideo()
			}
		}
	}
</script>

<style lang="less">
	//推荐歌单
	.recommend_vedio_container {
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
			height: 320rpx;
			display: flex;
			margin: 0 30rpx;

			.recomment_item {
				width: 200rpx;
				height: 320rpx;
				margin-right: 15rpx;
				color: #000000;
				font-size: 26rpx;
				font-weight: 300;
				position: relative;

				image {
					width: 200rpx;
					height: 266rpx;
					border-radius: 20rpx;
					margin-bottom: 10rpx;
				}

				.recomment_name {
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
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

				.icon-bofang {
					position: absolute;
					right: 10rpx;
					bottom: 60rpx;
					color: #fff;
					font-size: 30px;
				}
			}
		}
	}
</style>
