	<scroll-view class="play_music">
		<!-- <NavBar background="rgba(0,0,0,0)" style="position: fixed">
	    <view slot="left">
	      <navigator hover-class="none" open-type="navigateBack" style="margin-left:30rpx; padding:20rpx" bindtap="goBack">
	        <text class="iconfont icon-back"></text>
	      </navigator>
	    </view>
	    <view slot="center">
	      <view class="nav_song_info">
	        <view class="nav_song_name">{{currentSong.name}}</view>
	        <view class="nav_singer">{{currentSong.ar[0].name}}</view>
	      </view>
	    </view>
	  </NavBar> -->
		<view class="song_bg ">
			<image :class="{mask_opacity:bg_list.length>1&& index === 1}" v-for="(item,index) in bg_list" :src="item"
				mode="scaleToFill" :data-index="index" :key="index"></image>
			<view class="bg_mask"></view>
		</view>
		<!-- 封面 -->
		<view class="play_cover_wrap" :style="{display:isShowCover?'':'none'}" @touchstart="handleSwichtCoverLrc"
			@touchend="handleSwichtCoverLrc">
			<view class="song-disc">
				<!-- 磁头 -->
				<view class="needle " :class="{song_disc_rotate:!isPlay}">
					<image class="img" src="../../static/images/needle.png" mode="widthFix"></image>
				</view>
				<view class="song-turn" :class="{cover_rotate: isPlay}">
					<view class="song-rollwrap">
						<view class="song-img a-circling z-pause">
							<image class="u-img __web-inspector-hide-shortcut__" mode="widthFix"
								:src="currentSong.al.picUrl" />
						</view>
					</view>
					<view class="song-lgour">
						<view class="song-light a-circling z-pause __web-inspector-hide-shortcut__"></view>
					</view>
				</view>
				<span class="song-plybtn"></span>
			</view>
		</view>
		<!-- 歌词 -->
		<view :style="{display:!isShowCover?'':'none'}" class="lyrics_container" @touchstart="handleSwichtCoverLrc"
			id="lyrics_container" @touchend="handleSwichtCoverLrc">
			<scroll-view class="scrollLyrics" enhanced scroll-y :show-scrollbar="false" scroll-with-animation
				v-if="lyrics.length>0">
				<view v-for="(item,index) in lyrics" :key="index" class="lrc_item" :class="{current: lrc_id === index}"
					:id="'lrc_'+index">
					<view class="lrc">{{item.lyric}}</view>
				</view>
			</scroll-view>
			<view class="no_lyrics" v-if="!lyrics.length">纯音乐没有歌词</view>
		</view>
		<!-- 底部控制栏 -->
		<view class="play_tools">
			<!-- 顶部功能按钮 -->
			<view class="tools_head">
				<text class="iconfont icon-aixin"></text>
				<text class="iconfont icon-xiazai"></text>
				<text class="iconfont icon-changge"></text>
				<text class="iconfont icon-comment-"></text>
				<text class="iconfont icon-diandiandianshu"></text>
			</view>
			<!-- 中间进度条 -->
			<view class="tools_progress_wrap">
				<!-- 当前播放事件 -->
				<view class="current_time time">{{currentTime | FormatDate}}</view>
				<!-- 播放进度条 -->
				<view class="progress_container" @touchstart="handleTouchProgress" @touchmove="handleTouchProgress"
					@touchend="handleTouchProgress">
					<view class="progress_wrap">
						<view class="progress_inner" :style="{width:progress?progress:0 + '%'}"></view>
						<view class="progress_btn" :class="{touch_btn:isMove}"
							:style="{left: 'calc('+progress+'% - 16rpx )'}"></view>
					</view>
				</view>
				<!-- 总时间 -->
				<view class="total_time time">{{currentSong.dt/1000 | FormatDate}}</view>
			</view>
			<!-- 底部媒体按钮 -->
			<view class="tools_play_btn">
				<view class="other_btn_wrap">
					<view class="play_mode">
						<!-- <text class="iconfont icon-xunhuan"></text> -->
						<text class="iconfont " :class="'icon-'+playMode" @click="handlePlayMode"></text>
						<!-- <text class="iconfont icon-suiji"></text> -->
					</view>
					<view class="play_menu" @click="showSongList">
						<text class="iconfont icon-bofangliebiao"></text>
					</view>
				</view>
				<view class="play_btn_wrap">
					<text class="pre_btn" id="pre" bindtap="handleSwitchBtnClick">
						<text class="iconfont icon-shangyishou"></text>
					</text>
					<text class="paly_btn" bindtap="swicthPlay">
						<text class="iconfont" :class="'icon-'+ isPlay?'zanting':'bofang1'"></text>
					</text>
					<view class="next_btn" id="next" @click="handleSwitchBtnClick">
						<text class="iconfont icon-shangyishou"></text>
					</view>
				</view>
			</view>
		</view>
		<SongList bind:handlePlay="playListSong" :playlist="playlist" :currentIndex="currentIndex"
			@deleteSong="deleteSong" @oncancel="showSongList" :style="{display:isShowSongList?'':'none'}">
		</SongList>
	</scroll-view>