export default {
	// 暂停
	pause(state) {
		state.isPlay = false
	},
	// 播放
	play(state) {
		state.isPlay = true
	},
	// 上一首
	prev(state) {
		// 列表循环
		if (state.playMode === 'list' || state.playMode === 'one') {
			if (state.currentIndex === 0) {
				state.currentIndex = state.playlist.length - 1
			} else {
				state.currentIndex--
			}
		}
		// 随机播放
		if (state.playMode === 'random') {
			state.currentIndex = Math.floor(Math.random() * state.playlist.length)
		}
		uni.setStorageSync('currentIndex', state.currentIndex)
		this.dispatch('autoPlay')
	},

	// 下一首
	next(state) {
		// 列表循环
		if (state.playMode === 'list' || state.playMode === 'one') {
			if (state.currentIndex === state.playlist.length - 1) {
				state.currentIndex = 0
			} else {
				state.currentIndex++
			}
		}
		// 随机播放
		if (state.playMode === 'random') {
			state.currentIndex = Math.floor(Math.random() * state.playlist.length)
		}
		uni.setStorageSync('currentIndex', state.currentIndex)
		this.dispatch('autoPlay')
	},
	// 播放列表
	setPlaylist(state, payload) {
		state.playlist = payload.playlist
		uni.setStorageSync('playlist', payload.playlist)
	},
	// 当前播放时间
	setCurrentTime(state, payload) {
		state.currentTime = payload.currentTime
		uni.setStorageSync('currentTime', payload.currentTime)
	},
	// 当前播放歌曲的索引
	setCurrentIndex(state, payload) {
		state.currentIndex = payload.currentIndex
		uni.setStorageSync('currentIndex', payload.currentIndex)
	},
	// 背景音乐管理器
	setAudioManager(state, payload) {
		state.BackgroundAudioManager = payload
	},
	// 设置歌词
	setLyric(state, payload) {
		state.lyrics = payload.lyrics
		uni.setStorageSync('lyrics', payload.lyrics)
	},
	// 播放模式
	setPlayMode(state, playMode) {
		state.playMode = playMode
		uni.setStorageSync('playMode', playMode)
	},
	// 设置歌曲播放时间
	setSongPlayTime(state, payload) {
		// console.log(state.BackgroundAudioManager);
		state.BackgroundAudioManager.seek(payload.currentTime)
		state.currentTime = payload.currentTime
		state.BackgroundAudioManager.play()
	},
	// 删除播放列表的歌曲
	deletePlaylistSong(state, payload) {
		state.playlist.splice(payload.index, 1)
	}
}
