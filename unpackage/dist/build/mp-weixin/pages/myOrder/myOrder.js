(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myOrder/myOrder"],{"039f":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n("eab1"));function o(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{userInformation:{def_address:{}},refreshflag:!1,config:r.default,orderLists:[]}},methods:{goselectUser:function(){t.navigateTo({url:"../index/selectAddress/selectAddress"})},goconfirm:function(e){var n=this;t.request({url:r.default.server+"/confirmOrder?Id="+e.Id+"&user=T",success:function(t){200==t.statusCode&&n.refreshData()},fail:function(e){t.showToast({title:"请检查网络",icon:"none"})}})},goEvaluate:function(e){t.navigateTo({url:"comment/comment?addcomment=t&&orderId="+e.orderId})},goChatToMe:function(){t.navigateTo({url:"order_Problem/order_Problem"})},goPayment:function(){t.showToast({title:"暂不支持",icon:"none"})},goRefund:function(){t.showToast({title:"暂不支持",icon:"none"})},refreshRestore:function(t){this.refreshflag=!1},refreshData:function(t){this.refreshflag=!0,this.initData()},initData:function(){var e=this;"01"==this.$store.state.userInformation.role?t.request({url:r.default.server+"/getOrderList?userId="+this.$store.state.userInformation.def_address.Id,success:function(t){console.log(t.data),e.orderLists=t.data.orderList,e.refreshRestore()},fail:function(t){}}):"02"==this.$store.state.userInformation.role&&this.refreshRestore()},goDetail:function(e){this.$store.dispatch("setbusiness",e.business[0]),t.navigateTo({url:"../index/seeMap/seeMap?orderId="+e.orderId+"&index="+e.menuItem[0].onlyIndex+"&type_index=t"+e.menuItem[0].fk_list})}},filters:{getSize:function(t){return"s"==t?"小份":"m"==t?"中份":"大份"},getStatus:function(t){return 1==t?"未支付":2==t?"已支付":3==t?"支付失败":4==t?"已送达":5==t?"已退款":6==t?"已评价":void 0}},watch:{"$store.state.userInformation":function(e,n){this.userInformation=e,-1==this.userInformation.Id&&t.navigateTo({url:"../myDetail/login/login"}),this.refreshData()},"$store.state.userInformation.def_address":function(t,e){this.refreshData()}},onShow:function(){this.userInformation=this.$store.state.userInformation,this.refreshData(),-1!=this.$store.state.userInformation.Id&&void 0!=this.$store.state.userInformation.Id||t.navigateTo({url:"../myDetail/login/login"})}};e.default=s}).call(this,n("543d")["default"])},"0eb8":function(t,e,n){},"62d9":function(t,e,n){"use strict";var r,o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.orderLists,(function(e,n){var r=t._f("getStatus")(e.status),o=t._f("getSize")(e.size);return{$orig:t.__get_orig(e),f0:r,f1:o}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},s=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return r}))},9328:function(t,e,n){"use strict";var r=n("0eb8"),o=n.n(r);o.a},e1bd:function(t,e,n){"use strict";n.r(e);var r=n("039f"),o=n.n(r);for(var s in r)"default"!==s&&function(t){n.d(e,t,(function(){return r[t]}))}(s);e["default"]=o.a},f393:function(t,e,n){"use strict";n.r(e);var r=n("62d9"),o=n("e1bd");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("9328");var i,a=n("f0c5"),u=Object(a["a"])(o["default"],r["b"],r["c"],!1,null,"78ea1bbe",null,!1,r["a"],i);e["default"]=u.exports},f49c:function(t,e,n){"use strict";(function(t){n("3a1f");r(n("66fd"));var e=r(n("f393"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f49c","common/runtime","common/vendor"]]]);