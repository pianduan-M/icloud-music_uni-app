<template>
	<view class="playlist_detail">
		<view class="playlist_wrap" v-if="recomend.length">
			<!-- 歌单信息 -->
			<view class="playlist_detail_info">
				<view class="info_bg">
					<image class="img" :src="recomend[0].al.picUrl"></image>
					<!-- 遮罩层 -->
					<view class="mask"></view>
				</view>
				<view class="date_wrap">
					<view class="date">
						<view class="month">{{month}}</view>
						<view class="line">/</view>
						<view class="day">{{day}}</view>
					</view>
					<view class="text">
						<text>查看今日运势</text>
						<text class="iconfont icon-rightarrow"></text>
					</view>
				</view>
			</view>
			<!-- 歌单内容区 -->
			<view class="playlist_content">
				<!-- 歌单内容头部区域 -->
				<view class="playlist_content_head">
					<view class="head_left">
						<text class="iconfont icon-play1"></text>
					</view>
					<view class="head_center">
						<view class="text">
							<text>播放全部</text>
						</view>
					</view>
					<view class="head_right">
						<text class="iconfont icon-select"></text>
					</view>
				</view>
				<!-- 歌单列表项 -->
				<view class="playlist_content_list">
					<view class="list_item" v-for="(item, index) in recomend" :key="item.id" @click="toPlay(index)">
						<!-- 图片 -->
						<view class="cover">
							<image class="cover_img" :src="item.al.picUrl" mode="widthFix"></image>
						</view>
						<!-- 歌曲信息 -->
						<view class="song_info">
							<view class="song_name_wrap">
								<view class="song_name">{{item.name}}</view>
								<view class="singer_wrap">
									<text class="tag" v-if="item.fee == 1">VIP</text>
									<text class="singer">{{item.ar[0].name}}-{{item.al.name}}</text>
								</view>
							</view>
							<view class="icon" v-if="item.mv !== 0">
								<text class="iconfont icon-bofang"></text>
							</view>
						</view>
						<!-- 右侧菜单栏 -->
						<view class="item_menu">
							<text class="iconfont icon-diandiandianshu"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 出现错误时的刷新按钮 -->
		<reload v-if="isError" @click="reload"></reload>
	</view>
</template>

<script>
	import request from '../../request/index'
	import { showToast } from '@/utils/utils'

	
	import {
		mapMutations,
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
				recomend: [],
				month: 1,
				day: 1,
				isError: false
			}
		},
		onLoad(options) {
			// 获取当天日期
			const date = new Date()
			let month = date.getMonth() + 1
			let day = date.getDate()
			this.day = day < 10 ? '0' + day : day
			this.month = month < 10 ? '0' + month : month
			
			this.getRecommendPlaylist()
		},
		methods: {
			...mapMutations(['setPlaylist', 'setCurrentIndex']),
			...mapActions(['autoPlay']),
			// 请求推荐歌单
			async getRecommendPlaylist() {

				// 读缓存中的数据
				let recommendPlaylist = uni.getStorageSync('recommendPlaylist') || {}
				if (recommendPlaylist.date) {
					const oldDt = new Date(recommendPlaylist.date)
					const oldMouth = oldDt.getMonth()
					const oldDay = oldDt.getDate()

					const newDt = new Date()
					const newMouth = newDt.getMonth()
					const newDay = newDt.getDate()

					if (oldMouth === newMouth && oldDay === newDay) {
						this.recomend = recommendPlaylist.recomend
						return
					}
				}
				
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				// 防止页面一直处于loading状态
				setTimeout(() => {
					uni.hideLoading();
				}, 5000);
				const res = await request({
					url: '/recommend/songs'
				})
				console.log(res);
				// 请求出错
				if (res.data.code !== 200) {
					showToast({
						title: '加载错误！'
					})
					this.isError = true
					uni.hideLoading();
					return
				}
				uni.hideLoading();

				const recomend = res.data.data.dailySongs
				this.recomend = recomend
				this.isError = false

				// 保存到缓存
				uni.setStorageSync('recommendPlaylist', {
					date: Date.now(),
					recomend,
				})
			},
			// 跳转播放
			toPlay(currentIndex) {

				//  保存歌单到vuex
				this.setPlaylist({
					playlist: this.recomend
				})
				this.setCurrentIndex({
					currentIndex
				})
				this.autoPlay()

				// 跳转到播放页面
				uni.navigateTo({
					url: '/pages/play_music/play_music'
				});

			},
			reload() {
				// 简单节流
				if (this.flag) return
				this.flag = true
				// 再次发请求
				this.getRecommendPlaylist()

				setTimeout(() => {
					this.flag = false
				}, 1000);
			}
		}
	}
</script>

<style lang="less">
	view.playlist_detail {
		position: relative;
		height: 100%;

		// 头部歌单信息区
		view.playlist_detail_info {
			position: relative;
			display: flex;
			height: 400rpx;
			align-items: center;
			padding: 30rpx;
			
			// 信息区背景
			.info_bg {
				position: absolute;
				left: 0;
				top: 0;
				z-index: -1;
				filter: blur(60rpx);
				width: 100%;
				height: 100%;
				transform: scale(1.5);

				.img {
					width: 100vw;
					height: 80%;
				}

				.mask {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.2);
				}
			}

			// 标题
			.date_wrap {
				position: absolute;
				bottom: 0;
				left: 30rpx;
				color: #fff;
				font-weight: 700;

				.date {
					display: flex;
					align-items: flex-end;

					.month {
						font-size: 60rpx;
						transform: translateY(13%);
						// letter-spacing: -5rpx;
						// margin-left: -5rpx;
					}

					.line {
						font-weight: 300;
						margin-left: 16rpx;
						margin-right: 8rpx;
					}
				}

				.text {
					font-weight: 400;
					font-size: 24rpx;
					display: flex;
					align-items: center;

					.iconfont {
						font-size: 26rpx;
						margin-left: 5rpx;
					}
				}
			}

		}

		// 歌曲列表区
		.playlist_content {
			position: relative;
			padding: 60rpx 0;

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

			// 列表容器
			.playlist_content_list {
				padding-top: 20rpx;

				// 列表项
				.list_item {
					padding: 10rpx 0;
					display: flex;
					align-items: center;
					padding-left: 30rpx;

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

							// vip 标识
							.tag {
								position: relative;
								top: -1rpx;
								font-size: 18rpx;
								color: var(--themeColor);
								margin-right: 8rpx;
								padding: 3rpx 6rpx;
								line-height: 0.8;

								&::after {
									content: '';
									position: absolute;
									left: 0;
									top: 0;
									right: 0;
									bottom: 0;
									border: 1px solid rgba(249, 71, 71, 0.3);
									border-radius: 10rpx;
									// transform: scale(1.3);
								}
							}

							.singer_wrap {
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.singer {
								width: 100%;
								font-weight: 300;
								font-size: 24rpx;
								color: #919191;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
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
			}
		}
	}
</style>
