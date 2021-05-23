<template>
	<view class="card_container">
		<view class="card_inner">
			<view class="card_head">
				<slot name="title"></slot>
			</view>
			<view class="card-body">
				<slot name="body"></slot>
			</view>
			<view class="card_foot" >
				<slot name="foot"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	// import SongList from '../../../components/SongList/song-list.vue'

	export default {

	}
</script>

<style lang="less">
	.card_container {
		padding: 15rpx 20rpx;

		.card_inner {
			padding: 20rpx;
			background-color: #FFFFFF;
			border-radius: 30rpx;
			box-shadow: 0 0 20rpx rgba(0,0,0,0.03);
		}
		
		.card_head {
			position: relative;
			padding: 20rpx;
			padding-top: 0;
			font-size: 14px;
			margin-bottom: 10rpx;
			
			h2,h3 {
				font-size: 15px;
				color: #3c3c3c;
			}
			&::after{
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: #dedede;
				height: 1rpx;
				transform: scaleY(0.5);
			}
		}
		
		
		.card_foot {
			position: relative;
			display: flex;
			align-items: center;
			padding-top: 20rpx;
			justify-content: center;
			font-size: 26rpx;
			color: #919191;
			
			h2,h3 {
				font-size: 15px;
				color: #3c3c3c;
			}
			&::after{
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				background-color: #dedede;
				height: 1rpx;
				transform: scaleY(0.5);
			}
		}
	}
</style>
