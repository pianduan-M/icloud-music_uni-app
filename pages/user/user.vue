<template>
	<view class="user">
		<!-- 固定定位的tab -->
		<PlaylistTab :playlistType="playlistType" class="top_tab" :class="{fixed:scrollTop>=200}"
			style="paddingLeft:30rpx;paddingRight:30rpx;" @tabclick="choosePlaylist" />

		<scroll-view class="user_container" id="user_container" :scroll-into-view="view" enhanced scroll-y
			scroll-with-animation enable-back-to-top @scroll="handleScroll">
			<view class="user_wrap">
				<!-- 用户信息 -->
				<UserInfo :userInfo="userInfo" />
				<!-- 我喜欢的音乐 -->
				<LikeMusic :playlist="playlist" />

				<PlaylistTab :playlistType="playlistType" @tabclick="choosePlaylist" />
				<!-- 歌单 -->
				<UserPlaylist :playlist="playlist" :choosePlaylist="choosePlaylist" ref="userPlaylistRef" />

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
	import UserPlaylist from './children/user-playlist.vue'
	import PlaylistTab from './children/playlist-tab.vue'
	import MusicBar from '@/components/MusicBar/music-Bar.vue'

	import request from '../../request/index.js'
	var appInst = getApp();
	import {
		mapGetters
	} from 'vuex'


	export default {
		data() {
			return {
				userInfo: {},
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
				view: ''
			}
		},
		components: {
			UserInfo,
			LikeMusic,
			UserPlaylist,
			PlaylistTab,
			MusicBar
		},
		onLoad() {
			this.getUsetInfo()

		},
		onShow() {
			// 读取userinfo
			this.getUsetInfo()
			if (!this.playlist.like.nickname && this.userInfo.nickname) {
				// 获取用户歌单
				this.getPlaylist()
			}
			// 重新更新 top值
			// this.getEleTopValue()
		},
		mounted() {
			this.$refs.userPlaylistRef.getPlaylistTop().then(res => {
				this.playlistCreatedTop = res[0].top
				this.playlistCollectTop = res[1].top
			})
		},
		methods: {
			// 从缓存中读取账户信息
			getUsetInfo() {
				if (this.userInfo.nickname) return
				this.userInfo = uni.getStorageSync('userInfo') || {};
			},

			// 获取用户歌单
			async getPlaylist() {
				// 发送网络请求
				const res = await request({
					url: '/user/playlist',
					data: {
						uid: this.userInfo.userId,
					}
				})
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
			},

			// 收藏/创建 歌单切换
			choosePlaylist(type) {
				// 设置
				this.playlistType = type === 'created_btn' ? 'created' : 'collect'
				this.view = type === 'created_btn' ? 'playlist_created' : 'playlist_collect'

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
				const {
					playlistTabTop,
					isFixed,
					playlistType,
					playlistCollectTop,
					playlistCreatedTop,
					isClick
				} = this
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
			logout() {
				uni.showModal({
					title: '',
					content: '退出登录？',
					showCancel: true,
					cancelText: '取消',
					cancelColor: '#000000',
					confirmText: '确定',
					confirmColor: '#3CC51F',
					success: async (result) => {
						if (result.confirm) {
							// 退出登录
							await request({
								url: '/logout'
							})
							// 清除缓存
							uni.clearStorageSync();
							appInst.globalData.userInfo = {}
							// 跳转页面
							uni.reLaunch({
								url: '/pages/user/index'
							});
						}

					}

				});
			}
		}
		,
		computed: {
			...mapGetters(['currentSong'])
		}
	}
</script>

<style lang="less">
	/deep/.top_tab {
		display: none !important;
	}

	.user_container {
		width: 100vw;
		height: 100vh;
		background-color: #f6f6f6;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;


		.user_wrap {
			padding: 30rpx;
			margin-bottom: 100rpx;
		}
	}

	.fixed {
		position: fixed;
		top: --window-top;
		left: 0;
		width: 100%;
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
</style>
