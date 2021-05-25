<template>
	<view class="tab-bar-container" v-if="currentSong">

		<navigator url="/pages/play_music/play_music" hover-class="none" open-type="navigate" class="tab-bar-wrap">
			<!-- 封面 -->
			<view class="tabbar_song_cover">
				<div class="song_cover_wrap">
					<image class="cover" :src="currentSong.al.picUrl" mode="aspectFill"></image>
				</div>
			</view>
			<!-- 音乐信息 -->
			<view class="tabbar_song_name">
				<view class="song_name_wrap">
					<text class="song_name">{{currentSong.name}}</text>
					<text class="line">-</text>
					<text class="singer">{{currentSong.ar[0].name}}</text>
				</view>
			</view>
			<view class="tabbar_song_icon">
				<!-- 播放按钮 -->
				<text class="paly_btn" @click.stop="switchPlay">
					<text class="iconfont" :class="'icon-'+ (isPlay?'zanting':'bofang1')"></text>
				</text>
				<!-- 列表按钮 -->
				<view class="play_menu" @click.stop="showSongList">
					<text class="iconfont icon-bofangliebiao"></text>
				</view>
			</view>
		</navigator>
		<CurrentPlayList ref="playlistRef" @closePopup="hideSongList" />
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapActions
	} from 'vuex'

	// 当前播放列表
	import CurrentPlayList from '@/components/CurrentPlayList/current-play-list.vue'



	export default {
		data() {
			return {
				isOpenList: false
			}
		},
		computed: {
			...mapGetters(['currentSong']),
			...mapState(['isPlay'])
		},
		components: {
			CurrentPlayList
		},
		methods: {
			...mapActions(['switchPlaySong', 'switchPauseSong']),
			switchPlay() {
				if (this.isPlay) {
					this.switchPauseSong()
				} else {
					this.switchPlaySong()
				}
			},
			showSongList() {
				if (!this.isOpenList) {
					this.isOpenList = true
					this.$refs.playlistRef.openPopup()
					setTimeout(() => {
						uni.hideTabBar()
					}, 100)
				}
			},
			hideSongList() {
				this.isOpenList = false
				setTimeout(() => {
					uni.showTabBar()
				}, 200)
			}
		},

	}
</script>

<style lang="less">
	.tab-bar-container {
		width: 100%;
		height: 80rpx;

		background-color: #f9f9f9;
		position: fixed;
		z-index: 9999;
		left: 0;
		right: 0;
		bottom: var(--window-bottom);

		.tab-bar-wrap {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
		}


		.tabbar_song_cover {
			flex: 1;
			flex-shrink: 0;
			position: relative;

			div.song_cover_wrap {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;

				position: absolute;
				bottom: 0;
				left: 30rpx;
				background-color: #000;
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 1;

				image {
					width: 70%;
					height: 70%;
					vertical-align: middle;
					border-radius: 50%;
				}
			}
		}

		.tabbar_song_name {
			flex: 4;
			height: 100%;
			display: flex;
			width: 100%;
			margin-left: 20rpx;
			align-items: center;
			overflow: hidden;

			.song_name_wrap {
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

				.song_name {
					width: 70%;
					font-size: 30rpx;
					color: rgba(0, 0, 0, .8);
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.line {
					margin: 0 10rpx;
					color: #919191;
					font-size: 26rpx;
					font-weight: 300;
				}

				.singer {
					font-size: 26rpx;
					color: #919191;
					font-weight: 300;
				}
			}
		}

		.tabbar_song_icon {
			flex: 1;
			flex-shrink: 0;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 30rpx;
			text-align: center;

			.paly_btn {
				margin-left: 20rpx;

				.iconfont {
					font-size: 36rpx;
				}
			}

			.iconfont {
				font-size: 30rpx;
			}

			.play_menu {
				padding: 10rpx;
			}
		}
	}
</style>
