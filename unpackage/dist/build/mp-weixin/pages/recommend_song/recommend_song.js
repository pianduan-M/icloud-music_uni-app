(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/recommend_song/recommend_song"],{"5d51":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"6e70":function(e,t,n){"use strict";(function(e){n("7636");r(n("66fd"));var t=r(n("a9f3"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"9d11":function(e,t,n){},a9f3:function(e,t,n){"use strict";n.r(t);var r=n("5d51"),a=n("b11e");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("b39f");var i,c=n("f0c5"),u=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=u.exports},b11e:function(e,t,n){"use strict";n.r(t);var r=n("cdb6"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},b39f:function(e,t,n){"use strict";var r=n("9d11"),a=n.n(r);a.a},cdb6:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=c(n("a34a")),a=c(n("88ac")),o=n("f210"),i=n("2f62");function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,r,a,o,i){try{var c=e[o](i),u=c.value}catch(s){return void n(s)}c.done?t(u):Promise.resolve(u).then(r,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){u(o,r,a,i,c,"next",e)}function c(e){u(o,r,a,i,c,"throw",e)}i(void 0)}))}}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m={data:function(){return{recomend:[],month:1,day:1,isError:!1}},onLoad:function(e){var t=new Date,n=t.getMonth()+1,r=t.getDate();this.day=r<10?"0"+r:r,this.month=n<10?"0"+n:n,this.getRecommendPlaylist()},methods:f(f(f({},(0,i.mapMutations)(["setPlaylist","setCurrentIndex"])),(0,i.mapActions)(["autoPlay"])),{},{getRecommendPlaylist:function(){var t=this;return s(r.default.mark((function n(){var i,c,u,s,l,f,d,m,g;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i=e.getStorageSync("recommendPlaylist")||{},!i.date){n.next=11;break}if(c=new Date(i.date),u=c.getMonth(),s=c.getDate(),l=new Date,f=l.getMonth(),d=l.getDate(),u!==f||s!==d){n.next=11;break}return t.recomend=i.recomend,n.abrupt("return");case 11:return e.showLoading({title:"加载中",mask:!0}),setTimeout((function(){e.hideLoading()}),5e3),n.next=15,(0,a.default)({url:"/recommend/songs"});case 15:if(m=n.sent,console.log(m),200===m.data.code){n.next=22;break}return(0,o.showToast)({title:"加载错误！"}),t.isError=!0,e.hideLoading(),n.abrupt("return");case 22:e.hideLoading(),g=m.data.data.dailySongs,t.recomend=g,t.isError=!1,e.setStorageSync("recommendPlaylist",{date:Date.now(),recomend:g});case 27:case"end":return n.stop()}}),n)})))()},toPlay:function(t){this.setPlaylist({playlist:this.recomend}),this.setCurrentIndex({currentIndex:t}),this.autoPlay(),e.navigateTo({url:"/pages/play_music/play_music"})},reload:function(){var e=this;this.flag||(this.flag=!0,this.getRecommendPlaylist(),setTimeout((function(){e.flag=!1}),1e3))}})};t.default=m}).call(this,n("543d")["default"])}},[["6e70","common/runtime","common/vendor"]]]);