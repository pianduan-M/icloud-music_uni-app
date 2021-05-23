<template>

	<uni-popup ref="popup" type="bottom" style="height: 100vh;" @change="popupChange">
		<view class="current_play_list">
			<view class="song_list_head" v-if="playlist.length">
				<text class="title">当前播放</text>
				<text class="num">({{playlist.length}})</text>
			</view>
			<!-- 歌单列表项 -->
			<scroll-view class="song_list_content" scroll-y enhanced :scroll-into-view="'song_'+currentIndex"
				v-if="playlist.length">

				<view class="song_list_item" v-for="(item,index) in playlist" :key="item.id" :id="'song_'+index"
					@click.stop="playMusic(index)">
					<!-- 序列 -->
					<view class="num" :style="{fontSize:index>=99?'24rpx':''}">{{ index + 1}}</view>
					<view class="song_name_wrap">

						<view class="song_name" :class="index===currentIndex?'isCurrent':''">

							<text class="tag" v-if="item.fee == 1">VIP</text>
							{{item.name}}
						</view>

						<text :class="index===currentIndex?'isCurrent':''">-</text>

						<view class="singer" :class="index===currentIndex?'isCurrent':''">{{item.ar[0].name}}</view>

					</view>
					<view class="song_icon" @click.stop="deleteSong(index)">
						<text class="iconfont icon-delete"></text>
					</view>
				</view>

			</scroll-view>

			<view v-if="!playlist.length" style="text-align: center;line-height: 300px;">当前没有播放的歌曲</view>

		</view>


	</uni-popup>

</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'

	export default {
		props: {

		},
		computed: {
			...mapState(['playlist', 'currentIndex'])
		},
		methods: {
			...mapMutations(['setCurrentIndex', 'deletePlaylistSong']),
			...mapActions(['autoPlay']),
			// 打开 播放列表
			openPopup() {
				this.$refs.popup.open()
			},
			// 关闭 播放列表
			closePopup() {
				this.$refs.popup.close()
			},
			// 关闭后的回调
			popupChange(e) {
				if (!e.show) {
					this.$emit('closePopup')
				}
			},
			// 播放音乐
			playMusic(currentIndex) {
				this.setCurrentIndex({
						currentIndex
					}),
					this.autoPlay()
			},
			// 删除列表中的歌曲
			deleteSong(index) {
				console.log('----------', index);
				if (this.currentIndex < index) {
					this.deletePlaylistSong({
						index
					})
				}
				if (this.currentIndex === index) {
					this.deletePlaylistSong({
						index
					})
					this.autoPlay()
				}
				if (this.currentIndex > index) {
					this.deletePlaylistSong({
						index
					})
					this.setCurrentIndex({
						currentIndex: this.currentIndex - 1
					})
				}

			}
		}
	}
</script>

<style lang="less">
	// 播放列表
	.current_play_list {
		// position: fixed;
		// top: 0;
		// left: 0;
		// right: 0;
		// bottom: 0;
		width: 96%;
		min-height: 300px;

		padding: 30rpx;
		border-radius: 30rpx;
		overflow: hidden;
		margin: 0 auto;
		// z-index: 999999;
		background-color: #fff;
		box-shadow: 0 0 50rpx rgba(0, 0, 0, 0.1);


		.song_list_wrap {
			position: absolute;
			left: 30rpx;
			bottom: 0;
			width: calc(100% - 60rpx);
			height: 60vh;
			background-color: #fff;
			border-radius: 30rpx;
			padding: 20rpx;
			box-shadow: 0 0 50rpx rgba(0, 0, 0, 0.1);
		}




		.song_list_head {
			width: 100%;
			font-size: 36rpx;
			padding-bottom: 30rpx;
			position: relative;

			.num {
				font-size: 26rpx;
				color: #919191;
				margin-left: 10rpx;
			}

		}

		.song_list_content {
			width: 100%;
			height: 60vh;
			overflow: hidden;
			padding-bottom: 60rpx;

			.song_list_item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				align-items: center;
				
				.num {
					font-size: 30rpx;
					color: #919191;
					padding: 0 10rpx;
					margin-right: 10rpx;
				}
				
				.song_name_wrap {
					display: flex;
					align-items: center;
					width: 90%;

					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;

					.isCurrent {
						color: var(--themeColor) !important;
					}

					// vip标识
					.tag {
						position: relative;
						top: -1rpx;
						font-size: 10rpx;
						color: var(--themeColor);
						margin-right: 8rpx;
						padding: 3rpx 10rpx;
						line-height: 10rpx;
						transform: scaleY(0.5);

						&::after {
							content: '';
							position: absolute;
							left: 0;
							top: 0;
							right: 0;
							bottom: 0;
							border: 1rpx solid rgba(249, 71, 71, 0.3);
							border-radius: 10rpx;
							transform: scaleY(0.8);
						}
					}

					.song_name {
						font-size: 30rpx;
						color: rgba(0, 0, 0, .8);
					}

					text {
						font-size: 24rpx;
						color: #919191;
						margin: 0 10rpx;
					}

					.singer {
						font-size: 24rpx;
						color: #919191;
					}
				}

				.song_icon {
					width: 50rpx;
					height: 50rpx;
					flex-shrink: 0;

					.iconfont {
						color: #919191;
					}
				}
			}
		}
	}
</style>
