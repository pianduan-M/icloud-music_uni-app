<script>
	import {
		mapMutations,
		mapGetters,
		mapState
	} from 'vuex'

	import request from '@/request/index'

	import {
		showToast
	} from '@/utils/utils'

	export default {
		onLaunch: function() {
			this.initBackAudio()
		},
		onShow: function() {
			if (uni.getBackgroundAudioPlayerState) {
				uni.getBackgroundAudioPlayerState({
					success: (res) => {
						if (res.status === 0) {
							this.pause()
						} else if (res.status === 1) {
							this.play()
						}

						this.setCurrentTime({
							currentTime: res.currentPosition
						})
					}
				})
			}
		},
		onHide: function() {},
		globalData: {
			BackgroundAudioManager: null
		},
		methods: {
			...mapMutations(['play', 'pause', 'prev', 'next', 'setPlaylist', 'setCurrentTime', 'setAudioManager',
				'setCurrentIndex', 'setLyric', 'setPlayMode', 'saveUserInfo'
			]),
			// 监听 背景音乐各种事件
			initBackAudio() {

				this.globalData.BackgroundAudioManager = uni.getBackgroundAudioManager()
				this.setAudioManager(this.globalData.BackgroundAudioManager)
				// 监听播放事件
				this.globalData.BackgroundAudioManager.onPlay(() => {
					this.play()
				})
				// 监听暂停
				this.globalData.BackgroundAudioManager.onPause(() => {
					this.pause()
					uni.setStorageSync('currentTime', this.currentTime)
				})

				// 监听音频播放错误事件
				this.globalData.BackgroundAudioManager.onError(res => {
					this.pause()
					showToast({
						title: '播放错误！'
					})
					uni.setStorageSync('currentTime', this.currentTime)
				})
				// 背景音频自然播放结束事件
				this.globalData.BackgroundAudioManager.onEnded(res => {
					this.next()
				})
				// 用户在系统音乐播放面板点击上一曲事件
				this.globalData.BackgroundAudioManager.onPrev(res => {
					this.prev()
				})
				// 用户在系统音乐播放面板点击下一曲事件
				this.globalData.BackgroundAudioManager.onNext(res => {
					this.next()
				})
				// 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
				this.globalData.BackgroundAudioManager.onWaiting(res => {
					this.pause()
					uni.showLoading({
						title: '加载中'
					})
					uni.setStorageSync('currentTime', this.currentTime)
				})
				// 背景音频进入可以播放状态，但不保证后面可以流畅播放
				this.globalData.BackgroundAudioManager.onWaiting(res => {
					this.play()
					uni.hideLoading()
				})
				//读取缓存数据
				const userInfo = uni.getStorageSync('userInfo')|| {}
				const playlist = uni.getStorageSync('playlist') || []
				const currentTime = uni.getStorageSync('currentTime') || 0
				const currentIndex = uni.getStorageSync('currentIndex') || 0
				const playMode = uni.getStorageSync('playMode') || 'list'
				const lyrics = uni.getStorageSync('lyrics') || []
				this.setPlaylist({
					playlist
				})
				this.setCurrentTime({
					currentTime
				})
				this.setCurrentIndex({
					currentIndex
				})
				this.setLyric({
					lyrics
				})

				this.saveUserInfo({
					userInfo
				})
				this.setPlayMode(playMode)

			},

		},
		computed: {
			// 监听当前索引发生变化
			currentIndex() {
				return this.$store.state.currentIndex
			},
			...mapGetters(['currentSong']),
			...mapState(['currentTime'])
		},
		
	}
</script>

<style>
	 /* #ifndef APP-PLUS-NVUE */
	
	
	/*每个页面公共css */

	@import './static/style/icofont.css';
	
	@import './static/style/comon.css';

	img {
		width: 100%;
		vertical-align: middle;
	}

	image {
		width: 100%;
		vertical-align: middle;
	}

	view {
		box-sizing: border-box;
	}

	uni-page-body {
		height: 100%;
	}

	page {
		height: 100%;
	}
	/* #endif */
</style>
