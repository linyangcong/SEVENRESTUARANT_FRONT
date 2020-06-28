<template>
	<scroll-view :refresher-triggered="refreshflag" refresher-enabled="true" 
	@refresherrefresh="refreshData" @refresherpulling="refreshPulling" refresher-default-style="white" 
	@refresherrestore="refreshRestore" scroll-y="true" class="container">
		<swiper  v-if="userInformation.role=='01'" autoplay="true" indicator-dots="true" class="swiper_contain">
			<swiper-item v-for="(item,index) in detail_lists" :key="index">
					<image :src="config.rescourceServer+item.urlImg" class="swiper_image" @click.stop="go_detail(item)"></image> 
			</swiper-item>
		</swiper>
		<view  v-show="userInformation.role=='01'">
			<view @click.stop="goShopping(item)" v-for="(item,index) in detail_lists" :key="index" style="display: flex;flex-direction: row;,align-items: flex-start;border-bottom: 1px solid #CCCCCC;margin: 10rpx;padding: 20rpx 0rpx;">
				<image  :src="config.rescourceServer+item.urlImg" style="width: 160rpx;height: 180rpx;flex: 1;"></image>
				<view style="margin-left: 20rpx;flex: 2;font-size: 20rpx;">
					<view style="font-size: 30rpx;line-height: 40rpx;color: #333333;"  class="businessItem">店铺名称：{{item.business_name}}</view>
					<view  class="businessItem">地址：{{item.address}}</view>
					<view  class="businessItem">
					<text>联系电话：</text>
					<text style="color: #6688aa">{{item.phoneNo}}</text>
					</view>
					<view  class="businessItem">
						<text >{{item.shopdel|getdelType}}</text>
						<text style="color: red;margin-left: 10rpx;">￥{{item.delFee}}</text>
					</view>
					<view  class="list_item_title businessItem " >
						<view>
							<text>起送：</text>
							<text style="color: red;">￥{{item.shopstartfee}}</text>
						</view>
						<view>
							{{item.lengKM|getlength}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 分类 -->
		<view v-show="userInformation.role=='02'" v-for="(item,index) in detail_lists" :key="index">
				<view class="detail_lists_title">
					<text>{{item.type_name}}</text>
					<!-- <text v-show="item.more!==''" @click="go_detail(item)" style="text-decoration: underline;color: #007AFF;">更多</text> -->
				</view>
				<scroll-view scroll-x="true" class="list_item" >
					<view @click.stop="go_detail(it,item.onlyIndex)" class="list_block" v-for="(it,i) in item.result_list_arr" :key="i">
						<image class="detail_lists_image" :src="config.rescourceServer+it.menu_img"></image>
						<view class="list_item_title">
							<text class="list_item_font">{{it.name}}</text>
							<!-- <text class="dis_style">{{it.discounted===''?'':it.discounted+'折'}}</text> -->
						</view>
						<view>
							<text class="dis_style">￥{{it.price_type.s=='-1'?(it.price_type.m=='-1'?it.price_type.l:it.price_type.m):it.price_type.s}}</text>
							<text style="font-size: 20rpx;color: #ccc;text-decoration: line-through;">￥{{it.price_type.old_s=='-1'?(it.price_type.old_m=='-1'?it.price_type.old_l:it.price_type.old_m):it.price_type.old_s}}</text>
						</view>
						<view class="detail_dec">
							{{it.decorations}}
						</view>
					</view>
				</scroll-view>
			<view v-show="item.result_list_arr===undefined" style="text-align: center;font-size: 26rpx;color: #CCCCCC;line-height: 60rpx;">暂无未发布该食品类型，敬请期待！</view>
		</view>
		
		
		
		
		<view @click="hidden_modal" v-show="onload_modal" class="onload_modal">
			<image @click.stop="cellect_dis" class="onload_modal_img" :src="discounted_today.img"></image>
		</view>
	</scroll-view>
</template>

<script>
	import config from '../../static/config.js'
	export default {
		name:'scroll_main',
		data() {
			return {
				distanceforyou:'',
				userInformation:{},
				refreshflag:false,
				config:config,
				onload_modal:false,
				discounted_today:{
					img:'../../static/imgs/swiper/hygz_01.jpg'
				},
				scroll_dir:true,
				swiperItem_detail:[
					{name:'洪阳果汁',index:'1',urlImg:'../../static/imgs/swiper/hygz_01.jpg',path_url:'',decoration:'美味忘不掉，今天到店享受八折优惠',discounted:'8.8'},
					{name:'捞面',index:'2',urlImg:'../../static/imgs/swiper/lm_01.jpg',path_url:'',decoration:'',discounted:''},
				],
				detail_lists:[],
				business_detail_lists:[]
			}
		},
		methods: {
			goShopping(item){
				
				this.$store.dispatch('setbusiness',item)
				uni.navigateTo({
					url:'select_main/select_main'
				})
			},
			go_detail(item,index){
				uni.navigateTo({
					url:'./select_main/select_main?type_index='+index+'&index='+item.onlyIndex
				})
			},
			hidden_modal(){
				this.onload_modal=!this.onload_modal
			},
			cellect_dis(){
				this.onload_modal=false
				uni.navigateTo({
					url:'activities/activities'
				})
			},
			refreshPulling(e){
				this.refreshflag=true
				
			},
			refreshData(){
				console.log(this.$store.state.userInformation.businessId)
				if(this.$store.state.userInformation.role=='01'){
					uni.request({
						method:'GET',
						url:config.server+'/getBusiness',
						success: (res) => {
							this.refreshRestore()
							// this.detail_lists=res.data.businessLists
							uni.getLocation({
								success: (ress) => {
									this.detail_lists=[]
									res.data.businessLists.map(item=>{
										let lat=item.location.split(',')[0],long=item.location.split(',')[1]
										// console.log(lat,long)
										let lengKM=this.GetDistance(ress.latitude,ress.longitude,lat,long)
										this.detail_lists.push({...item,lengKM})
									})
									
								}
							})
							console.log(this.detail_lists)
						}
					})
				}else if(this.$store.state.userInformation.role=='02'){
					uni.request({
						method:'GET',
						url:config.server+'/getProduct?businessId='+this.$store.state.userInformation.businessId,
						success: (res) => {
							
							this.refreshRestore()
							this.detail_lists=res.data.result_type
							this.$store.dispatch('setBusiness',res.data.business)
							
						}
					})
				}else{
					
				}
				this.refreshRestore()
			
			},
			Rad(d){
				return d * Math.PI / 180.0;
			},
			GetDistance(lat1,lng1,lat2,lng2){
			 
			        var radLat1 = this.Rad(lat1);
			        var radLat2 = this.Rad(lat2);
			        var a = radLat1 - radLat2;
			        var  b = this.Rad(lng1) -this.Rad(lng2);
			        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
			        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
			        s = s *6378.137 ;// EARTH_RADIUS;
			        s = Math.round(s * 10000) / 10000; //输出为公里
			        //s=s.toFixed(4);
			        return s;
			    },
			refreshRestore(){
				this.refreshflag=false
			},
		},
		mounted() {
			this.userInformation=this.$store.state.userInformation
			this.refreshData()
		},
		watch:{
			"$store.state.userInformation":function(val,oval){
				this.userInformation=this.$store.state.userInformation
				this.refreshData()
			}
		},
		filters:{
			getdelType(val){
				if(val=='00')return '配送类型:店铺配送'
				if(val=='01')return '配送类型:顺丰配送'
				if(val=='02')return '配送类型:蜂鸟专送'
			},
			getlength(val){
				if(val!=undefined)return '距您'+val+'km'
				else if(val==undefined) return '定位失败'
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 2vw;
		width: 96vw;
		height: 100vh;
	/* 	width: 100vw;
		overflow-x: hidden; */
	}
	.swiper_contain{
		width: 100%;
		height: 30vh;
	}
	.swiper_image{
		height: 100%;
		width: 100%;
	}
	/* list样式 */
	
	.detail_lists_title{
		font-size: 36rpx;
		padding: 20rpx;
		color: #333;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
		border-bottom: 1px solid #ccc;
		/* width: 90vw; */
	}
	.list_item{
	white-space: nowrap;
	overflow-x:hidden;
	width: 100%;
	}
	.list_block{
		display: inline-block;
		font-size: 32rpx;
		margin-right: 20rpx;
		width:30vw;
	}
	.detail_lists_image{
		height: 20vw;
		width: 100%;
	}
	.detail_dec{
		font-size: 20rpx;
		color: #888;
		width: 30vw;
		text-overflow: ellipsis;
		white-space:nowrap;
		overflow-x: hidden;
		/* word-wrap:break-word; */
	}
	.list_item_title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.list_item_font{
		/* flex: 5; */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow-x: hidden;
	}
	.dis_style{
		/* flex: 1; */
		font-size: 28rpx;
		color: #ff0000;
		/* margin-right: 6rpx; */
	}
	.onload_modal{
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100vw;
		height: 100vh;
		background-color: rgba(60,60,60,0.6);
		z-index: 1000;
	}
	.onload_modal_img{
		position: fixed;
		width: 80vw;
		height: 60vh;
		top: 15vh;
		left: 10vw;
		z-index: 2000;
	}
	.businessItem{
		line-height:36rpx;
		overflow-x: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 60vw;
		color: #666
	}
	.shoptip{
			font-size: 18rpx;
			color: #888;
		/* 	background-color: #8af;
			padding: 10rpx;
			border-radius: 10rpx; */
			margin-right: 10rpx;
	}
</style>
