(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/selectAddress/selectAddress"],{"05e0":function(t,e,s){"use strict";var o,n=function(){var t=this,e=t.$createElement;t._self._c},i=[];s.d(e,"b",(function(){return n})),s.d(e,"c",(function(){return i})),s.d(e,"a",(function(){return o}))},"51a8":function(t,e,s){"use strict";var o=s("f8b9"),n=s.n(o);n.a},"81e3":function(t,e,s){"use strict";s.r(e);var o=s("9f2f"),n=s.n(o);for(var i in o)"default"!==i&&function(t){s.d(e,t,(function(){return o[t]}))}(i);e["default"]=n.a},9257:function(t,e,s){"use strict";s.r(e);var o=s("05e0"),n=s("81e3");for(var i in n)"default"!==i&&function(t){s.d(e,t,(function(){return n[t]}))}(i);s("51a8");var a,d=s("f0c5"),r=Object(d["a"])(n["default"],o["b"],o["c"],!1,null,"e348ed82",null,!1,o["a"],a);e["default"]=r.exports},9486:function(t,e,s){"use strict";(function(t){s("3a1f");o(s("66fd"));var e=o(s("9257"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("543d")["createPage"])},"9f2f":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(s("eab1"));function n(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{editflag:!1,showBtn:"",config:o.default,userlist:[],add_modal:!1,clickId:"",newaddress:{name:"",mobile:"",address:"",location:{lat:"",long:""}},marker:[{latitude:"",longitude:""}],touchXY:[]}},methods:{DeleteUserAddress:function(e){var s=this;t.showModal({title:"温馨提示！",content:"您确认删除本条信息吗？",cancelText:"否",confirmText:"是",success:function(n){console.log(n),n.confirm&&t.request({url:o.default.server+"/delAddress",data:{Id:e.Id},method:"POST",success:function(e){200==e.statusCode?t.showToast({title:"删除成功",icon:"none"}):t.showToast({title:"删除失败",icon:"none"}),s.getUserlist()}})}}),console.log(e)},EditUserAddress:function(t){console.log(t),this.newaddress={Id:t.Id,name:t.userName,mobile:t.phoneNo,address:t.address,location:{lat:t.location.split(",")[0],long:t.location.split(",")[1]}},this.editflag=!0,this.add_modal=!0},startTouch:function(t,e){this.touchXY=[t.changedTouches[0].clientX,t.changedTouches[0].clientY]},endTouch:function(t,e){console.log(this.$refs[e]),this.touchXY[0]>=t.changedTouches[0].clientX+60?this.showBtn=e:this.touchXY[0]+60<=t.changedTouches[0].clientX&&(this.showBtn="")},selectUserItem:function(e){console.log(e),this.clickId=e.onlyId,console.log(this.$store.state.userInformation),this.$store.dispatch("setUseraddress",e),t.showToast({title:"当前用户切换为"+this.$store.state.userInformation.def_address.userName,icon:"none"})},createAddress:function(){var e=this;""!=this.newaddress.name&&""!=this.newaddress.mobile&&""!=this.newaddress.address?(this.newaddress.fk_b=this.$store.state.userInformation.Id,this.newaddress.editflag=this.editflag,t.request({url:o.default.server+"/addAddress",method:"POST",data:this.newaddress,success:function(s){200==s.statusCode&&(t.showToast({title:"提交成功",icon:"none"}),e.editflag=!1,e.closecreateAddress(),e.getUserlist()),console.log(s)},fail:function(t){}})):t.showToast({title:"联系人不能为空",icon:"none"})},getmapLoacation:function(e){void 0==e.detail.latitude?""==this.newaddress.location.lat&&t.showToast({title:"地图定位失败，请确保收货地址精确",icon:"none"}):(this.marker[0].latitude=e.detail.latitude,this.marker[0].longitude=e.detail.longitude,this.newaddress.location.lat=e.detail.latitude,this.newaddress.location.long=e.detail.longitude)},closecreateAddress:function(){this.add_modal=!this.add_modal},getUserlist:function(){var e=this;console.log(this.$store.state.userInformation),t.request({url:o.default.server+"/getUserList?userType="+this.$store.state.userInformation.role+"&userId="+this.$store.state.userInformation.Id+"&businessId="+this.$store.state.userInformation.businessId,method:"GET",success:function(t){console.log(t),e.userlist=t.data.userlist,0!==t.data.userlist.length?e.$emit("addressStatus",!0):e.$emit("addressStatus",!1)}})}},mounted:function(){var e=this;t.getLocation({success:function(t){e.marker[0].latitude=t.latitude,e.marker[0].longitude=t.longitude},fail:function(e){t.showToast({title:"该地图不支持获取定位",icon:"none"})}}),this.getUserlist()}};e.default=i}).call(this,s("543d")["default"])},f8b9:function(t,e,s){}},[["9486","common/runtime","common/vendor"]]]);