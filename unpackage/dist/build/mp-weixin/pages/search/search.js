(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{"0a13":function(t,e,a){"use strict";var r;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return u})),a.d(e,"a",(function(){return r}));var n=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"1c73":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(a("a34a")),n=u(a("88ac"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e,a,r,n,u,c){try{var s=t[u](c),i=s.value}catch(o){return void a(o)}s.done?e(i):Promise.resolve(i).then(r,n)}function s(t){return function(){var e=this,a=arguments;return new Promise((function(r,n){var u=t.apply(e,a);function s(t){c(u,r,n,s,i,"next",t)}function i(t){c(u,r,n,s,i,"throw",t)}s(void 0)}))}}var i={data:function(){return{defaultSearch:"",hotSearch:[],SearchValue:"",historySearch:[],suggest:[]}},onLoad:function(t){this.getSearchValue()},onShow:function(){this.historySearch=t.getStorageSync("historySearch")||[]},methods:{getSearchValue:function(){var t=this;return s(r.default.mark((function e(){var a,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,n.default)({url:"/search/default"});case 2:return a=e.sent,t.defaultSearch=a.data.data.showKeyword,e.next=6,(0,n.default)({url:"/search/hot/detail"});case 6:u=e.sent,t.hotSearch=u.data.data;case 8:case"end":return e.stop()}}),e)})))()},handleSearch:function(t){var e=this,a=t.detail.value;this.SearchValue=a,a||(this.suggest=[]),this.timeoutId&&clearTimeout(this.timeoutId),this.timeoutId=setTimeout(s(r.default.mark((function t(){var u;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,n.default)({url:"/search/suggest",data:{type:"mobile",keywords:a}});case 2:u=t.sent,e.suggest=u.data.result.allMatch;case 4:case"end":return t.stop()}}),t)}))),200)},search:function(e){var a=e.currentTarget.dataset,r=(a.type,a.value),n=this.historySearch,u=this.SearchValue;this.defaultSearch;if(u=r,u){var c=n.findIndex((function(t){return t==u}));-1!==c?(n.splice(c,1),n.unshift(u)):n.unshift(u),t.setStorageSync("historySearch",n),t.navigateTo({url:"/pages/search_result/search_result?keywords="+u})}},cleartHistory:function(e){var a=e.currentTarget.dataset.type;if("input"===a)this.SearchValue="",this.suggest=[];else{this.historySearch;t.setStorageSync("historySearch",[]),this.historySearch=[]}}}};e.default=i}).call(this,a("543d")["default"])},"1f0e":function(t,e,a){"use strict";a.r(e);var r=a("1c73"),n=a.n(r);for(var u in r)"default"!==u&&function(t){a.d(e,t,(function(){return r[t]}))}(u);e["default"]=n.a},"260d":function(t,e,a){"use strict";var r=a("6200"),n=a.n(r);n.a},6200:function(t,e,a){},"622b":function(t,e,a){"use strict";a.r(e);var r=a("0a13"),n=a("1f0e");for(var u in n)"default"!==u&&function(t){a.d(e,t,(function(){return n[t]}))}(u);a("260d");var c,s=a("f0c5"),i=Object(s["a"])(n["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],c);e["default"]=i.exports},"8e17":function(t,e,a){"use strict";(function(t){a("7636");r(a("66fd"));var e=r(a("622b"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])}},[["8e17","common/runtime","common/vendor"]]]);