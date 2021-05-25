<template>
	<view class="user">
		<!-- 固定定位的tab -->
		<PlaylistTab :playlistType="playlistType" class="top_tab" :class="{fixed:scrollTop>=200}"
			style="paddingLeft:30rpx;paddingRight:30rpx;" @tabclick="choosePlaylist" />

		<scroll-view class="user_container" style="height: 100vh;" :scroll-into-view="intoView" enhanced scroll-y
			:scroll-with-animation="true" @scroll="handleScroll">
			<view class="user_wrap">
				<!-- 用户信息 -->
				<UserInfo :userInfo="userInfo" />
				<!-- 我喜欢的音乐 -->
				<LikeMusic :playlist="playlist" />

				<PlaylistTab :playlistType="playlistType" @tabclick="choosePlaylist" />
				<!-- 歌单 -->
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
									<view class="playlist_item" @click="toPlaylistDetail(item.id)"
										v-for="item in playlist.created" :key="item.id">
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
									<view class="playlist_item" @click="toPlaylistDetail(item.id)"
										v-for="item in playlist.collect" :key="item.id">
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

			</view>
			<!-- 音乐控件占位 -->
			<view class="music_bar_seat" style="height:80rpx" :style="{display: currentSong?'':'none'}"></view>
		</scroll-view>
		<!-- 音乐控件 -->
		<MusicBar />
	</view>
</template>

<script>
	import UserInfo from './children/user-info.vue'
	import LikeMusic from './children/like-music.vue'
	import PlaylistTab from './children/playlist-tab.vue'
	import MusicBar from '@/components/MusicBar/music-Bar.vue'

	import request from '../../request/index.js'
	var appInst = getApp();
	import {
		mapGetters,
		mapState
	} from 'vuex'


	export default {
		data() {
			return {
				playlist: {
					created: [],
					collect: [],
					like: {},
				},
				// 控制 歌单tabs 定位 
				isFixed: false,
				// tabs 页面 top、值
				playlistTabTop: '',
				// 创建歌单元素  页面 top、值
				playlistCreatedTop: '',
				// 收藏歌单元素  页面 top、值
				playlistCollectTop: '',
				// 当前选中tabs  页面 top、值
				playlistType: 'created',
				// 当前页面的scroll 值
				scrollTop: 0,
				isClick: false,
				intoView: ''
			}
		},
		components: {
			UserInfo,
			LikeMusic,
			PlaylistTab,
			MusicBar
		},
		onShow() {
			if (this.userInfo.userId && !this.playlist.like.nickname) {
				this.getPlaylist()
			}
		},
		mounted() {
			this.getPlaylistTop()
		},
		methods: {

			// 获取用户歌单
			async getPlaylist() {

				uni.showLoading({
					title: "加载中"
				})

				// 提取缓存 如果没有过期 直接用缓存
				const userPlaylist = uni.getStorageSync('userPlaylist') || {}
				if (userPlaylist.date) {
					uni.hideLoading()
					const nowDate = Date.now()
					if ((nowDate - userPlaylist.date) <= (1000 * 60 * 60)) {
						this.playlist = userPlaylist
						return
					}
				}

				// 发送网络请求
				const res = await request({
					url: '/user/playlist',
					data: {
						uid: this.userInfo.userId,
					}
				})
				uni.hideLoading()

				// 创建一个 歌单对象 确认 创建歌单 和 收藏歌单
				let playlist = {
					created: [],
					collect: [],
					like: {}
				}
				// 循环 歌单分类
				res.data.playlist.forEach(item => {
					// 单独拿出 我喜欢的音乐 歌单
					if (item.name == "我喜欢的音乐") {
						playlist.like = item
					} else {
						// 如果用户ID 等于当前登录id 就是用户自己创建的 否则就是收藏
						if (item.userId === this.userInfo.userId) {
							playlist.created.push(item)
						} else {
							playlist.collect.push(item)
						}
					}
				})
				this.playlist = playlist
				// 缓存数据
				playlist.date = Date.now()
				uni.setStorageSync('userPlaylist', playlist)
			},

			// 收藏/创建 歌单切换
			choosePlaylist(type) {
				// 设置
				this.playlistType = type === 'created_btn' ? 'created' : 'collect'

				this.intoView = type === 'created_btn' ? 'playlist_created' : 'playlist_collect'

				this.isClick = true,
					// 设置scrollTop

					// 滚动结束 回调 解决tab栏 选中项抖动问题
					setTimeout(() => {
						this.isClick = false
					}, 500);
			},
			// 监听页面滚动
			handleScroll(e) {
				// 取值
				const {
					scrollTop
				} = e.detail
				this.setPlaylistTop(scrollTop)
				this.scrollTop = scrollTop
			},
			// 歌单标题联动效果
			setPlaylistTop(scrollTop) {
				let {
					playlistTabTop,
					isFixed,
					playlistType,
					playlistCollectTop,
					playlistCreatedTop,
					isClick
				} = this

				if (scrollTop < 200) {
					this.intoView = ""
				}

				// 如果页面scrollTop 大于 歌单tab的 top值 就让它定位
				if (playlistTabTop && scrollTop >= playlistTabTop && !isFixed) {
					this.isFixed = true
				}
				// 否则隐藏
				if (playlistTabTop && scrollTop <= playlistTabTop && isFixed) {
					this.isFixed = false
				}
				// 根据滑动的位置联动tab栏
				if (playlistCollectTop && scrollTop >= playlistCollectTop && playlistType === "created") {
					if (isClick) return
					this.playlistType = 'collect'
				}

				if (playlistCreatedTop && scrollTop < playlistCollectTop && playlistType === "collect") {

					if (isClick) return
					this.playlistType = "created"
				}
			},

			// 跳转歌单详情
			toPlaylistDetail(id) {
				uni.navigateTo({
					url: '/pages/playlist_detail/playlist_detail?id=' + id,
				});
			},
			// 获取 列表 top值 
			getPlaylistTop() {
				this.$nextTick(() => {
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#playlist_created').boundingClientRect()
						query.select('#playlist_collect').boundingClientRect()
						const that = this
						query.exec(function(res) {
							that.playlistCreatedTop = res[0].top
							that.playlistCollectTop = res[1].top
						})

					}, 300)
				})
			}
		},
		computed: {
			...mapGetters(['currentSong']),
			...mapState(['userInfo']),
		},
		watch: {
			userInfo() {
				if (!this.userInfo.userId) {
					this.playlist = {
						created: [],
						collect: [],
						like: {},
					}
				}
			}
		}
	}
</script>

<style lang="less">
	/deep/.top_tab {
		display: none !important;
	}

	.user {
		width: 100vw;
		height: 100vh;
	}

	.user_container {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #f6f6f6;
		box-sizing: border-box;
		position: relative;

		.user_wrap {
			padding: 30rpx;
		}
	}

	.fixed {
		position: fixed;
		top: --window-top;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 999;
		display: flex !important;
		animation: tabFixed 0.2s linear;
	}

	@keyframes tabFixed {
		from {
			display: flex;
			opacity: 0.5;
		}

		to {
			display: flex;
			opacity: 1;
		}
	}

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
