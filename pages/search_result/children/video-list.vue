<template>
	<view class="list_item" @click="toPlay">
		<!-- 图片 -->
		<view class="cover">
			<image class="cover_img" :src=" video.coverUrl " mode="widthFix"></image>
			<span class="iconfont icon-bofang"></span>
		</view>
		<!-- 歌曲信息 -->
		<view class="song_info">
			<view class="song_name_wrap">
				<view class="song_name" v-html="FormatHighText(video.title)"></view>
				<view class="singer_wrap">
					<text class="playlist_info">{{video.durationms | FormatDate}} </text>
					<text class="playlist_info">by {{video.creator.userName}},</text>
					<text class="playlist_info">播放{{video.playTime | FormatPlayCount}}次</text>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		props: {
			video: {
				type: Object,
				default: {}
			},
			hightext: {
				type: String,
				default: ''
			}
		},
		methods: {
			FormatHighText(text) {
				if (!this.hightext) return text
				// 高亮文字
				var reg = new RegExp(this.hightext, 'i')
				return `<span style="overflow: hidden;">${text.replace(reg, `<span style='color:#55aaff'>${this.hightext}</span>`)}</span>`
			},
			toPlay() {
				uni.navigateTo({
					url: '/pages/play_video/play_video?id=' + this.video.vid
				})
			}
		}
	}
</script>

<style lang="less">
	// 列表项
	.list_item {
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		max-width: 100vw;
		overflow: hidden;

		// 左侧封面
		.cover {
			width: 180rpx;
			height: 101.2rpx;
			overflow: hidden;
			flex-shrink: 0;
			border-radius: 10rpx;
			margin-right: 20rpx;
			position: relative;

			.iconfont {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: white;
			}

			.img {
				width: 100%;
			}
		}

		// 中间歌曲信息
		.song_info {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;

			.song_name_wrap {
				width: 100%;
				overflow: hidden;

				.song_name {
					width: 100%;

					font-size: 32rpx;
					color: rgba(0, 0, 0, 0.8);
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.singer_wrap {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;

				}

				.playlist_info {
					width: 100%;
					font-weight: 300;
					font-size: 24rpx;
					color: #919191;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-right: 10rpx;
				}

			}

			.icon {
				width: 50rpx;
				flex-shrink: 0;
				text-align: center;
				transform: scale(1.1);
				color: #919191;
			}

		}

		// 右侧菜单btn
		.item_menu {
			flex-shrink: 0;
			width: 80rpx;
			flex-shrink: 0;
			text-align: center;
		}
	}
</style>
