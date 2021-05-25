<template>
	<view class="playlist_tool">
		<view class="tool_wrap">
			<div class="tool_item">
				<text class="iconfont icon-success"></text>
				<text v-if="playlist.subscribedCount>0">{{playlist.subscribedCount | FormatPlayCount}}</text>
				<text v-if="playlist.subscribedCount<=0">收藏</text>
			</div>
			<div class="tool_item">
				<text class="iconfont icon-comment-"></text>
				<text v-if="playlist.commentCount>0">{{playlist.commentCount | FormatPlayCount}}</text>
				<text v-if="playlist.commentCount<=0">评论</text>
			</div>
			<div class="tool_item">
				<text class="iconfont icon-share"></text>
				<text v-if="playlist.shareCount>0">{{playlist.shareCount | FormatPlayCount}}</text>
				<text v-if="playlist.shareCount<=0">分享</text>
			</div>
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
	// 中间分享按钮
	.playlist_tool {
		width: 80%;
		padding: 20rpx 0;
		background-color: #fff;
		box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.1);
		margin: 0 auto;
		border-radius: 50rpx;
		transform: translateY(-50%);
		
		// 容器
		.tool_wrap {
			display: flex;
			justify-content: space-around;
	
			// 按钮项
			.tool_item {
				position: relative;
				flex: 1;
				text-align: center;
				border: none;
				padding: 0;
				background: none;
				font-size: 26rpx;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.8);
	
				&:not(:last-child)::before {
					content: '';
					position: absolute;
					right: 0;
					top: 0;
					width: 1rpx;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.5);
					transform: scaleX(0.5);
				}
	
				.iconfont {
					margin-right: 10rpx;
					font-size: 26rpx;
					font-weight: 400;
				}
			}
	
	
		}
	}
</style>
