<template>
	<view class="search_result">
		<!-- 头部搜索框 -->
		<view class="search_head">
			<view class="search_wrap">
				<!-- input -->
				<input :value="SearchValue" @input="handleSearch" type="text" @confirm="search"
					placeholder-class="input_plac" />
				<!-- icon -->
				<icon class="clear_icon" type="clear" size="15" data-type="input" v-show="SearchValue"
					@click.stop="cleartHistory"></icon>
			</view>

			<!-- 搜索建议列表 -->
			<scroll-view class="search_suggest" v-show="suggest.length">
				<view class="search_suggest_wrap">
					<view class="suggest_item" :key="item.keyword" v-for="item in suggest" data-type="list"
						@click="search(item.keyword)">
						<icon type="search" size="18" color=""></icon>
						<view class="item_value">{{item.keyword}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- nav 导航栏 -->
		<view class="nav_container">
			<scroll-view scroll-x class="navScroll" enable-flex :scroll-into-view="navId" scroll-with-animation
				:show-scrollbar="false">
				<view class="nav_item_wrap">
					<view :id="'scroll' + index" class="navItem" :style="{fontWeight:item===currentNavItem?'600':''}"
						v-for="(item,index) in searchGroupList" :key="item.id" @click="changeNav" :data-name="item"
						:data-index="index">
						{{item}}
					</view>
					<view class="active" id="nav_suffix"
						:style="{transform: 'translateX('+ (Navleft + suffixDiffValue) +'px)'}"></view>
				</view>
			</scroll-view>
		</view>

		<swiper style="height: 100%;" @change="handleswiperChange" :current="currentIndex">
			<swiper-item>
				<scroll-view class="result_content" scroll-y>
					<!-- 综合搜索结果 -->
					<view class="multipleResult" v-show="currentNavItem === '综合'">
						<result-card v-if="resultMultiple.song">
							<template v-slot:title>
								<h3>单曲</h3>
							</template>

							<template v-slot:body>
								<SongList :song="item" v-for="(item,index) in resultMultiple.song.songs" :index="index"
									:key="item.id" />
							</template>
							<template v-slot:foot>
								<view @click="changeNav({index:1,name:'单曲'})"
									v-html="FormatHighText(resultMultiple.song.moreText,resultMultiple.song.highText)">
								</view>
							</template>
						</result-card>

						<result-card v-if="resultMultiple.playList">
							<template v-slot:title>
								<h3>歌单</h3>
							</template>
							<template v-slot:body>
								<PlaylistList v-for="item in resultMultiple.playList.playLists" :key="item.id"
									:playlist="item" :hightext="resultMultiple.playList.highText" />
							</template>
							<template v-slot:foot>
								<view @click="changeNav({index:2,name:'歌单'})"
									v-html="FormatHighText(resultMultiple.playList.moreText,resultMultiple.playList.highText)">
								</view>
							</template>
						</result-card>

						<result-card v-if="resultMultiple.video">
							<template v-slot:title>
								<h3>视频</h3>
							</template>
							<template v-slot:body>
								<VideoList v-for="item in resultMultiple.video.videos" :key="item.vid" :video="item"
									:hightext="resultMultiple.video.highText" />
							</template>
							<template v-slot:foot>
								<view @click="changeNav({index:3,name:'视频'})"
									v-html="FormatHighText(resultMultiple.video.moreText,resultMultiple.video.highText)">
								</view>
							</template>
						</result-card>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 单曲 -->
			<swiper-item>
				<scroll-view class="result_content" scroll-y @scrolltolower="songScrolltolower">
					<!-- 歌单内容头部区域 -->
					<view class="result_content_head">
						<view class="head_left">
							<text class="iconfont icon-play1"></text>
						</view>
						<view class="head_center">
							<view class="text">
								<text>播放全部</text>
								<text class="num">({{songs.length}})</text>
							</view>
							<view class="icon">
								<text class="iconfont icon-xiazai"></text>
							</view>
						</view>
						<view class="head_right">
							<text class="iconfont icon-select"></text>
						</view>
					</view>
					<view class="list_item" v-for="item in songs" :key="item.id" @click="toPlayMusic"
						:data-id="item.id">
						<!-- 序列 -->
						<!-- <view class="num" style="{{index>=99?'font-size:24rpx':''}}">{{index+1}}</view> -->
						<!-- 歌曲信息 -->
						<view class="song_info">
							<view class="song_name_wrap">
								<view class="song_name">{{item.name}}</view>
								<view class="singer">{{item.artists[0].name}}-{{item.album.name}}</view>
							</view>
							<view class="icon" v-if="item.mv !== 0">
								<text class="iconfont icon-bofang"></text>
							</view>
						</view>
						<!-- 右侧菜单栏 -->
						<view class="item_menu">
							<text class="iconfont icon-diandiandianshu"></text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 歌单 -->
			<swiper-item>
				<scroll-view class="result_content" scroll-y @scrolltolower="playlistScrolltolower">
					<PlaylistList v-for="item in playlists" :key="item.id" :playlist="item" :hightext="SearchValue" />
				</scroll-view>
			</swiper-item>

			<!-- 视频 -->
			<swiper-item>
				<scroll-view class="result_content" scroll-y @scrolltolower="videoScrolltolower">
					<VideoList v-for="item in videos" :key="item.vid" :video="item" :hightext="SearchValue" />
				</scroll-view>
			</swiper-item>
		</swiper>


	</view>
</template>
video
<script>
	import request from '../../request/index'
	var appInst = getApp();

	import ResultCard from './children/result-card.vue'
	import SongList from '@/components/SongList/song-list.vue'
	import PlaylistList from '@/components/PlaylistList/playlist-list.vue'
	import VideoList from './children/video-list.vue'

	export default {
		data() {
			return {
				searchGroupList: [
					'综合', '单曲', '歌单', '视频', '歌手', '播单', '歌词', '专辑', '声音', '云圈', '用户'
				],
				Navleft: 0,
				songs: [],
				songPage: 0,
				playlists: [],
				playlistPage: 0,
				videos: [],
				videoPage: 0,
				suggest: [],
				SearchValue: '',
				historySearch: [],
				resultMultiple: {},
				// nav条 单个宽度
				navItemWidth: 0,
				// nav 下标宽度 跟 navitem 宽度差值 为了居中下标
				suffixDiffValue: 0,
				currentNavItem: '综合',
				// swiper 索引
				currentIndex: 0
			}
		},
		components: {
			ResultCard,
			SongList,
			PlaylistList,
			VideoList
		},
		onLoad: function(options) {
			const {
				keywords
			} = options
			this.SearchValue = keywords
			// 搜索
			this.getSearchResult(keywords)
		},
		onShow() {
			this.historySearch = uni.getStorageSync('historySearch') || [];
		},
		methods: {
			async getSearchResult(keywords) {
				uni.showLoading({
					title: '加载中'
				})
				// 综合搜索
				const res = await request({
					url: '/search',
					data: {
						keywords,
						type: 1018
					}
				})
				uni.hideLoading()
				if (res.data.code !== 200) return
				this.resultMultiple = {
					song: res.data.result.song,
					playList: res.data.result.playList,
					video: res.data.result.video
				}
			},
			// 单独搜索歌曲
			async searchSongs(keywords) {
				uni.showLoading({
					title: '加载中'
				})
				const res = await request({
					url: '/search',
					data: {
						keywords,
						type: 1,
						offset: this.songPage
					}
				})
				uni.hideLoading()
				if (res.data.code !== 200) return
				if (this.songPage !== 0) {
					this.songs.push(...res.data.result.songs)
				} else {
					this.songs = res.data.result.songs
				}
			},
			// 单独搜索歌单
			async searchPlaylist(keywords) {

				uni.showLoading({
					title: '加载中'
				})
				console.log(this.playlistPage);
				const res = await request({
					url: '/search',
					data: {
						keywords,
						type: 1000,
						offset: this.playlistPage
					}
				})
				uni.hideLoading()
				if (res.data.code !== 200) return
				if (this.playlistPage !== 0) {
					this.playlists.push(...res.data.result.playlists)
				} else {
					this.playlists = res.data.result.playlists
				}
			},
			// 单独搜索视频
			async searchvideo(keywords) {
				uni.showLoading({
					title: '加载中'
				})
				const res = await request({
					url: '/search',
					data: {
						keywords,
						type: 1014,
						offset: this.videoPage
					}
				})
				uni.hideLoading()
				if (res.data.code !== 200) return
				if (this.videoPage !== 0) {
					this.videos.push(...res.data.result.videos)
				} else {
					this.videos = res.data.result.videos
				}
			},
			// 导航栏切换
			changeNav(e) {
				// 如果是 点击导航栏
				if (e.target) {
					var {
						index,
						name
					} = e.target.dataset
					if (this.navItemWidth <= 0) {
						this.getNavItemWidth()
					}

				} else {
					// 这是 点击综合页 单个卡片页切换 此时的 e 是传过来的形参
					var {
						index
					} = e
					var name = this.searchGroupList[index]
				}
				this.Navleft = this.navItemWidth * index
				this.currentNavItem = name
				this.currentIndex = index

				// 发起后台请求
				switch (name) {
					case '单曲':
						if (this.songs.length === 0) {
							this.searchSongs(this.SearchValue)
						}
						break;
					case '歌单':
						if (this.playlists.length === 0) {
							this.searchPlaylist(this.SearchValue)
						}
						break;

					case '视频':
						if (this.videos.length === 0) {
							this.searchvideo(this.SearchValue)
						}
						break;

					default:
						break;
				}
			},
			// 搜索建议
			handleSearch(e) {
				const {
					value
				} = e.detail
				this.SearchValue = value

				if (!value) {
					this.suggest = []
				}
				// 简单防抖 获取搜索建议
				this.timeoutId && clearTimeout(this.timeoutId)
				this.timeoutId = setTimeout(async () => {
					const res = await request({
						url: '/search/suggest',
						data: {
							type: 'mobile',
							keywords: value
						}
					})
					if (res.data.code !== 200) return
					this.suggest = res.data.result.allMatch
				}, 200);
			},
			// 清空
			cleartHistory(e) {
				this.SearchValue = ''
				uni.navigateBack({
					delta: 1
				})
			},
			// 搜索
			search(value) {
				//搜索词保存到缓存
				const index = this.historySearch.findIndex(item => item == value)

				// 以前有 先删除 再提到最前面
				if (index !== -1) {
					this.historySearch.splice(index, 1)
					this.historySearch.unshift(value)
				} else {
					// 以前没有自己加到数组里
					this.historySearch.unshift(value)
				}
				// 存储到缓存
				uni.setStorageSync('historySearch', this.historySearch);
				// 清空上一次搜索结果
				this.songs = []
				this.playlists = []
				this.videos = []
				this.suggest = []
				// 发搜索请求
				this.getSearchResult(value)
			},
			async toPlayMusic(e) {
				const {
					id
				} = e.currentTarget.dataset
				const currentSong = this.songs.find(item => item.id === id)
				appInst.globalData.playlist = [currentSong]

				uni.navigateTo({
					url: '/pages/play_music/play_music?id=' + id
				});
			},
			// 高亮关键词
			FormatHighText(text, hightext) {
				if (!hightext) return text
				// 高亮文字
				var reg = new RegExp(hightext, 'i')
				return text.replace(reg, `<span style='color:#55aaff'>${hightext}</span>`)
			},
			// 获取navitem 宽度
			getNavItemWidth() {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#scroll0').boundingClientRect()
					query.select('#nav_suffix').boundingClientRect()
					const that = this
					query.exec(function(res) {
						that.navItemWidth = res[0].width
						that.suffixDiffValue = (that.navItemWidth - res[1].width) /
							4
					})

				}, 200)

				// this.navItemWidth = this.$refs.navItemWrapRef.$el.childNodes[0].offsetWidth
				// // 计算navitem 宽度 跟下标宽度的插值 为了居中下标
				// this.suffixDiffValue = (this.navItemWidth - this.$refs.suffixRef.$el.offsetWidth) / 4 - 2
			},
			// 结果页 sweiper change 事件
			handleswiperChange(e) {
				const index = e.detail.current
				this.changeNav({
					index
				})
			},
			// 歌单滚动触底 加载更多
			playlistScrolltolower() {
				this.playlistPage++
				this.searchPlaylist(this.SearchValue)
			},// 单曲滚动触底 加载更多
			songScrolltolower() {
				this.songPage++
				this.searchSongs(this.SearchValue)
			},// 视频滚动触底 加载更多
			videoScrolltolower() {
				this.videoPage++
				this.searchvideo(this.SearchValue)
			},
		},
		mounted() {
			this.getNavItemWidth()
		},
		computed: {
			navId() {
				if (this.currentIndex >= 4) {
					return 'scroll' + (this.currentIndex - 4 / 2)
				} else {
					return 'scroll0'
				}
			}
		}
	}
</script>

<style lang="less">
	@import './index.less';
</style>
