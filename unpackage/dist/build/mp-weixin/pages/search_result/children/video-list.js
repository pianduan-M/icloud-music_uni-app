(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search_result/children/video-list"],{"0f3a":function(t,e,a){"use strict";var n=a("a2a7"),i=a.n(n);i.a},"1a10":function(t,e,a){"use strict";a.r(e);var n=a("a49a"),i=a("792e");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("0f3a");var r,u=a("f0c5"),c=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},"233a":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={props:{video:{type:Object,default:{}},hightext:{type:String,default:""}},methods:{FormatHighText:function(t){if(!this.hightext)return t;var e=new RegExp(this.hightext,"i");return'<span style="overflow: hidden;">'.concat(t.replace(e,"<span style='color:#55aaff'>".concat(this.hightext,"</span>")),"</span>")},toPlay:function(){t.navigateTo({url:"/pages/play_video/play_video?id="+this.video.vid})}}};e.default=a}).call(this,a("543d")["default"])},"792e":function(t,e,a){"use strict";a.r(e);var n=a("233a"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},a2a7:function(t,e,a){},a49a:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=(t._self._c,t.FormatHighText(t.video.title)),n=t._f("FormatDate")(t.video.durationms),i=t._f("FormatPlayCount")(t.video.playTime);t.$mp.data=Object.assign({},{$root:{m0:a,f0:n,f1:i}})},o=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/search_result/children/video-list-create-component',
    {
        'pages/search_result/children/video-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1a10"))
        })
    },
    [['pages/search_result/children/video-list-create-component']]
]);
