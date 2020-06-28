<template>
	<view>
		<view style="padding: 20rpx; font-size: 26rpx;">
			<text>切换收货地址并查看订单：</text>
			<text style="color: #007AFF;text-decoration: underline;font-size: 30rpx;" @click.stop="goselectUser">{{userInformation.def_address.userName==undefined?'未选择收货地址':userInformation.def_address.userName}}</text>
		</view>
	<scroll-view :refresher-triggered="refreshflag" refresher-enabled="true" 
	@refresherrefresh="refreshData" refresher-default-style="white" 
	@refresherrestore="refreshRestore"
	scroll-y="true"  style="background-color: #f6f6f6;height: 80vh;">
			<view v-if="userInformation.role=='01'" @click.stop="goDetail(item)" v-for="(item ,index) in orderLists" :key="item.onlyIndex" style="margin:20rpx;padding: 20rpx;background-color: #FFFFFF;border-radius: 10rpx;" >
				<view class="orderItem" >
					<image class="orderItem_img" :src="config.rescourceServer+item.menuItem[0].menu_img"></image>
					<view class="orderItem_content ">
						<view  style="font-size: 32rpx;">{{item.business[0].business_name}}</view>
						<view class="orderItem_content_last">{{item.createTime}}</view>
					</view>
					<view class="orderItem_end" style="font-size: 26rpx;color: #007AFF;">{{item.status|getStatus}}</view>
				</view>
				<view class="orderItem">
					<view style="width: 120rpx;flex: 1;"> </view>
					<view class="orderItem_content overflowHidden" style="font-size: 24rpx;color: #888;">
						<text>{{item.menuItem[0].name}}</text>
						<text>({{item.size|getSize}})</text>
						<text style="margin-left: 10rpx;">x{{item.num}}</text>
					</view>
					<view class="orderItem_end " style="color: #FF0000;font-weight: 600;font-size: 26rpx;">
						<text>￥{{item.price*item.num}}</text>
					</view>
				</view>
				
					
					<view @click.stop=""  style="display: flex;flex-direction: row;justify-content: flex-end;align-items: center;">
						<view><button @click.stop="goChatToMe(item)" plain="true" class="order_btn" >订单问题</button></view>
						<view><button @click.stop="goPayment" plain="true" class="order_btn"  v-if="item.status==1||item.status==3">去支付</button></view>
						<view><button @click.stop="goRefund" plain="true" class="order_btn"  v-if="item.status==2">申请退款</button></view>
						<view><button @click.stop="goconfirm(item)" plain="true" class="order_btn"  v-if="item.status==2">已收货</button></view>
						<view><button @click.stop="goDetail(item)" plain="true" class="order_btn" v-if="item.status==4||item.status==5">再来一单</button></view>
						<view><button @click.stop="goEvaluate(item)" plain="true" class="order_btn"  v-if="item.status==4">评价</button></view>
					</view>
				
			</view>
			<view v-if="userInformation.role=='02'" style="font-size: 50rpx;color: #AAAAAA;text-align: center;margin: 20vh 0rpx;">
				商家没权限查看
			</view>
	</scroll-view>
	</view>
</template>

<script>
	import config from '../../static/config.js'
	export default {
		data() {
			return {
				userInformation:{
					def_address:{}
				},
				refreshflag:false,
				config:config,
				orderLists:[
				]
			}
		},
		methods: {
			goselectUser(){
				uni.navigateTo({
					url:'../index/selectAddress/selectAddress'
				})
			},
			// 确认已收货
			goconfirm(item){
				uni.request({
					url:config.server+'/confirmOrder?Id='+item.Id+'&user=T',
					success: (res) => {
						if(res.statusCode==200){
							this.refreshData()
						}
					},fail: (err) => {
						uni.showToast({
							title:'请检查网络',
							icon:'none'
						})
					}
				})
			},
			// 评价
			goEvaluate(item){
				// uni.showToast({
				// 	title:'评价暂未开通',
				// 	icon:'none'
				// })
				uni.navigateTo({
					url:'comment/comment?addcomment=t&&orderId='+item.orderId
				})
			},
			// 订单问题
			goChatToMe(){
				uni.navigateTo({
					url:'order_Problem/order_Problem'
				})
			},
			// 去支付
			goPayment(){
				uni.showToast({
					title:'暂不支持',
					icon:'none'
				})
			},
			goRefund(){
				uni.showToast({
					title:'暂不支持',
					icon:'none'
				})
			},
			refreshRestore(e){
				this.refreshflag=false
			},
			refreshData(e){
			
				this.refreshflag=true
				this.initData()
			},
			initData(){
				
				if(this.$store.state.userInformation.role=='01'){
					uni.request({
						// 
						url:config.server+'/getOrderList?userId='+this.$store.state.userInformation.def_address.Id,
						success: (res) => {
							console.log(res.data)
							this.orderLists=res.data.orderList
							this.refreshRestore()
						},
						fail: (err) => {
							
						}
					})
				}else if(this.$store.state.userInformation.role=='02'){
					this.refreshRestore()
				}
				
			},
			goDetail(item){
				// console.log(item)
				this.$store.dispatch('setbusiness',item.business[0])
				uni.navigateTo({
					// url:'../index/select_main/select_main?index='+item.menuItem[0].onlyIndex+"&type_index=t"+item.menuItem[0].fk_list
					url:'../index/seeMap/seeMap?orderId='+item.orderId+'&index='+item.menuItem[0].onlyIndex+"&type_index=t"+item.menuItem[0].fk_list
				})
			}
		},
		filters:{
			getSize(size){
				if(size=='s'){
					return '小份'
				}
				else if(size=='m'){
					return '中份'
				}else{
					return '大份'
				}
			},
			getStatus(status){
				if(status==1) return '未支付'
				if(status==2) return '已支付'
				if(status==3) return '支付失败'
				if(status==4) return '已送达'
				if(status==5) return '已退款'
				if(status==6) return '已评价'
			},
		
		},
		watch:{
			"$store.state.userInformation":function(val,oval){
				this.userInformation=val
				if(this.userInformation.Id==-1){
					uni.navigateTo({
						url:'../myDetail/login/login'
					})
				}
				this.refreshData()
			},
			"$store.state.userInformation.def_address":function(val,oval){
				this.refreshData()
			},
		},
		onShow() {
			this.userInformation=this.$store.state.userInformation
			this.refreshData()
			if(this.$store.state.userInformation.Id==-1||this.$store.state.userInformation.Id==undefined){
				uni.navigateTo({
					url:'../myDetail/login/login'
				})
			}
		}
	}
</script>

<style scoped>
.orderItem{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
}
.orderItem_img{
	flex: 1;
	width: 120rpx;
	height: 120rpx;
}
.orderItem_content{
	flex: 3;
	margin-left: 20rpx;
	line-height: 50rpx;
	
}
.orderItem_end{
	flex: 1;
	line-height: 64rpx;
}
.orderItem_content_last{
	font-size: 24rpx;
	color: #888;
}

.overflowHidden{
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	line-height: 64rpx;
}
.order_btn{
	font-size:20rpx;
	margin-right: 10rpx;
}
</style>