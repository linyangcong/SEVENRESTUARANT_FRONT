(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/scroll_main"],{"1c26":function(t,e,n){"use strict";n.r(e);var s=n("8b53"),r=n.n(s);for(var i in s)"default"!==i&&function(t){n.d(e,t,(function(){return s[t]}))}(i);e["default"]=r.a},5549:function(t,e,n){"use strict";(function(t){n("3a1f");s(n("66fd"));var e=s(n("b975"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"8b53":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=r(n("eab1"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,s)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u={name:"scroll_main",data:function(){return{distanceforyou:"",userInformation:{},refreshflag:!1,config:s.default,onload_modal:!1,discounted_today:{img:"../../static/imgs/swiper/hygz_01.jpg"},scroll_dir:!0,swiperItem_detail:[{name:"洪阳果汁",index:"1",urlImg:"../../static/imgs/swiper/hygz_01.jpg",path_url:"",decoration:"美味忘不掉，今天到店享受八折优惠",discounted:"8.8"},{name:"捞面",index:"2",urlImg:"../../static/imgs/swiper/lm_01.jpg",path_url:"",decoration:"",discounted:""}],detail_lists:[],business_detail_lists:[]}},methods:{goShopping:function(e){this.$store.dispatch("setbusiness",e),t.navigateTo({url:"select_main/select_main"})},go_detail:function(e,n){t.navigateTo({url:"./select_main/select_main?type_index="+n+"&index="+e.onlyIndex})},hidden_modal:function(){this.onload_modal=!this.onload_modal},cellect_dis:function(){this.onload_modal=!1,t.navigateTo({url:"activities/activities"})},refreshPulling:function(t){this.refreshflag=!0},refreshData:function(){var e=this;console.log(this.$store.state.userInformation.businessId),"01"==this.$store.state.userInformation.role?t.request({method:"GET",url:s.default.server+"/getBusiness",success:function(n){e.refreshRestore(),t.getLocation({success:function(t){e.detail_lists=[],n.data.businessLists.map((function(n){var s=n.location.split(",")[0],r=n.location.split(",")[1],i=e.GetDistance(t.latitude,t.longitude,s,r);e.detail_lists.push(o({},n,{lengKM:i}))}))}}),console.log(e.detail_lists)}}):"02"==this.$store.state.userInformation.role&&t.request({method:"GET",url:s.default.server+"/getProduct?businessId="+this.$store.state.userInformation.businessId,success:function(t){e.refreshRestore(),e.detail_lists=t.data.result_type,e.$store.dispatch("setBusiness",t.data.business)}}),this.refreshRestore()},Rad:function(t){return t*Math.PI/180},GetDistance:function(t,e,n,s){var r=this.Rad(t),i=this.Rad(n),o=r-i,a=this.Rad(e)-this.Rad(s),u=2*Math.asin(Math.sqrt(Math.pow(Math.sin(o/2),2)+Math.cos(r)*Math.cos(i)*Math.pow(Math.sin(a/2),2)));return u*=6378.137,u=Math.round(1e4*u)/1e4,u},refreshRestore:function(){this.refreshflag=!1}},mounted:function(){this.userInformation=this.$store.state.userInformation,this.refreshData()},watch:{"$store.state.userInformation":function(t,e){this.userInformation=this.$store.state.userInformation,this.refreshData()}},filters:{getdelType:function(t){return"00"==t?"配送类型:店铺配送":"01"==t?"配送类型:顺丰配送":"02"==t?"配送类型:蜂鸟专送":void 0},getlength:function(t){return void 0!=t?"距您"+t+"km":void 0==t?"定位失败":void 0}}};e.default=u}).call(this,n("543d")["default"])},b27f:function(t,e,n){"use strict";var s,r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.detail_lists,(function(e,n){var s=t._f("getdelType")(e.shopdel),r=t._f("getlength")(e.lengKM);return{$orig:t.__get_orig(e),f0:s,f1:r}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},i=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return s}))},b975:function(t,e,n){"use strict";n.r(e);var s=n("b27f"),r=n("1c26");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("dd07");var o,a=n("f0c5"),u=Object(a["a"])(r["default"],s["b"],s["c"],!1,null,"6cb13824",null,!1,s["a"],o);e["default"]=u.exports},d98f:function(t,e,n){},dd07:function(t,e,n){"use strict";var s=n("d98f"),r=n.n(s);r.a}},[["5549","common/runtime","common/vendor"]]]);