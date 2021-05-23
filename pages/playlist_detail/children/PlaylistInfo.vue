<template>
	<view class="playlist_detail_info" v-if="playlist.coverImgUrl">
		<view class="info_bg">
			<image :src="playlist.coverImgUrl" mode="widthFix"></image>
			<!-- 遮罩层 -->
			<view></view>
		</view>
		<!-- 信息左侧内容 -->
		<view class="playlist_detail_left">
			<image :src="playlist.coverImgUrl" mode="widthFix"></image>
			<view class="play_count" v-if="playlist.playCount">
				<text class="iconfont icon-play"></text>
				<text>{{playCount}}</text>
			</view>
		</view>
		<!-- 信息右侧内容 -->
		<view class="playlist_detail_right">
			<!-- 歌单名字 -->
			<view class="playlist_detail_name">
				<view class="playlist_name">{{playlist.name}}</view>
				<!-- 歌单创建者信息 -->
				<view class="user_info">
					<!-- 头像 -->
					<view class="user_avatar">
						<image :src="playlist.creator.avatarUrl" mode="widthFix"></image>
					</view>
					<!-- 昵称 -->
					<view class="user_name">
						<text>{{playlist.creator.nickname}}</text>
						<text class="iconfont icon-rightarrow"></text>
					</view>
				</view>
			</view>
			<!-- 歌单信息 -->
			<navigator class="playlist_desc">
				<text class="desc">{{playlist.description?playlist.description:'编辑信息'}}</text>
				<text class="iconfont icon-rightarrow"></text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			playlist: {
				type: Object,
				default: {}
			}
		},
		mounted() {},
		computed: {
			playCount() {
				if (!this.playlist.playCount) return 
				
				if (this.playlist.playCount >= 100000000) {
					return Math.round(this.playlist.playCount / 10000000) / 10 + '亿'
				} else if (this.playlist.playCount >= 10000) {
					return Math.round(this.playlist.playCount / 1000) / 10 + '万'
				} else {
					return this.playlist.playCount
				}
			}
		}
	}
</script>

<style lang="less">
	// 头部歌单信息区
	view.playlist_detail_info {
		position: relative;
		display: flex;
		height: 400rpx;
		overflow: hidden;
		align-items: center;
		padding: 30rpx;

		// 信息区背景
		.info_bg {
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			filter: blur(80rpx);
			width: 100%;
			height: 100%;
			transform: scale(1.5);

			view {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
			}
		}

		// 左侧封面
		view.playlist_detail_left {
			position: relative;
			width: 200rpx;
			height: 200rpx;
			background-color: #f6f6f6;
			border-radius: 15rpx;
			overflow: hidden;
			margin-right: 30rpx;
			flex-shrink: 0;

			// 播放数
			.play_count {
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				font-size: 20rpx;
				color: #fff;
				background-color: rgba(0, 0, 0, .5);
				padding: 0 10rpx;
				border-radius: 20rpx;

				.iconfont {
					font-size: 20rpx;

				}
			}

		}

		// 右侧歌单信息区
		view.playlist_detail_right {
			display: flex;
			height: 200rpx;
			flex-direction: column;
			justify-content: space-between;
			color: #fff;

			// 歌单信息
			view.playlist_detail_name {
				width: 200px;
				overflow: hidden;

				// 名字
				.playlist_name {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				// 创建者信息
				.user_info {
					margin-top: 15rpx;
					display: flex;
					align-items: center;

					// 头像
					view.user_avatar {
						width: 50rpx;
						height: 50rpx;
						overflow: hidden;
						border-radius: 50%;
						margin-right: 15rpx;
					}

					// 昵称
					view.user_name {
						font-size: 24rpx;
						font-weight: 300;

						.iconfont {
							font-size: 24rpx;
						}
					}
				}
			}

			// 歌单描述
			.playlist_desc {
				width: 100%;
				font-size: 24rpx;
				font-weight: 300;
				display: flex;
				align-items: center;

				.desc {
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}

				.iconfont {
					font-size: 24rpx;
					float: right;
				}
			}
		}
	}
</style>
