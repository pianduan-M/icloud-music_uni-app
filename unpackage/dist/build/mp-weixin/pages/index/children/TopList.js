(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/children/TopList"],{"0059":function(t,n,e){"use strict";e.r(n);var r=e("7df7"),u=e.n(r);for(var c in r)"default"!==c&&function(t){e.d(n,t,(function(){return r[t]}))}(c);n["default"]=u.a},"08d5":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return r}));var u=function(){var t=this,n=t.$createElement;t._self._c},c=[]},"0c0c":function(t,n,e){},"1c38":function(t,n,e){"use strict";var r=e("0c0c"),u=e.n(r);u.a},6525:function(t,n,e){"use strict";e.r(n);var r=e("08d5"),u=e("0059");for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);e("1c38");var a,i=e("f0c5"),o=Object(i["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);n["default"]=o.exports},"7df7":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={props:{topList:{type:Array,default:[]}},methods:{toPlay:function(t,n){console.log(t),this.$store.commit("setPlaylist",{playlist:t}),this.$store.commit("setCurrentIndex",{currentIndex:n}),this.$store.dispatch("autoPlay"),wx.navigateTo({url:"/pages/play_music/play_music"})}}};n.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/children/TopList-create-component',
    {
        'pages/index/children/TopList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6525"))
        })
    },
    [['pages/index/children/TopList-create-component']]
]);
