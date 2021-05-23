<template>
	<view class="list_item">

		<!-- 序列 -->
		<view class="num"  :style="{fontSize: index>=99?'24rpx':''}">{{ index + 1}}</view>
		<!-- 歌曲信息 -->
		<view class="item_info">
			<view class="item_name_wrap">
				<view class="item_name">{{song.name}}</view>
				<view class="singer_wrap">
					<span class="tag" v-if="song.fee == '1'">VIP</span>
					<text class="tag" v-if="song.privilege && song.privilege.maxbr === 999000">SQ</text>
					<text class="singer">{{song.ar[0].name}}-{{song.al.name}}</text>
				</view>
			</view>
			<view class="icon" v-if="song.mv !== 0">
				<text class="iconfont icon-bofang"></text>
			</view>
		</view>
		<!-- 右侧菜单栏 -->
		<view class="item_menu">
			<text class="iconfont icon-diandiandianshu"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			song: {
				type: Object,
				default: {}
			},
			index:{
				type:Number
			}
		}
	}
</script>

<style lang="less">
	// 列表项
	.list_item {
		padding: 10rpx 0 !important;
		display: flex;
		align-items: center;
		// 左侧序列
		.num {
			width: 80rpx;
			flex-shrink: 0;
			text-align: center;
			color: #919191;

			.iconfont {
				color: var(--themeColor);
			}
		}

		// 中间歌曲信息
		.item_info {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;

			.item_name_wrap {
				width: 100%;
				overflow: hidden;

				.item_name {
					width: 100%;

					font-size: 32rpx !important;
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

				.singer {
					// display: block;
					width: 100%;
					font-weight: 300;
					font-size: 24rpx;
					color: #919191;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				// vip 标识
				.tag {
					position: relative;
					top: -1rpx;
					font-size: 10rpx;
					color: var(--themeColor);
					margin-right: 8rpx;
					padding: 3rpx 10rpx;
					line-height: 10rpx;
					transform: scaleY(0.5);
					
					&::after {
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						border: 1rpx solid rgba(249, 71, 71, 0.3);
						border-radius: 10rpx;
						transform: scaleY(0.8);
					}
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
