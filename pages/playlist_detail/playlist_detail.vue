<template>
	<view class="playlist_detail_container" hover-class="none" :hover-stop-propagation="false">
		<view hidder class="playlist_detail" v-if="playlist.name">
			<!-- 歌单信息 -->
			<playlist-info :playlist="playlist" />
			<!-- 中间工具栏 -->
			<PlayListTools :playlist="playlist" />
			<!-- 歌单内容区 -->
			<view class="playlist_content">
				<!-- 内容头部区域 -->
				<playlist-content-head :playlist="playlist" />
				<!-- 歌单列表项 -->
				<view class="playlist_content_list">
					<!-- 列表项 -->
					<song-list v-for="(item, index) in playlist.tracks" :index="index" :song="item" :key="item.id"
						@click.native="toPlay(item.id,index)" />
				</view>
			</view>
			<!-- 音乐控件占位 -->
			<view class="music_bar_seat" style="height:80rpx" :style="{display: currentSong?'':'none'}"></view>
		</view>
		<reload v-if="isError" bindtap="reload" />
		<!-- 音乐控件 -->
		<MusicBar />
	</view>
</template>

<script>
	// 引入子组件
	import PlayListTools from './children/PlayListTools.vue'
	import PlaylistInfo from './children/PlaylistInfo.vue'
	import PlaylistContentHead from './children/PlaylistContentHead.vue'
	import SongList from '@/components/SongList/song-list.vue'
	import MusicBar from '@/components/MusicBar/music-Bar.vue'

	// pages/playlist_detail/index.js
	import request from '../../request/index'
	import {
		showToast
	} from '../../utils/utils.js'
	var appInst = getApp();

	import {
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				playlist: {},
				isError: false
			}
		},

		components: {
			PlayListTools,
			PlaylistInfo,
			PlaylistContentHead,
			SongList,
			MusicBar
		},
		onLoad(options) {
			const {
				id,
				type
			} = options
			if (type && type === 'recommend') {
				this.getRecommendPlaylist()
			} else {
				this.getPlaylistDetail(id)
			}
		},
		methods: {
			// 获取歌单详情
			async getPlaylistDetail(id) {
				// loading
				uni.showLoading({
					title: '加载中',
					mask: true,
				});
				// 自动关闭loading 
				setTimeout(() => {
					uni.hideLoading();
				}, 5000);
				// 发送请求
				const res = await request({
					url: '/playlist/detail',
					data: {
						id
					}
				})
				if (res.data.code !== 200) {
					showToast({
						title: '获取歌单失败！请重试'
					})
					this.isError = true
					uni.hideLoading();
					return
				}
				uni.hideLoading();
				// 设置数据
				this.playlist = res.data.playlist
			},
			// 跳转播放
			toPlay(id,currentIndex) {
				// 保存到vuex中
				this.$store.commit('setPlaylist', {
					playlist: this.playlist.tracks
				})
				
				this.$store.commit('setCurrentIndex', {
					currentIndex
				})
				this.$store.dispatch('autoPlay')

				// 跳转
				uni.navigateTo({
					url: '/pages/play_music/play_music?id=' + id
				})
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
		},
		computed: {
			...mapGetters(['currentSong'])
		}
	}
</script>

<style lang="less">
	.playlist_detail {
		position: relative;
		height: 100%;

		// 歌曲列表区
		.playlist_content {
			position: relative;
			padding: 30rpx 0;

			// 列表容器
			.playlist_content_list {
				padding-top: 20rpx;
			}
		}


	}
</style>
