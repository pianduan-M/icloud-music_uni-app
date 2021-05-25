<template>
	<view class="playlist_tab" id="playlist_tab">
		<view class="tab_item " @click="tabclick('created_btn')" :class="playlistType==='created'?'active':''">
			<span id="created_btn">创建歌单</span>
		</view>
		<view class="tab_item " @click="tabclick('collect_btn')" :class="playlistType==='collect'?'active':''">
			<span id="collect_btn">收藏歌单</span>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			playlistType: {
				type: String,
				default: 'created'
			}
		},
		methods: {
			tabclick(type) {
				this.$emit('tabclick', type)
			}
		}
	}
</script>

<style lang="less">
	// tab
	.playlist_tab {
		padding-top: 30rpx;
		padding-bottom: 10rpx;
		display: flex;
		justify-content: center;
		width: 100%;

		// 歌单 tab栏
		.tab_item {
			position: relative;
			width: 100%;
			text-align: center;
			font-weight: 600;
			font-size: 36rpx;

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

			span {
				position: relative;
				z-index: 1;
			}

			&.active span::before {
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
</style>
