import request from '@/request/index'
import {
	showToast
} from '@/utils/utils'


export default {
	// 获取歌曲链接
	getSongSrc({
		state,
		getters,
		commit
	}) {
		return new Promise(async (resolve, reject) => {
			// 先停止
			state.BackgroundAudioManager.stop()
			if (getters.currentSong.url) {
				resolve(getters.currentSong.url)
				return
			}

			// 后台获取播放链接
			const res = await request({
				url: '/song/url',
				data: {
					id: getters.currentSong.id,
					br: 320000
				}
			})
			// 如果没有获取到链接
			if (res.data.code !== 200) {
				reject('获取链接失败')
				return
			}

			const {
				url
			} = res.data.data[0] || ""

			// // 如果当前歌曲播放不了 
			if (!url) {
				reject('当前音乐不能播放,自动跳过')
			} else {
				resolve(url)
			}
		})
	},
	// 获取歌曲详情
	getSongDetail({
		getters
	}) {
		return new Promise(async (resolve, reject) => {
			const res = await request({
				url: '/song/detail',
				data: {
					ids: getters.currentSong.id,
				}
			})
			if (res.data.code !== 200) {
				reject('获取歌曲失败！')
				return
			}
			resolve(res.data.songs[0])
		})
	},
	// 获取歌词
	async getLyric({
		state,
		getters,
		commit
	}) {
		// 请求歌词
		const lyric = await request({
			url: '/lyric',
			data: {
				id: getters.currentSong.id
			}
		})
		// 判断当前歌曲是否有歌词 没有的话清空上一首的
		if (lyric.data.lrc) {
			this.dispatch('parseLyric', lyric.data.lrc.lyric)
		} else {
			commit('setLyric', {
				lyrics: [],
				times: []
			})
		}
	},
	// 解析歌词
	parseLyric({
		commit
	}, text) {
		const lyrics = [];
		let lrcArr = text.split("\n")
		let timeReg = /\[(\d*:\d*\.\d*)\]/g
		lrcArr.forEach(lrc => {
			// 用正则匹配时间
			let _times = lrc.match(timeReg)
			// 歌词
			let lyric = lrc.replace(timeReg, '').trim()
			// 过滤掉非歌词部分
			if (_times !== null && lyric) {
				_times.forEach(item => {
					const min = Number(String(item.match(/\[\d{2}/i)).slice(1));
					const sec = parseFloat(String(item.match(/\d{2}\.\d{2}/i)));
					//换算时间，保留两位小数
					var time = Math.round((min * 60 + sec) * 100) / 100;
					//把时间和对应的歌词保存到数组
					lyrics.push({
						time,
						lyric
					})
				})

			}
		});
		//重新按时间排序
		lyrics.sort(function(a, b) {
			return a.time - b.time;
		});
		// 最后添加一个最大的数 用于歌词比较
		lyrics.push({
			time: Number.MAX_SAFE_INTEGER,
		})

		commit('setLyric', {
			lyrics
		})
	},
	// 监听用户 播放操作
	switchPlaySong({
		state,
		commit,
		getters
	}) {
		// 如果没有链接
		if (!state.BackgroundAudioManager.src) {
			if (getters.currentSong.url) {
				state.BackgroundAudioManager.src = getters.currentSong.url
				state.BackgroundAudioManager.title = getters.currentSong.name
				state.currentTime && state.BackgroundAudioManager.seek(state.currentTime)
			} else {
				this.dispatch('getSongSrc').then(res => {
					state.BackgroundAudioManager.src = res
					state.BackgroundAudioManager.title = getters.currentSong.name
					state.currentTime && state.BackgroundAudioManager.seek(state.currentTime)
				})
			}
		}
		if (state.BackgroundAudioManager.paused && state.BackgroundAudioManager.src) {
			state.BackgroundAudioManager.play()
		}
		// commit('play')
	},
	// 监听用户 暂停操作
	switchPauseSong({
		state,
		commit
	}) {
		state.BackgroundAudioManager.pause()
		commit('pause')
	},
	async autoPlay({
		commit,
		getters,
		state
	}) {
		const [err, url] = await this.dispatch('getSongSrc').then(res => [null, res]).catch(err => [err, null])
		// 如果有错误
		if (err) {
			showToast({
				title: err
			})
			commit('next')
			return
		}
		// 如果没有封面
		if (!getters.currentSong.al) {
			this.dispatch('getSongDetail').then(res => {
				Object.assign(getters.currentSong, res)
			})
		}

		getters.currentSong.url = url
		state.BackgroundAudioManager.src = url
		state.BackgroundAudioManager.title = getters.currentSong.name
		commit('play')
		this.dispatch('getLyric')
	}
}
