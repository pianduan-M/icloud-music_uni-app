<template>
	<view class="like_music">
		<navigator hover-class="none" class="like_music_container"
			:url="'/pages/playlist_detail/playlist_detail?id='+playlist.like.id">
			<!-- 图片 -->
			<view class="like_music_pic">
				<image v-if="playlist.like.coverImgUrl" :src="playlist.like.coverImgUrl" mode="widthFix"></image>
				<text class="iconfont icon-xin"></text>
			</view>
			<!-- 文本 -->
			<view class="like_music_text">
				<view>我喜欢的音乐</view>
				<view class="num">
					<text class="iconfont icon-successcircle"></text>
					<text>{{playlist.like.trackCount?playlist.like.trackCount:"0"}}首</text>
				</view>
			</view>
			<!-- icon -->
			<view class="like_music_icon">
				<text class="iconfont icon-huaban"></text>
				<text>心动模式</text>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: {
			playlist: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style lang="less">
	// 喜欢的音乐
	.like_music {
		padding: 30rpx;
		margin: 20rpx 0;
		border-radius: 20rpx;
		background-color: #fff;

		.like_music_container {
			display: flex;
			align-items: center;

			.like_music_pic {
				width: 90rpx;
				height: 90rpx;
				background-color: #919191;
				border-radius: 15rpx;
				flex-shrink: 0;
				margin-right: 20rpx;
				position: relative;
				overflow: hidden;
				border: 1rpx solid #f8f8f8;

				.iconfont {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					color: #fff;
					font-size: 50rpx;
				}
			}

			.like_music_text {
				letter-spacing: 2rpx;
				font-size: 30rpx;
				font-weight: 400;
				color: rgb(39, 39, 39);
				flex: 3;

				.num {
					font-size: 20rpx;
					color: #919191;
					font-weight: 300;
					display: flex;
					align-items: center;

					.iconfont {
						font-size: 20rpx;
						color: skyblue;
						margin-right: 10rpx;
					}
				}
			}

			.like_music_icon {
				font-size: 24rpx;
				font-weight: 300;
				padding: 6rpx 10rpx;
				border: 1px solid rgba(0, 0, 0, .2);
				border-radius: 54rpx;
			}
		}
	}
</style>
