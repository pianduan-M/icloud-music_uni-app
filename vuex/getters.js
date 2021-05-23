export default {
	// 当前歌曲
	currentSong:(state) => {
		return state.playlist[state.currentIndex]
	}
}