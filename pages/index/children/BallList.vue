<template>
	<!-- 首页列表 -->
	<scroll-view :show-scrollbar="false" v-if="ballList.length" scroll-x enable-flex enhanced class="ball_list_wrap">
		<view class="ball_list">
			<view class="ball_list_item" v-for="item in ballList" :key="item.id" @touchstart="handleUrl"
				:data-name="item.name">
				<view class="ball_icon_wrap">
					<view class="ball_icon" :style="{'-webkit-mask-image': ' url('+ item.iconUrl+')'}">
					</view>
				</view>
				<view class="ball_title">{{item.name}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			ballList: {
				type: Array,
				default: []
			}
		},
		methods: {
			// 每日推荐歌曲
			handleUrl(e) {
				const {
					name
				} = e.currentTarget.dataset
				console.log(name);
				if (name == "每日推荐") {
					if (!this.$store.state.userInfo.userId) {
						showToast({
							title: '请先登录！'
						})
						uni.navigateTo({
							url: '/pages/login/login',
						});
						return
					}
					uni.navigateTo({
						url: '/pages/recommend_song/recommend_song'
					});
				}
			},
		}
	}
</script>

<style lang="less">
	.ball_list_wrap {
		padding-top: 10rpx;
		display: flex;
		height: 200rpx;
		position: relative;

		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 1px;
			background-color: #dfdfdf;
			transform: scaleY(0.5);
		}

		.ball_list {
			display: flex;
		}

		.ball_list_item {
			margin: 20rpx;
			text-align: center;

			.ball_icon_wrap {
				width: 100rpx;
				height: 100rpx;
				background-color: #fdf3f4;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.ball_icon {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background: linear-gradient(90deg, #f64649, #ff6e70);
					-webkit-mask-repeat: no-repeat;
					-webkit-mask-size: cover;
				}
			}

			.ball_title {
				margin-top: 15rpx;
				font-size: 26rpx;
				font-weight: 400;
				white-space: nowrap;
				color: #383838;
			}
		}

		.ball_list_item:first-child {
			margin-left: 30rpx;
		}
	}
</style>
