<template>
	<view class="playlist">
		<!-- 工具tab栏 -->
		<view class="playlist_content">
			<!-- 创建的歌单 -->
			<view class="created_playlist">
				<!-- 跳转用的锚点元素 -->
				<view class="Anchor" id="playlist_created"></view>
				<!-- 标题 -->
				<view class="created_playlist_title">
					<view class="name">创建歌单</view>
					<view class="tools">
						<text class="iconfont icon-jia"></text>
						<text class="iconfont icon-diandiandianshu"></text>
					</view>
				</view>
				<!-- 歌单列表项 -->
				<view class="created_playlist_content">
					<block v-if="!playlist.created.length">
						<view class="playlist_item">
							<view class="playlist_item_pic">
								<image></image>
								<text class="iconfont icon-daoru"></text>
							</view>
							<view class="playlist_item_text">
								<view>一键导入外部歌单</view>
								<view class="num">0首</view>
							</view>
							<view class="playlist_item_tool">
								<text class="iconfont icon-diandiandianshu"></text>
							</view>
						</view>
					</block>
					<block v-else>
						<view class="playlist_item" @click="toPlaylistDetail(item.id)" v-for="item in playlist.created"
							:key="item.id">
							<view class="playlist_item_pic">
								<image :src="item.coverImgUrl" mode="widthFix"></image>
								<text v-if="!item.coverImgUrl" class="iconfont icon-daoru"></text>
							</view>
							<view class="playlist_item_text">
								<view>{{item.name?item.name:'一键导入外部歌单'}}</view>
								<view class="num">{{item.trackCount+"首"}}</view>
							</view>
							<view class="playlist_item_tool" v-if="item.name">
								<text class="iconfont icon-diandiandianshu"></text>
							</view>
						</view>
					</block>
				</view>
			</view>
			<!-- 收藏的歌单 -->
			<view class="created_playlist">
				<!-- 跳转用的锚点元素 -->
				<view class="Anchor" id="playlist_collect"></view>
				<!-- 标题 -->
				<view class="created_playlist_title">
					<view class="name">收藏歌单</view>
					<view class="tools">
						<text class="iconfont icon-diandiandianshu"></text>
					</view>
				</view>
				<!-- 歌单列表项 -->
				<view class="created_playlist_content">
					<block v-if="!playlist.collect.length">
						<view class="default">暂无收藏的歌单</view>
					</block>
					<block wx:else>
						<view class="playlist_item" @click="toPlaylistDetail(item.id)" v-for="item in playlist.collect"
							:key="item.id">
							<view class="playlist_item_pic">
								<image :src="item.coverImgUrl" mode="widthFix"></image>
							</view>
							<view class="playlist_item_text">
								<view>{{item.name?item.name:'暂无收藏的歌单'}}</view>
								<view class="num">{{item.trackCount+"首"}}</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			playlist: {
				type: Object,
				default: {}
			},
			choosePlaylist: {
				type: Function,
			}
		},

		methods: {
			// 跳转歌单详情
			toPlaylistDetail(id) {
				uni.navigateTo({
					url: '/pages/playlist_detail/playlist_detail?id=' + id,
				});
			},
			// 获取 列表 top值 
			getPlaylistTop() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#playlist_created').boundingClientRect()
						query.select('#playlist_collect').boundingClientRect()
						const that = this
						query.exec(function(res) {
							resolve(res)
						})

					}, 200)
				})
			}
		},
	}
</script>

<style lang="less">
	// 锚点元素

	// .Anchor::before{
	// 	content: "";
	// 	display: block;
	// 	width: 100%;
	// 	height: 50px;
	// 	margin-top: -50px;
	// }


	// 歌单
	.playlist {

		// 歌单内容
		.playlist_content {
			background-color: #f6f6f6;

			// 歌单列表
			.created_playlist {
				position: relative;
				border-radius: 20rpx;
				background-color: #fff;
				padding: 20rpx;
				margin: 20rpx 0;

				// 锚点元素
				#playlist_created {
					position: relative;
					top: -124rpx;
				}

				// 锚点元素
				#playlist_collect {
					position: relative;
					top: -124rpx;
				}

				// 列表标题
				.created_playlist_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #919191;

					.name {
						font-size: 24rpx;
						font-weight: 300;
					}

					.tools {

						.iconfont.icon-jia {
							margin: 0 20rpx;
						}

						.iconfont {
							font-size: 36rpx;
						}

					}
				}

				// 列表容器
				.created_playlist_content {

					// 当没有登入时 文字默认样式
					.default {
						text-align: center;
						padding: 20rpx;
						font-size: 26rpx;
						color: #919191;
					}

					// 列表项
					.playlist_item {
						padding-top: 20rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						// 图片
						.playlist_item_pic {
							position: relative;
							width: 90rpx;
							height: 90rpx;
							border-radius: 15rpx;
							background-color: #f8f8f8;
							overflow: hidden;
							flex-shrink: 0;
							margin-right: 20rpx;
							border: 1rpx solid #f8f8f8;


							.iconfont {
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translate(-50%, -50%);
							}
						}

						// 中间文字
						.playlist_item_text {
							width: 100%;
							font-size: 30rpx;
							font-weight: 400;
							color: rgb(39, 39, 39);

							.num {
								font-size: 26rpx;
								color: #919191;
								font-weight: 300;
							}
						}

						// 右侧菜单icon
						.playlist_item_tool {
							color: #919191;
						}
					}
				}
			}
		}
	}
</style>
