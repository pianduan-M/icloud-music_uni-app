



# icloud music uni-app项目介绍

### 基于网易云音乐ui 

##  参考项目

GitHub网易云音乐接口开源项目 [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

### 项目介绍

##### 	功能如下

	1. 首页   每日推荐 推荐歌单 排行榜 下拉
	2. 搜索  搜索历史 热搜榜  搜索联想补全 
	3. 搜索结果页 功能分组 实现综合 单曲 歌单 视频
	3. 个人中心 我喜欢的音乐 收藏的歌单 创建的歌单 tab栏联动效果
	4. 音乐播放页面 播放进度条可以手动拖动设置当前播放时间，播放模式切换（循环，随机，单曲） lrc歌词解析 歌词高亮滚动，播放列表功能
	5. 新增视频播放页面 跟短视频平台一样上下滑动刷视频
	

#### 	技术点

	1. uni-app 项目
	2. 全局音乐状态都由vuex管理 音乐功能都由vux操控 页面只负责展示歌曲信息，方便多页面控制音乐播放
	3. app 端 视频页面使用 nvue 解决因video原生组件层级导致滑动页面时 video位置乱跑
	

#### 登录页面

<img src="https://i.im5i.com/2021/05/25/C9Zd4.jpg" alt="登录" style="zoom:50%;" border="0">



#### 首页

<img src="https://i.im5i.com/2021/05/25/C9mDG.jpg" alt="首页" style="zoom:50%;" border="0">





#### 每日推荐

<img src="https://i.im5i.com/2021/05/25/C9iXW.jpg" alt="每日推荐" style="zoom:50%;" border="0">





#### 歌单页面

<img src="https://i.im5i.com/2021/05/25/C9ooR.jpg" alt="歌单" style="zoom:50%;" border="0">







#### 搜索页

<img src="https://i.im5i.com/2021/05/25/C98Sz.jpg" alt="搜索" style="zoom:50%;" border="0">



#### 搜索结果

<img src="https://i.im5i.com/2021/05/25/C9XSs.jpg" alt="搜索结果" border="0" style="zoom:50%;">



#### 个人中心

<img src="https://i.im5i.com/2021/05/25/C9nJO.jpg" alt="user" style="zoom:50%;" border="0">







#### 播放页面

<img src="https://i.im5i.com/2021/05/25/C92uQ.jpg" alt="播放页面" border="0" style="zoom:50%;" >



<img src="https://i.im5i.com/2021/05/25/C9Ywy.jpg" alt="播放列表" style="zoom:50%;" border="0">







#### 歌词

<img src="https://i.im5i.com/2021/05/25/C99x3.jpg" alt="歌词" style="zoom:50%;" border="0">



#### 视频页面

<img src="https://i.im5i.com/2021/05/25/C93Od.jpg" alt="视频" style="zoom:50%;" border="0">
