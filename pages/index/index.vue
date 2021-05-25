<template>
	<view class="home">
		<Search />
		<!-- 内容区 -->
		<scroll-view class="home_content" :refresher-threshold="200" refresher-enabled scroll-y
			@refresherrefresh="handleResherrefresh" :refresher-triggered="isTriggered">
			<view class="home_content_wrap">
				<Banner :bannerList="bannerList" />
				<BallList :ballList="ballList" />
				<RecommendPlaylist :recommendList="recommendList" />
				<RecommendPlaylist :recommendList="recommendResource" v-if="userInfo.userId"
					:title="recommendResource[0].name" />
				<TopList :topList="topList" />
				<RecommendVideo v-if="userInfo.userId"></RecommendVideo>
			</view>
			<!-- 音乐控件占位 -->
			<view class="music_bar_seat" style="height:80rpx" :style="{display: currentSong?'':'none'}"></view>
		</scroll-view>
		<!-- 音乐控件 -->
		<MusicBar />
	</view>
</template>

<script>
	// 引入子组件
	import Banner from './children/Banner.vue'
	import BallList from './children/BallList.vue'
	import RecommendPlaylist from './children/RecommendPlaylist.vue'
	import Search from './children/Search.vue'
	import TopList from './children/TopList.vue'
	import RecommendVideo from './children/recommendVideo.vue'
	import MusicBar from '@/components/MusicBar/music-Bar.vue'

	import {
		mapGetters,
		mapState
	} from 'vuex'

	import request from '../../request/index'
	// 格式化数字
	import {
		makeFriendly,
		showToast
	} from '../../utils/utils.js'

	export default {
		data() {
			return {
				// banner 数据
				bannerList: [],
				// ball 列表
				ballList: [],
				recommendList: [],
				list: [],
				topList: [],
				recommendResource: [],
				// 控制下拉刷新
				isTriggered: false
			}
		},
		components: {
			Banner,
			BallList,
			RecommendPlaylist,
			Search,
			TopList,
			MusicBar,
			RecommendVideo
		},
		onLoad() {
			this.getData('init')
		},
		onShow() {
			if (this.userInfo.userId && this.recommendResource.length <= 0) {
				this.getData('init')
			}
		},
		methods: {
			// 发送请求函数
			getData(type) {

				// 提取缓存 如果没有过期 直接用缓存
				const homeData = uni.getStorageSync('homeData') || {}
				if (homeData.date && type === "init") {
					const nowDate = Date.now()
					if ((nowDate - homeData.date) <= (1000 * 60 * 60)) {
						const res = homeData.res
						this.getBanners(res[0])
						this.getBallList(res[1])
						this.getRecommend(res[2])
						// this.getHomePage()
						this.getTopList(res[3])
						this.getRecommendResource(res[4])
						return
					}
				}

				// 先设置加载状态
				uni.showLoading({
					title: '加载中',
				});
				// 统一发请求
				const bannersRes = request({
					url: '/banner'
				})
				const ballListRes = request({
					url: '/homepage/dragon/ball'
				})
				const recommendRes = request({
					url: '/personalized?limit=6'
				})
				const topListRes = request({
					url: '/toplist'
				})
				let recommendResource
				if (this.userInfo.userId) {
					recommendResource = request({
						url: '/recommend/resource'
					})
				} else {
					recommendResource = Promise.resolve([])
				}

				Promise.all([bannersRes, ballListRes, recommendRes, topListRes, recommendResource])
					.then(res => {
						const homeData = {
							date: Date.now(),
							res
						}
						uni.setStorageSync('homeData', homeData)

						this.getBanners(res[0])
						this.getBallList(res[1])
						this.getRecommend(res[2])
						// this.getHomePage()
						this.getTopList(res[3])
						this.getRecommendResource(res[4])
						// 加载完成在隐藏loading
						uni.hideLoading()
						// 关闭下拉刷新
						setTimeout(() => {
							this.isTriggered = false
						})
					})

			},
			// 获取banner 数据
			getBanners(res) {
				// const res = await request({ url: '/banner' })
				const bannerList = res.data.banners
				this.bannerList = bannerList
			},
			// 获取首页导航列表数据 
			getBallList(res) {
				// const res = await request({ url: '/homepage/dragon/ball' })
				this.ballList = res.data.data
			},
			// 推荐歌单 数据
			getRecommend(res) {
				// const res = await request({ url: '/personalized?limit=6' })
				const recommendList = res.data.result
				recommendList.forEach(item => {
					item.playCount = makeFriendly(item.playCount)
				});
				this.recommendList = recommendList
			},
			// 排行榜
			async getTopList(res) {
				// const res = await request({ url: '/toplist' })
				// 先得到榜单ID 再根据请求榜单详情
				const topArr = res.data.list.slice(0, 5)
				const topIds = topArr.reduce((ids, v) => {
					ids.push(v.id)
					return ids
				}, [])
				// 请求榜单详情 得到歌曲列表
				const promises = []
				topIds.forEach(item => {
					promises.push(request({
						url: '/playlist/detail',
						data: {
							id: item
						}
					}))
				})
				let topList = await Promise.all(promises)
				topList = topList.map(item => {
					const top = item.data.playlist
					return {
						id: top.id,
						name: top.name,
						tracks: top.tracks.slice(0, 3)
					}
				})
				this.topList = topList
			},
			// 获取每日推荐歌单
			async getRecommendResource(res) {
				const recommendResource = res.data ? res.data.recommend : []
				recommendResource.forEach(item => {
					item.playCount = makeFriendly(item.playCount)
				});
				this.recommendResource = recommendResource
			},
			// 下拉刷新
			handleResherrefresh() {
				if (this.flag) return
				this.isTriggered = true
				this.flag = true
				this.getData()
				setTimeout(() => {
					this.flag = false
				}, 300)
			}
		},
		computed: {
			...mapGetters(['currentSong']),
			...mapState(['userInfo'])
		}
	}
</script>

<style lang="less">
	.home {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
		overflow: hidden;

		// 容器
		.home_content {
			position: relative;
			width: 100%;
			height: calc(100% - 50px);
			overflow: hidden;
			padding-top: 70px;

		}

		// 首页列表
		.ball_list_wrap {
			background-color: #fff;
		}
	}
</style>
