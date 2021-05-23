<template>
	<navigator class="list_item" :url="'/pages/playlist_detail/playlist_detail?id='+playlist.id" >
		<!-- 图片 -->
		<view class="cover">
			<image class="cover_img" :src=" playlist.coverImgUrl " mode="widthFix"></image>
		</view>
		<!-- 歌曲信息 -->
		<view class="song_info">
			<view class="song_name_wrap">
				<view class="song_name" v-html="FormatHighText(playlist.name)"></view>
				<view class="singer_wrap">
					<text class="playlist_info">{{playlist.trackCount}}首音乐 </text>
					<text class="playlist_info">by {{playlist.creator.nickname}},</text>
					<text class="playlist_info">播放{{playlist.playCount | FormatPlayCount}}次</text>
				</view>
			</view>

		</view>

	</navigator>
</template>

<script>
	
	export default {
		props: {
			playlist: {
				type: Object,
				default: {}
			},
			hightext: {
				type: String,
			}
		},
		methods: {
			FormatHighText(text) {
				if (!this.hightext) return text
				// 高亮文字
				var reg = new RegExp(this.hightext, 'i')
				return text.replace(reg, `<span style='color:#55aaff'>${this.hightext}</span>`)
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

		// 左侧封面
		.cover {
			width: 100rpx;
			height: 100rpx;
			overflow: hidden;
			flex-shrink: 0;
			border-radius: 20rpx;
			margin-right: 20rpx;

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
