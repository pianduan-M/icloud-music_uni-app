<template>
	<view class="play_video_container">
		<swiper style="height: 100vh;" vertical :touchable="true" @change="swiperChange" :circular="currentIndex !== 0">
			<swiper-item@touchstart="touchStart(0)" class="video_item">
				<image :src="first.coverUrl" v-if="vid !== first.vid"></image>
				<video :style="{height:first.isVertical?'100vh':''}" class="video" @waiting="videoWaiting"
					@play="videoPlay" :poster="first.coverUrl" :src="first.url" @click="touchVideo"
					v-if="vid === first.vid" object-fit="fill" :controls="isShowControls" loop
					autoplay></video>
				</swiper-item>

				<swiper-item@touchstart="touchStart(1)" class="video_item">
					<image :src="second.coverUrl" v-if="vid !== second.vid"></image>
					<video :style="{height:second.isVertical?'100vh':''}" class="video" @waiting="videoWaiting"
						@play="videoPlay" :poster="second.coverUrl" :src="second.url" @click="touchVideo"
						v-if="vid === second.vid" object-fit="fill" loop :controls="isShowControls" autoplay></video>
					</swiper-item>

					<swiper-item@touchstart="touchStart(2)" class="video_item">
						<image :src="thrid.coverUrl" v-if="vid !== thrid.vid"></image>
						<video :style="{height:thrid.isVertical?'100vh':''}" class="video" @waiting="videoWaiting"
							@play="videoPlay" :poster="thrid.coverUrl" :src="thrid.url" @click="touchVideo"
							v-if="vid === thrid.vid" object-fit="fill" loop :controls="isShowControls" autoplay></video>
						</swiper-item>

		</swiper>

		<!-- 自定义导航 -->
		<NavBar>
			<template v-slot:left>
				<view class="goback" @click.stop="goback">
					<text class="iconfont icon-back"></text>
				</view>
			</template>
		</NavBar>
	</view>

</template>

<script>
	import request from '../../request/index.js'
	import {
		makeFriendly,
		showToast
	} from '../../utils/utils.js'
	// 自定义navbar
	import NavBar from '@/components/NavBar/nav-bar.vue'

	import {mapState, mapActions} from 'vuex'

	export default {
		onLoad(option) {
			// 如果有传id 播放id视频
			if (option.id) {
				this.offset++
				const {
					id
				} = option
				if (id.length < 10) {
					this.vid = id
					this.getMvDetail(id)
				} else {
					this.vid = id
					this.getVideoDetail(id)
				}
				return
			}
			this.getVideo()
			// 暂停播放的音乐
			this.switchPauseSong()
		},
		data() {
			return {
				video: [],
				first: {},
				second: {},
				thrid: {},
				currentIndex: 0,
				vid: '',
				offset: -1,
				// 控制视频 控件 显示隐藏
				isShowControls: true,
				// 当前swiper 索引
				current: 0
			}
		},

		methods: {
			...mapActions(['switchPauseSong']),
			touchStart(index) {

				if (this.video.length <= 1) return
				if (index === 0) {
					const second = this.video[this.currentIndex + 1].data
					this.second = {
						url: second.urlInfo.url,
						vid: second.vid,
						coverUrl: second.coverUrl,
						isVertical: second.height > second.width
					}
					if (this.currentIndex > 0) {
						const thrid = this.video[this.currentIndex - 1].data
						this.thrid = {
							url: thrid.urlInfo.url,
							vid: thrid.vid,
							coverUrl: thrid.coverUrl,
							isVertical: thrid.height > thrid.width
						}

					}
				}
				if (index === 1) {
					const first = this.video[this.currentIndex - 1].data
					this.first = {
						url: first.urlInfo.url,
						vid: first.vid,
						coverUrl: first.coverUrl,
						isVertical: first.height > first.width
					}


					const thrid = this.video[this.currentIndex + 1].data
					this.thrid = {
						url: thrid.urlInfo.url,
						vid: thrid.vid,
						coverUrl: thrid.coverUrl,
						isVertical: thrid.height > thrid.width
					}

				}
				if (index === 2) {
					const first = this.video[this.currentIndex + 1].data
					this.first = {
						url: first.urlInfo.url,
						vid: first.vid,
						coverUrl: first.coverUrl,
						isVertical: first.height > first.width
					}

					const second = this.video[this.currentIndex - 1].data
					this.second = {
						url: second.urlInfo.url,
						vid: second.vid,
						coverUrl: second.coverUrl,
						isVertical: second.height > second.width
					}
				}

			},
			// swiper 滑动事件
			swiperChange(e) {
				const {
					current
				} = e.detail
				if (this.current !== 2) {
					current > this.current ? this.currentIndex++ : this.currentIndex--
				} else {
					current === 0 ? this.currentIndex++ : this.currentIndex--
				}
				this.current = current

				this.isShowControls = true
				this.vid = this.video[this.currentIndex].data.vid
				if (this.currentIndex >= this.video.length - 1) {
					this.getVideo()
				}
			},
			// 获取推荐视频
			async getVideo() {
				this.offset++
				const res = await request({
					url: '/video/timeline/recommend',
					data: {
						offset: this.offset
					}
				})
				if (res.data.code !== 200) {
					showToast({
						title: '错误请重试'
					})
					return
				}
				const videos = res.data.datas
				this.video.push(...videos)

				if (!this.vid) {
					const first = videos[0].data
					this.first = {
						url: first.urlInfo.url,
						vid: first.vid,
						coverUrl: first.coverUrl
					}
					this.vid = first.vid
				}

			},
			// 根据id获取视频
			async getVideoDetail(id) {
				const res = await request({
					url: '/video/detail',
					data: {
						id,
					}
				})

				if (res.data.code !== 200) {
					showToast({
						title: '错误请重试'
					})
					return
				}
				// 播放地址
				const res2 = await request({
					url: '/video/url',
					data: {
						id,
					}
				})
				const url = res2.data.urls[0].url

				const first = res.data.data
				this.vid = first.vid
				this.first = {
					url,
					vid: id,
					coverUrl: first.cover,
					isVertical: first.height > first.width,
				}
				res.data.data.urlInfo = {
					url
				}

				res.data.data.vid = id
				res.data.data.coverUrl = first.cover

				this.video.push(res.data)
				this.getVideo()
			},
			// 根据id获取mv
			async getMvDetail(mvid) {
				console.log('mv');
				const res = await request({
					url: '/mv/detail',
					data: {
						mvid
					}
				})

				if (res.data.code !== 200) {
					showToast({
						title: '错误请重试'
					})
					return
				}
				// 播放地址
				const res2 = await request({
					url: '/mv/url',
					data: {
						id: mvid,
					}
				})
				const url = res2.data.data.url
				const first = res.data.data
				this.first = {
					url,
					vid: mvid,
					coverUrl: first.cover,
					isVertical: first.height > first.width,
				}

				res.data.data.urlInfo = {
					url
				}
				res.data.data.vid = mvid
				res.data.data.coverUrl = first.cover
				this.video.push(res.data)
				this.getVideo()
			},
			// 点击视频显示控件
			touchVideo() {
				this.isShowControls = true;
				this.controlsTimeoutId && clearTimeout(this.controlsTimeoutId)
				this.controlsTimeoutId = setTimeout(() => {
					this.isShowControls = false;
				}, 1000)
			},
			// 视频出现缓冲
			videoWaiting() {
				this.isShowControls = true;
			},
			// 监听视频播放
			videoPlay() {
				if(this.isPlay){
					this.switchPauseSong()
				}
				this.isShowControls = false;
			},
			goback() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		components: {
			NavBar
		},
		computed:{
			...mapState(['isPlay'])
		}
	}
</script>

<style lang="less">
	.video_info_container {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 1;
	}

	// 返回按钮
	.goback {
		width: 60rpx;
		height: 40px;
		line-height: 60rpx;
		color: #fff;
	}

	.play_video_container {
		width: 100vw;
		height: 100vh;
		background-color: pink;

		.video_item {
			height: 100vw;
			width: 100vh;
			background-color: #000;
			display: flex;
			justify-content: center;
			align-items: center;

			.video {
				width: 100%;
			}
		}
	}
</style>
