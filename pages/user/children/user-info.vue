<template>
	<view class="user_info" @click="login">
		<!-- 用户头像 -->
		<navigator hover-class="none" class="user_avatar">
			<image :src="userInfo.avatarUrl ? userInfo.avatarUrl : '../../static/images/user_avatar_default.png'"
				mode="widthFix"></image>
		</navigator>
		<!-- 用户昵称 -->
		<view hover-class="none" class="user_name" :class="{between:userInfo.nickname}">
			<text class="text">{{userInfo.nickname ? userInfo.nickname : '立即登录'}}</text>
			<text class="text iconfont icon-rightarrow" v-if="!userInfo.nickname"></text>
			<text class="logout" @click="logout" v-if="userInfo.nickname">退出</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import request from '@/request/index.js'

	export default {
		props: {
			userInfo: {
				type: Object,
				default: {}
			}
		},
		methods: {
			...mapMutations(['clearUserInfo']),
			login() {
				// 如果已经登入
				if (this.userInfo.nickname) return
				uni.navigateTo({
					url: '/pages/login/login',
				})
			},
			logout() {
				uni.showModal({
					title: '',
					content: '退出登录？',
					showCancel: true,
					cancelText: '取消',
					cancelColor: '#000000',
					confirmText: '确定',
					confirmColor: '#3CC51F',
					success: async (result) => {
						if (result.confirm) {
							// 退出登录
							await request({
								url: '/logout'
							})
							// 清除缓存
							uni.clearStorageSync();
							this.clearUserInfo()
							// 跳转页面
							uni.reLaunch({
								url: '/pages/user/index'
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	// 用户信息样式
	.user_info {
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		overflow: hidden;

		.user_avatar {
			width: 100rpx;
			height: 100rpx;
			border: 2px solid #fff;
			border-radius: 50%;
			margin-right: 20rpx;
			overflow: hidden;
			flex-shrink: 0;
		}

		.user_name {
			flex: 5;
			display: flex;
			align-items: center;

			&.between {
				justify-content: space-between;

			}

			.text {
				font-size: 32rpx;
				font-weight: 400;
				color: rgb(0, 0, 0);

			}

			.logout {
				font-size: 26rpx;
				border: 1px solid currentColor;
				padding: 2rpx 15rpx;
				color: var(--themeColor);
				border-radius: 60rpx;
			}
		}
	}
</style>
