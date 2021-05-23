<template>
	<!-- 歌单内容头部区域 -->
	<view class="playlist_content_head">
		<view class="head_left">
			<text class="iconfont icon-play1"></text>
		</view>
		<view class="head_center">
			<view class="text">
				<text>播放全部</text>
				<text class="num">({{playlist.tracks.length}})</text>
			</view>
			<view class="icon">
				<text class="iconfont icon-xiazai"></text>
			</view>
		</view>
		<view class="head_right">
			<text class="iconfont icon-select"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			playlist:{
				type:Object,
				default:{}
			}
		}
	}
</script>

<style lang="less">
	// 头部功能区
	.playlist_content_head {
		display: flex;
	
		.head_left {
			width: 80rpx;
			flex-shrink: 0;
			text-align: center;
	
			.iconfont {
				color: var(--themeColor);
			}
		}
	
		.head_center {
			width: 100%;
			display: flex;
			justify-content: space-between;
	
			.num {
				font-size: 24rpx;
				color: #919191;
				margin-left: 10rpx;
			}
	
			.icon {
				width: 50rpx;
				flex-shrink: 0;
				text-align: center;
				transform: scale(1.2);
			}
		}
	
		.head_right {
			width: 80rpx;
			flex-shrink: 0;
			text-align: center;
		}
	}
</style>
