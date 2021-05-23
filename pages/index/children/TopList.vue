<template>
	<!-- 排行榜 -->
	<view class="hot_top" v-if="topList.length">
		<!-- 标题 -->
		<view class="hot_top_title">
			<view class="hot_title_left">排行榜</view>
			<view class="hot_title_right">
				<text class="more">更多</text>
				<text class="iconfont icon-rightarrow"> </text>
			</view>
		</view>
		<!-- 榜单内容 -->
		<swiper class="hot_top_main" next-margin="50rpx">
			<!-- 榜单项 -->
			<swiper-item class="hot_top_item" v-for="item in topList" :key="item.id">

				<view class="top_content">
					<view class="top_title">
						<text>{{item.name}}</text>
						<text class="iconfont icon-rightarrow"></text>
					</view>
					<view class="top_row" v-for="(item2,index) in item.tracks" :key="item2.id" :index="item.topnum"
						:data-parentId="item.id" :data-id="item2.id" bindtap="toPlay">
						<view class="song_cover">
							<image :src="item2.al.picUrl" mode="widthFix"> </image>
						</view>
						<view class="song_info_wrap">
							<view class="song_num">{{index+1}}</view>
							<view class="song_name">{{item2.name}}</view>
							<view class="song_singer">-{{item2.ar[0].name}}</view>
						</view>
						<view class="hot_icon">
							<text>new</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			topList: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style lang="less">
	// 排行榜
	.hot_top {
		margin-bottom: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;

		.hot_top_title {
			display: flex;
			justify-content: space-between;
			padding: 30rpx;

			.hot_title_left {
				font-size: 36rpx;
			}

			.hot_title_right {
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

		.hot_top_main {
			height: 500rpx;
			margin: 0;

			.hot_top_item {
				padding-bottom: 30rpx;

				.top_content {
					margin: 14rpx;

					padding: 20rpx;
					width: calc(100% -20rpx);
					background-color: #fff;
					box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
					border-radius: 20rpx;

					.top_title {
						text-align: center;

					}

					.top_row {
						display: flex;
						align-items: center;
						margin: 20rpx 0;

						.song_cover {
							width: 90rpx;
							height: 90rpx;
							// flex: 1;
							flex-shrink: 0;
							flex-grow: 0%;
							border-radius: 20rpx;
							overflow: hidden;
						}

						.song_info_wrap {
							display: flex;
							justify-content: flex-start;
							align-items: flex-end;
							flex: 4;
							flex-shrink: 0;
							overflow: hidden;

							.song_num {
								margin: 0 26rpx;
								font-weight: 600;
							}

							.song_name {
								font-weight: 400;
								color: rgba(48, 48, 48, 1);
								font-size: 28rpx;
								width: 70%;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.song_singer {
								width: 20%;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;

								font-weight: 300;
								font-size: 26rpx;
							}
						}

						.hot_icon {
							flex: 1;
							text-align: right;
							font-size: 26rpx;
							font-weight: 300;
							color: var(--themeColor);

							text {}
						}
					}
				}


			}
		}
	}
</style>
