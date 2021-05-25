<template>
	<view class="search">
		<!-- 头部搜索框 -->
		<view class="search_head">
			<view class="search_wrap">
				<!-- input -->
				<input :focus="true" :value="SearchValue" @input="handleSearch" type="text" @confirm="search"
					:placeholder="defaultSearch" placeholder-class="input_plac" />
				<!-- icon -->
				<icon class="search_icon" type="search" size="20"></icon>
				<icon class="clear_icon" type="clear" size="15" data-type="input" v-show="SearchValue"
					@click.stop="cleartHistory"></icon>
			</view>
			<!-- 按钮 -->
			<view class="search_btn" data-type="btn" @click="search">搜索</view>
		</view>

		<!-- 内容区 -->
		<view class="search_container">
			<scroll-view class="search_content">
				<!-- 历史搜索 -->
				<view class="search_his" v-if="historySearch.length">
					<!-- 容器 -->
					<view class="search_his_wrap">
						<!-- 左侧标题 -->
						<view class="his_title">历史</view>
						<!-- item 项 -->
						<scroll-view class="his_item_content" scroll-x enable-flex>
							<view style="display: flex;">
								<view class="his_item" :key="item" data-type="list" :data-value="item" @click="search"
									v-for="item in historySearch">
									{{item}}
								</view>
							</view>
						</scroll-view>
						<!-- 清空按钮 -->
						<view class="his_delete" data-type="history" @click="cleartHistory">
							<text class="iconfont icon-lajixiang"></text>
						</view>
					</view>
				</view>
				<!-- 热搜 -->
				<view class="hot_search">
					<!-- 容器 -->
					<view class="hot_search_wrap">
						<!-- 头部标题区 -->
						<view class="hot_head">
							<view class="title">热搜榜</view>
						</view>
						<!-- 列表内容区 -->
						<view class="hot_contnet">
							<view class="hot_item_wrap" v-for="(item,index) in hotSearch" :key="index" data-type="list"
								:data-value="item.searchWord" @click="search">
								<view class="num" :style="{color:index < 3 ? 'red':''}">{{index+1}}</view>
								<view class="name">{{item.searchWord}}</view>
								<view class="icon" v-if="item.iconUrl">
									<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 搜索建议列表 -->
		<scroll-view class="search_result" v-if="suggest.length">
			<view class="search_result_wrap">
				<view class="result_item" :key="item.keyword" v-for="item in suggest" data-type="list"
					:data-value="item.keyword" @click="search">
					<icon type="search" size="23" color=""></icon>
					<view class="item_value">{{item.keyword}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import request from '../../request/index'

	export default {
		data() {
			return {
				defaultSearch: '',
				hotSearch: [],
				SearchValue: '',
				historySearch: [],
				// 搜索建议
				suggest: []
			};
		},
		onLoad: function(options) {
			// 获取默认页面数据
			this.getSearchValue()
		},
		onShow() {
			this.historySearch = uni.getStorageSync('historySearch') || [];
		},
		methods: {
			// 获取默认页面数据
			async getSearchValue() {
				// 默认搜索词
				const res = await request({
					url: '/search/default'
				})
				this.defaultSearch = res.data.data.showKeyword
				// 热搜词
				const res1 = await request({
					url: '/search/hot/detail'
				})
				this.hotSearch = res1.data.data
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
					this.suggest = res.data.result.allMatch
				}, 200);
			},
			search(e) {
				const {
					type,
					value
				} = e.currentTarget.dataset
				let {
					historySearch,
					SearchValue,
					defaultSearch
				} = this

				SearchValue = value

				if (!SearchValue) return
				//搜索词保存到缓存
				const index = historySearch.findIndex(item => item == SearchValue)

				// 以前有 先删除 再提到最前面
				if (index !== -1) {
					historySearch.splice(index, 1)
					historySearch.unshift(SearchValue)
				} else {
					// 以前没有自己加到数组里
					historySearch.unshift(SearchValue)
				}
				// 存储到缓存
				uni.setStorageSync('historySearch', historySearch);

				uni.navigateTo({
					url: '/pages/search_result/search_result?keywords=' + SearchValue,
				});
			},
			// 清空
			cleartHistory(e) {
				const {
					type
				} = e.currentTarget.dataset
				// 清空 input 值
				if (type === 'input') {
					this.SearchValue = ''
					this.suggest = []
				} else {
					// 清空历史搜索
					const {
						historySearch
					} = this
					uni.setStorageSync('historySearch', []);
					this.historySearch = []
				}
			}
		}
	}
</script>

<style lang="less">
	.search {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		padding: 30rpx;

		// 头部 表单区
		.search_head {
			position: relative;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.search_wrap {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex: 4;

				input {
					flex: 4;
					padding: 10rpx 70rpx;
					border-radius: 50rpx;
					background-color: #f8f8f8;
				}

				.input_plac {
					color: #c7c7c7;
					font-weight: 400;
					font-size: 26rpx;
				}

				icon {
					position: absolute;
					margin: 0 15rpx;
				}

				.clear_icon {
					right: 0;
				}
			}

			.search_btn {
				width: 80rpx;
				text-align: right;
				flex-shrink: 0;
				float: right;
			}

		}

		// 内容区
		.search_content {
			position: relative;

			// 历史搜索
			.search_his {
				// padding: 20rpx 0;

				.search_his_wrap {
					display: flex;
					align-items: center;
					height: 90rpx;

					.his_title {
						padding-right: 30rpx;
						flex-shrink: 0;
						font-size: 28rpx;
					}

					.his_item_content {
						display: flex;
						align-items: center;
						padding-top: 20rpx;
						overflow: hidden;
						height: 100rpx;

						.his_item {
							flex-shrink: 0;
							margin-top: 20rpx;
							margin-right: 15rpx;
							font-size: 24rpx;
							font-weight: 300;
							color: #919191;
							background-color: #f6f6f6;
							padding: 10rpx 20rpx;
							border-radius: 50rpx;
						}
					}

					.his_delete {
						width: 50rpx;
						flex-shrink: 0;
						text-align: right;

						text.iconfont {}
					}
				}
			}

			// 热搜区域
			.hot_search {

				// 容器
				.hot_search_wrap {

					// 头部
					.hot_head {
						display: flex;
						justify-content: space-between;
						font-size: 32rpx;
						padding: 20rpx 0;
					}

					// 列表区
					.hot_contnet {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						width: 100%;

						.hot_item_wrap {
							width: 50%;
							flex-shrink: 0;
							padding: 10rpx 0;
							font-size: 30rpx;
							display: flex;

							.num {
								width: 40rpx;
								flex-shrink: 0;
								color: #919191;
							}

							.name {}

							.icon {
								image {
									width: 30rpx;
									height: 20rpx;
									margin-left: 10rpx;

								}
							}
						}
					}
				}
			}
		}

		.search_container {
			position: relative;
		}

		// 搜索建议
		.search_result {
			position: absolute;
			left: 0;
			top: 90rpx;
			right: 0;
			width: 100vw;
			height: 80vh;
			background-color: #fff;
			color: #3a3a3a;
			z-index: 999;

			.search_result_wrap {
				padding-top: 10rpx;

				.result_item {
					position: relative;
					display: flex;
					align-items: center;
					width: 100%;
					padding: 15rpx;

					&::after {
						content: '';
						position: absolute;
						left: 50rpx;
						right: 0;
						bottom: 0;
						height: 1rpx;
						transform: scaleY(0.5);
						background-color: #f1f1f1;
					}

					icon {
						width: 50rpx;
						flex-shrink: 0;
					}

					.item_value {
						position: relative;
						width: 100%;

					}
				}
			}
		}
	}
</style>
