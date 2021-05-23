<template>
	<view class="play_music">
		<!-- 自定义导航 -->
		<NavBar>
			<template v-slot:center>
				<view class="">
					<view class="songname">{{currentSong.name}}</view>
					<view class="songSinger">{{currentSong.ar[0].name}}</view>
				</view>
			</template>
			<template v-slot:left>
				<view class="goback" @click.stop="goback">
					<text class="iconfont icon-back"></text>
				</view>
			</template>
		</NavBar>

		<!-- 背景 -->
		<view class="song_bg ">
			<image :src="currentSong.al.picUrl?currentSong.al.picUrl:defaultBgImg" mode="scaleToFill"></image>
			<view class="bg_mask"></view>
		</view>

		<!-- 封面 -->
		<view class="play_cover_wrap" :class="{show:isShowCover}" @touchstart="handleSwichtCoverLrc"
			@touchend="handleSwichtCoverLrc">

			<view class="song-disc">
			<!-- 磁头 -->
			<view class="needle " :class="{song_disc_rotate:!isPlay}">
				<image class="img" src="../../static/images/needle.png" mode="aspectFill"></image>
			</view>

			<view class="song-turn" :style="{transform:'rotate('+coverRotateDeg+'deg)'}">
				<view class="song-rollwrap">
					<view class="song-img a-circling z-pause">
						<image class="u-img " mode="aspectFill" :src="currentSong.al.picUrl" />
					</view>
				</view>
				<view class="song-lgour">
					<view class="song-light a-circling z-pause"></view>
				</view>
			</view>
			<span class="song-plybtn"></span>
		</view>
	</view>

	<!-- 底部控制栏 -->
	<view class="play_tools">
		<!-- 顶部功能按钮 -->
		<view class="tools_head">
			<text class="iconfont icon-aixin"></text>
			<text class="iconfont icon-xiazai"></text>
			<text class="iconfont icon-changge"></text>
			<text class="iconfont icon-comment-"></text>
			<text class="iconfont icon-diandiandianshu"></text>
		</view>
		<!-- 中间进度条 -->
		<view class="tools_progress_wrap">
			<!-- 当前播放事件 -->
			<view class="current_time time" v-if="currentSong">
				{{(currentTime * 1000) | FormatDate}}
			</view>
			<view class="current_time time" v-if="!currentSong">00:00</view>


			<!-- 播放进度条 -->
			<view class="progress_container" @touchstart="handleTouchProgress" @touchmove="handleTouchProgress"
				@touchend="handleTouchProgress">
				<view class="progress_wrap">
					<view class="progress_inner" :style="{width:progressLength+'%' }"></view>
					<view class="progress_btn" :style="{left:progressLength+'%' }">
					</view>
				</view>
			</view>

			<!-- 总时间 -->
			<view class="total_time time" v-if="currentSong">{{ currentSong.dt | FormatDate}}</view>

			<view class="total_time time" v-if="!currentSong">00:00</view>
		</view>
		<!-- 底部媒体按钮 -->
		<view class="tools_play_btn">
			<view class="other_btn_wrap">
				<view class="play_mode" @click="switchPlayMode">
					<!-- <text class="iconfont icon-xunhuan"></text> -->
					<text class="iconfont" :class="'icon-'+playMode"></text>
					<!-- <text class="iconfont icon-suiji"></text> -->
				</view>
				<view class="play_menu" @click="showSongList">
					<text class="iconfont icon-bofangliebiao"></text>
				</view>
			</view>
			<view class="play_btn_wrap">
				<text class="pre_btn" id="pre" @click="switchPrevSong">
					<text class="iconfont icon-shangyishou"></text>
				</text>
				<text class="paly_btn" @click="switchPlaySong">
					<text class="iconfont" :class="'icon-'+ (isPlay?'zanting':'bofang1')"></text>
				</text>
				<view class="next_btn" id="next" @click="switchNextSong">
					<text class="iconfont icon-shangyishou"></text>
				</view>
			</view>
		</view>
	</view>

	<!-- 歌词 -->
	<view class="lyrics_container" :class="{show:!isShowCover}" @touchstart="handleSwichtCoverLrc" id="lyrics_container"
		@touchend="handleSwichtCoverLrc">
		<scroll-view class="scrollLyrics" enhanced scroll-y :show-scrollbar="false" scroll-with-animation
			:scroll-into-view="'lrc_'+lrc_scroll_id" v-if="lyrics.length>0">
			<view v-for="(item, index) in lyrics" :key="index" class="lrc_item" :class="{current:index === lrc_id}"
				:id="'lrc_'+index">
				<view class="lrc">{{item.lyric}}</view>
			</view>
		</scroll-view>
		<view class="no_lyrics" v-if="!lyrics.length">纯音乐没有歌词</view>
	</view>

	<!-- 播放列表 -->
	<CurrentPlayList ref="playlistRef" @closePopup="hideSongList" />
	</view>

</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'

	import request from '@/request/index'
	import {
		showToast
	} from '@/utils/utils'

	var appInst = getApp();
	import defaultBgImg from '@/static/images/heijiao.png'

	// 当前播放列表
	import CurrentPlayList from '@/components/CurrentPlayList/current-play-list.vue'
	// 自定义navbar
	import NavBar from '@/components/NavBar/nav-bar.vue'



	export default {
		data() {
			return {
				defaultBgImg: defaultBgImg,
				coverRotateDeg: 0,
				currentTimeStr: '',
				progressLength: 0,
				isTouchProgress: false,
				progeress_ele: {},
				lrc_id: 0,
				lrcWrapheight: 0,
				lrc_scroll_id: 0,
				// 控制歌词显示隐藏
				isShowCover: true,
				lrcTop: 100,
				// 播放列表控制
				iSshowSongList: false
			};
		},

		mounted() {

			this.$nextTick(() => {
				setTimeout(() => {
					this.getNodes()
				}, 300)
			})
		},
		onShow() {
			if (this.currentSong) {
				this.listenTimeUpdate()
			}
		},
		components: {
			CurrentPlayList,
			NavBar
		},
		onHide() {
			this.clearlistenTime()
		},
		methods: {
			handleSwichtCoverLrc(e) {
				// 只有手指开始坐标 跟 抬起是一样的 才需要切换页面
				if (e.type === 'touchstart') {
					this.x = e.changedTouches[0].pageX
				}
				if (e.type === 'touchend') {
					if (Math.abs(this.x - e.changedTouches[0].pageX) <= 2) {

						this.isShowCover = !this.isShowCover
					}
				}
			},
			...mapMutations(['prev', 'next', 'setPlayMode', 'setSongPlayTime', 'setCurrentTime']),
			// 获取节点
			getNodes() {
				this.query = uni.createSelectorQuery().in(this)
				this.query.select('.progress_wrap').boundingClientRect(res => {
					this.progeress_ele = res
				})
				var that = this

				// 容器节点 高度
				this.query.select('#lyrics_container').boundingClientRect(function(res) {
					const lrcWrapheight = res.height / 2
					that.lrcWrapheight = lrcWrapheight
				})
				this.query.exec()
			},
			// 上一首
			switchPrevSong() {
				if (this.playlist.length === 0) {
					showToast({
						title: '没有可播放的歌曲'
					})
					return
				}
				this.prev()
			},
			// 下一首
			switchNextSong() {
				if (this.playlist.length === 0) {
					showToast({
						title: '没有可播放的歌曲'
					})
					return
				}
				this.next()
			},
			// 播放 暂停
			switchPlaySong() {
				if (this.playlist.length === 0) {
					showToast({
						title: '没有可播放的歌曲'
					})
					return
				}

				if (this.isPlay) {
					this.$store.dispatch('switchPauseSong')
				} else {
					this.$store.dispatch('switchPlaySong')
				}
			},
			// 监听播放
			listenTimeUpdate() {
				this.intervalId && clearInterval(this.intervalId)
				this.intervalId = setInterval(() => {

					// 封面旋转
					if (this.isPlay) {
						if (this.coverRotateDeg >= 360) {
							this.coverRotateDeg = 1
						} else {
							this.coverRotateDeg += 1
						}
					}

					// 设置进度条 
					if (!this.isTouchProgress) {
						this.progressLength = ((this.currentTime * 1000) / this.currentSong.dt * 100).toFixed(3)
					}
					if (!this.isShowCover) {
						this.getCurrentLrc()
					}
					const currentTime = appInst.globalData.BackgroundAudioManager && appInst.globalData
						.BackgroundAudioManager.currentTime
					this.setCurrentTime({
						currentTime
					})

				}, 1000 / 24)
			},
			// 清除监听
			clearlistenTime() {
				clearInterval(this.intervalId)
			},
			// 切换播放模式
			switchPlayMode() {
				let message = ''
				switch (this.playMode) {
					case 'list':
						this.setPlayMode('one')
						message = '单曲循环'
						break;
					case 'one':
						this.setPlayMode('random')
						message = '随机播放'
						break;
					case 'random':
						this.setPlayMode('list')
						message = '列表循环'
						break;
				}
				showToast({
					title: message
				})
			},
			// 手动拖动进度条
			handleTouchProgress(e) {
				if (!this.currentSong) {
					return
				}

				const duration = this.currentSong.dt

				let pageX = e.changedTouches[0].pageX - this.progeress_ele.left

				pageX = pageX > this.progeress_ele.width ? this.progeress_ele.width : pageX
				pageX = pageX < 0 ? 0 : pageX

				const progress_width = this.progeress_ele.width
				const currentTime = (pageX / progress_width * duration) / 1000

				if (e.type == 'touchstart') {
					// 停止自动进度条
					this.isTouchProgress = true
				}
				if (e.type == 'touchmove') {
					let progressLength = (currentTime * 1000) / this.currentSong.dt * 100
					progressLength = progressLength > 100 ? 100 : progressLength
					progressLength = progressLength < 0 ? 0 : progressLength
					this.progressLength = progressLength
				}

				if (e.type == 'touchend') {
					this.setSongPlayTime({
						currentTime
					})
					// 开启自动进度条
					this.isTouchProgress = false
				}
			},
			// 匹配当前歌词
			getCurrentLrc() {
				// 匹配歌词

				if (this.lyrics.length <= 0) return

				// 找出匹配的歌词的下标
				let index = this.lyrics.findIndex((item, index, arr) => this.currentTime >= item.time && this.currentTime <
					arr[index + 1].time)
				index = index === -1 ? this.lrc_id : index

				const that = this
				// 下标不同才需要设置滚动
				if (index !== this.lrc_id) {
					this.lrc_id = index
					// // 获取当前歌词的高度
					this.query.select('#lrc_' + index).boundingClientRect(function(res) {
						that.lrcheight = res.height || that.lrcheight
					})
					this.query.exec()
					// 除以容器一半高度 主要是scroll-view组件 滚动到对应元素身上是在最顶部所以需要往后推几位 使当前歌词居中 此方法效果一般 暂时没有找到更好的
					let lrcCenterIndex = Math.floor(this.lrcWrapheight / that.lrcheight)

					// // // 跳转到对应歌词
					index = index - lrcCenterIndex
					index = index < 0 ? 0 : index
					this.lrc_scroll_id = index
				}
			},
			// 打开播放列表
			showSongList() {
				if (!this.iSshowSongList) {
					console.log(this.$refs.playlistRef);
					this.iSshowSongList = true
					this.$refs.playlistRef.openPopup()
				}
			},
			hideSongList() {
				this.iSshowSongList = false
			},
			// 返回
			goback() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		computed: {
			...mapState(['lyrics', 'playMode', 'currentTime', 'isPlay', 'playlist']),
			...mapGetters(['currentSong']),
		}
	}
</script>

<style lang="less">
	@import './index.less';
</style>
