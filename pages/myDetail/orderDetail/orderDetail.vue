<template>
	<view>
		<!-- tab页面 -->
		<view class="orderItem" style="background-color: #007AFF;">
			<view @click.stop="seeList('1')" :class="selectedTab=='1'?'orderDetail_tab_background':''" class="orderDetail_tab_font">未支付</view>
			<view @click.stop="seeList('2')" :class="selectedTab=='2'?'orderDetail_tab_background':''" class="orderDetail_tab_font">已支付</view>
			<view @click.stop="seeList('3')" :class="selectedTab=='3'?'orderDetail_tab_background':''" class="orderDetail_tab_font">支付失败</view>
			<view @click.stop="seeList('4')" :class="selectedTab=='4'?'orderDetail_tab_background':''" class="orderDetail_tab_font">已送达</view>
			<view @click.stop="seeList('5')" :class="selectedTab=='5'?'orderDetail_tab_background':''" class="orderDetail_tab_font">已退款</view>
			<view @click.stop="seeList('6')" :class="selectedTab=='6'?'orderDetail_tab_background':''" class="orderDetail_tab_font">已评价</view>
		</view>
		<!-- 内容展示区域 -->
	<scroll-view :refresher-triggered="refreshflag" refresher-enabled="true" 
	@refresherrefresh="refreshData" refresher-default-style="white" 
	@refresherrestore="refreshRestore"
	scroll-y="true"  style="background-color: #f6f6f6;height: 100vh;">
			<view v-show="orderLists.length!==0" @click.stop="goDetail(item)" v-for="(item ,index) in orderLists" :index="item.onlyIndex" :key="item.onlyIndex" style="margin:20rpx;padding: 20rpx;background-color: #FFFFFF;border-radius: 10rpx;" >
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
					</view>
					<view class="orderItem_end " style="color: #FF0000;font-weight: 600;font-size: 26rpx;">
						<text>￥{{item.price}}</text>
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
			<view v-show="orderLists.length==0" style="text-align: center;font-size: 50rpx;color: #CCCCCC;line-height: 500rpx;">
				空空如也
			</view>
	</scroll-view>
	</view>
</template>

<script>
	import config from '../../../static/config.js'
	export default {
		data() {
			return {
				selectedTab:'1',
				refreshflag:false,
				config:config,
				orderLists:[
				],
				unpayList:[],
				paidList:[],
				payfaidList:[],
				arrivedList:[],
				recList:[],
				applList:[]
			}
		},
		methods: {
			seeList(status){
				this.selectedTab=status
				switch(status){
					case '1':this.orderLists=this.unpayList;break;
					case '2':this.orderLists=this.paidList;break;
					case '3':this.orderLists=this.payfaidList;break;
					case '4':this.orderLists=this.arrivedList;break;
					case '5':this.orderLists=this.recList;break;
					case '6':this.orderLists=this.applList;break;
					default:this.orderLists=this.unpayList;break;
				}
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
				
				if(this.$store.state.userInformation.def_address.Id==undefined){
					uni.showToast({
						title:'很奇怪，没查到内容...',
						icon:'none'
					})
					this.refreshRestore()
				}else{
					uni.request({
						url:config.server+'/getOrderList?userId=1',
						success: (res) => {
							this.unpayList=[]
							this.paidList=[]
							this.payfaidList=[]
							this.arrivedList=[]
							this.recList=[]
							this.applList=[]
							this.orderLists=res.data.orderList
							this.orderLists.map(item=>{
								if(item.status=='1'){
									this.unpayList.push(item)
								}else if(item.status=='2'){
									this.paidList.push(item)
								}else if(item.status=='3'){
									this.payfaidList.push(item)
								}else if(item.status=='4'){
									this.arrivedList.push(item)
								}else if(item.status=='5'){
									this.recList.push(item)
								}else if(item.status=='6'){
									this.applList.push(item)
								}
							})
							this.orderLists=this.unpayList
							this.refreshRestore()
						},
						fail: (err) => {
							
						}
					})
				}
				
			},
			goDetail(item){
				
				uni.navigateTo({
					url:'../index/select_main/select_main?index='+item.menuItem[0].onlyIndex+"&type_index=t"+item.menuItem[0].fk_list
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
		
		mounted() {
			this.refreshData()
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

.orderDetail_tab_font{
	flex: 1;
	font-size: 26rpx;
	padding: 20rpx 10rpx;
	color: #FFFFFF;
	text-align: center;
	
}
.orderDetail_tab_background{
	background-color: #FFFFFF;
	color: #007AFF;
}
</style>