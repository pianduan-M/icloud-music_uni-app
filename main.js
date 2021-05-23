import Vue from 'vue'
import App from './App'
import store from './vuex/index.js'


Vue.config.productionTip = false
// 全局事件过滤器 播放数量
Vue.filter('FormatPlayCount', function(num) {
	if (num >= 100000000) {
		return Math.round(num / 10000000) / 10 + '亿'
	} else if (num >= 10000) {
		return Math.round(num / 1000) / 10 + '万'
	} else {
		return num
	}
})
Vue.filter('FormatDate', function(originVal) {

	if (!originVal) return '00:00'
	const dt = new Date(originVal)
	const hh = (dt.getHours() + '').padStart(2, '0')
	const mm = (dt.getMinutes() + '').padStart(2, '0')
	const ss = (dt.getSeconds() + '').padStart(2, '0')
	return `${mm}:${ss}`
})

App.mpType = 'app'



const app = new Vue({
	store,
	...App
})
app.$mount()
