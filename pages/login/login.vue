<template>
	<view class="login_container">
		<!-- 标题 -->
		<view class="login_title">
			<text>登录体验更精彩</text>
			<view>{{type==='id' ? '' : '未注册手机号码登录后将自动创建账号'}}</view>
		</view>
		<!-- 切换手机/邮箱登录 -->
		<view class="login_tab" @click="handleLoginType">
			<view class="tab_item " :class="type==='id'? 'active' :'' ">
				<text id="id">账号登录</text>
			</view>
			<view class="tab_item " :class="type==='phone'? 'active' :'' ">
				<text id="phone">验证码登录</text>
			</view>
		</view>
		<!-- 表单项 -->
		<view class="login_form">
			<block class="login_id" v-if="type === 'id'">
				<view class="login_row">
					<view class="label">手机/邮箱:</view>
					<view class="form_input">
						<input type="text" @input="changInput" :value="user.value" id="user" placeholder="输入手机号码/邮箱"
							focus placeholder-style="font-size: 24rpx" />
						<view class="roles">{{user.roleText}}</view>
					</view>
				</view>
				<view class="login_row">
					<view class="label">密码:</view>
					<view class="form_input">
						<input type="password" @input="changInput" id="password" :value="password.value"
							placeholder="输入密码" placeholder-style="font-size: 24rpx" />
						<view class="roles">{{password.roleText}}</view>
					</view>
				</view>
			</block>
			<block class="login_phone" v-else>
				<view class="login_row">
					<view class="label">手机号码:</view>
					<view class="form_input">
						<input type="text" @input="changInput" id="user" :value="user.value" placeholder="输入手机号码" focus
							placeholder-style="font-size: 24rpx" />
						<view class="roles">{{user.roleText}}</view>
					</view>
				</view>
				<view class="login_row">
					<view class="label">验证码:</view>
					<view class="form_input">
						<input type="text" @input="changInput" id="password" :value="password.value" placeholder="输入验证码"
							placeholder-style="font-size: 24rpx" />
						<view class="roles">{{password.roleText}}</view>
						<button :disabled="isDisable" @click="sendAuth">
							{{isDisable ? timer : "获取验证码"}}
						</button>
					</view>
				</view>
			</block>
			<button class="submit" @click="login">登录</button>
		</view>
	</view>
</template>

<script>
	import request from '../../request/index.js'
	import {
		showToast
	} from '../../utils/utils.js'
	var appInst = getApp();
	import {mapMutations} from 'vuex'

	export default {
		data() {
			return {
				// 登录类型
				type: 'id',
				// 账号
				user: {
					value: '',
					roleText: '',
					isLegal: false
				},
				// 密码
				password: {
					value: "",
					roleText: "",
					isLegal: false
				},
				isDisable: false,
				timer: ''
			};
		},
		methods: {
			...mapMutations(['saveUserInfo']),
			// 切换登录类型 // 暂不支持 没找到验证码 方式获取用户信息的api
			handleLoginType(e) {
				const {
					id
				} = e.target
				if (id === 'phone') {
					showToast({
						title: '暂不支持验证码登录'
					})
				}
				if (id) {
					this.type = id
					this.user = {
						value: '',
						roleText: ''
					}
					this.password = {
						value: "",
						roleText: ""
					}
				}
			},
			//表单输入
			changInput(e) {
				const {
					id
				} = e.target
				if (id === 'phone') {
					showToast({
						title: '暂不支持！请使用账号登录'
					})
				}
				const {
					value
				} = e.detail
				this[id] = {
					value,
					isLegal: false
				}

				// 简单处理表单验证
				const type = this.type
				// 账号密码登入
				if (type == 'id') {
					// 账号验证
					if (id == 'user') {
						if (!value.trim()) {
							this.user = {
								value,
								roleText: "请输入用户名",
								isLegal: false
							}

						} else {
							this.user = {
								value,
								roleText: '',
								isLegal: true
							}
						}
					}
					// 密码验证
					if (id == "password" && value.trim()) {
						if (value.trim().length < 6) {
							this.password = {
								value,
								roleText: "密码最少6位",
								isLegal: false
							}
						} else {
							this.password = {
								value,
								roleText: '',
								isLegal: true
							}
						}
					}
				}
				// 手机号登入
				if (type == 'phone') {
					// 账号验证
					if (id == 'user' && value) {
						if (!(/^1[3|5|7|8][0-9]\d{8}$/.test(value))) {
							this.user = {
								value,
								roleText: '手机号码不正确！',
								isLegal: false
							}
						} else {
							this.user = {
								value,
								roleText: '',
								isLegal: true
							}
						}
					}
					// 验证码验证
					if (id == "password" && value.trim()) {

						if (!(/^\d{4}$/.test(value))) {
							this.password = {
								value,
								roleText: '验证码不正确！',
								isLegal: false
							}
						} else {
							this.password = {
								value,
								roleText: '',
								isLegal: true
							}
						}
					}

				}
			},
			// 发送验证码
			async sendAuth() {
				const {
					type,
					user
				} = this
				// 如果不是手机登入模式 支付返回
				if (type !== 'phone') {
					return
				}
				if (!user.value.trim()) {

					this.user = {
						value: '',
						roleText: '请输入手机号码！',
						isLegal: false
					}
				}
				// 验证值合法性
				if (user.isLegal) {
					// 发送后台请求
					const res = await request({
						url: '/captcha/sent',
						data: {
							phone: user.value
						}
					})
					if (res.statusCode === 200) {
						// 成功后发送提示
						showToast({
							title: '验证码发送成功！'
						})
						// 设置倒计时
						this.countdown()
					}
				}
			},
			// 验证码倒计时
			countdown() {
				this.intervalId && clearInterval(this.intervalId)
				let index = 60
				this.intervalId = setInterval(() => {
					if (index <= 0) {
						clearInterval(this.intervalId)
						return
					}
					this.timer = ndex,
						this.isDisable = true
					index--
				}, 1000);
			},
			// 登入业务
			async login() {
				const {
					user,
					password,
					type
				} = this
				// 表单验证不成功 直接返回
				if (!user.isLegal || !password.isLegal) {
					return
				}
				let result = null
				// 账号密码登录
				if (type == 'id') {
					let loginType = 'phone'
					if (/@/.test(user.value)) {
						loginType = 'email'
					}
					const url = '/login' + (loginType == 'phone' ? '/cellphone' : '')

					result = await request({
						url,
						data: {
							[loginType]: user.value,
							password: password.value
						}
					})
				} else {
					// 手机验证码登录
					result = await request({
						url: '/captcha/verify',
						data: {
							phone: user.value,
							captcha: password.value
						}
					})

				}
				// 处理登录结果
				const {
					code
				} = result.data
				// 根据响应码提示响应状态
				switch (code) {
					case 400:
						showToast({
							title: '手机号码错误！'
						})
						break;

					case 502:
						showToast({
							title: '账号/密码错误！'
						})
						break;

					case 200:
						showToast({
							title: '登录成功！'
						})
						break;
				}
				if (code === 200) {
					// 清除获取验证码按钮倒计时
					this.intervalId && clearInterval(this.intervalId)
					// 保存用户信息到缓存
					uni.setStorageSync('userInfo', result.data.profile);
					uni.setStorageSync('token', result.data.token);
					uni.setStorageSync("Cookie", result.data.cookie);
					// 保存到vuex
					this.saveUserInfo({userInfo:result.data.profile})
					if(document){
						document.cookie = result.data.cookie
					}
						
					uni.navigateBack({
						delta: 1
					});
				}
			}
		},
		beforeDestroy() {
			this.intervalId && clearInterval(this.intervalId)
		}
	}
</script>

<style lang="less">
	.login_container {
		padding: 30rpx;

		.login_title {
			margin: 50rpx 0;
			font-weight: 400;
			color: rgba(38, 38, 38, 1);
			line-height: 60rpx;

			view:last-child {
				width: 100%;
				height: 50rpx;
				font-size: 20rpx;
				font-weight: 300;
			}
		}

		.login_tab {
			padding: 30rpx 0;
			display: flex;
			justify-content: center;

			// 歌单 tab栏
			.tab_item {
				position: relative;
				width: 100%;
				text-align: center;

				&:first-child::after {
					content: '';
					position: absolute;
					right: 0;
					top: 50%;

					width: 1px;
					height: 50%;
					background-color: #919191;
					transform: translateY(-50%) scaleX(0.5);

				}

				text {
					position: relative;
					z-index: 1;
				}

				&.active text::before {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					z-index: -1;
					width: 100%;
					height: 12rpx;
					background: linear-gradient(to right, #f64649, #ff6063);
					border-radius: 12rpx;
					transform: scaleX(1.1);
				}
			}
		}

		// 登录表单
		.login_form {
			margin-top: 50rpx;

			.login_row {
				margin-top: 50rpx;
				display: flex;
				align-items: center;
				color: rgba(38, 38, 38, 1);
				position: relative;

				.label {
					flex: 1;
					font-size: 28rpx;
					padding-right: 30rpx;
					text-align: right;
				}

				.form_input {
					position: relative;
					flex: 3;
					display: flex;
					align-items: flex-end;

					input {
						width: 100%;
						padding: 10rpx;
						border-bottom: 1px solid rgb(187, 187, 187);
					}

					.roles {
						position: absolute;
						left: 0;
						bottom: -60%;
						color: red;
						font-size: 28rpx;
						font-weight: 300;
					}

					button {
						font-size: 20rpx;
						font-weight: 300;
						padding: 0 10rpx;
						width: 150rpx;
						height: 60rpx;
						line-height: 60rpx;
						margin-left: 30rpx;
					}
				}

			}

			.submit {
				margin-top: 100rpx;
				width: 100%;
				color: #fff;
				background-color: var(--themeColor);
				border-radius: 60rpx;
			}
		}
	}
</style>
