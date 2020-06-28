<template>
	<scroll-view style="background-color: #EEEEEE;margin-bottom: 100rpx;">
		<!-- <view>
			<map @click="changScale" :scale="mapScale" id="mapContext" :longitude="mapObj.longitude" :latitude="mapObj.latitude" :enable-traffic="true" style="width: 100%;height: 400rpx;"
			 :markers="substatus?[]:markers" :include-points="includePoints"></map>
		</view> -->


		<view class="panel_module" >
			<view class="map-contain title">
				<view>{{business.business_name}}</view>
				<view @click.stop="godoorder" style="font-size: 30rpx;font-weight: 400;color:#007AFF;">再来一单</view>
			</view>

				<view class="map-contain "  v-for="(item,index) in shopping" :key="index" style="margin: 10rpx 0rpx;">
					<view style="flex: 1;">
						<image style="width: 120rpx;height: 120rpx;" :src="config.rescourceServer+item.detail.menu_img"></image>
					</view>
					<view v-if="!orderFlag" class="map-contain orderlist" style="flex: 3;align-items: flex-end;">
						<view >
							<view >{{item.name}}({{item.size|getSize}})</view>
							<view>
								<text style="color: #FF0000;">￥{{item.price[item.size]}}</text>
								<text style="font-size: 20rpx;text-decoration: line-through;margin-left: 10rpx;">￥{{item.price['old_'+item.size]}}</text>
							</view>
						</view>
						<view>x{{item.num}}</view>
						<view >￥{{item.count}}</view>
					</view>
					<view v-else class="map-contain orderlist" style="flex: 3;align-items: flex-end;">
						<view >
							<view >{{item.detail.name}}({{item.size|getSize}})</view>
							<view>
								<text style="color: #FF0000;">￥{{item.price}}</text>
								<!-- <text style="font-size: 20rpx;text-decoration: line-through;margin-left: 10rpx;">￥{{item.price['old_'+item.size]}}</text> -->
							</view>
						</view>
						<view>x{{item.num}}</view>
						<view >￥{{item.num*item.price|getprices}}</view>
					</view>
				</view>
				<view class="map-contain">
					<view style="flex: 4;"></view>
					<view style="flex: 6;text-align: right;font-size: 26rpx;">配送费：￥{{business.delFee}}</view>
				</view>
			<view class="map-contain title" >
				<view @click.stop="callPhone(business.phoneNo)" style="flex:4;color: #007AFF;font-size:30rpx;display: flex;align-items: center;flex-direction: row;">
					<image src="../../../static/imgs/phone.png" style="width:40rpx;height: 40rpx;margin-left: 20rpx;"></image>
					<text>联系店家</text>
				</view>
				<view style="flex: 6;text-align: right;">
					<text>实付：</text><text style="color: #FF0000;">￥{{ordersum}}</text>
					<text v-if="!orderFlag" style="text-decoration: line-through;color: #AAAAAA;font-size: 26rpx;margin-left: 10rpx;">￥{{old_ordersums}}</text>
				</view>
			</view>
		</view>


		<view class="panel_module" >
			
				<view class="title">配送信息</view>
				<!-- weixin -->
				<view class="map-contain ">
					<text class="detail-title">商家微信</text>
					<view class="detail-font" style="text-align: left;display: flex;align-items: center;" @click.stop="seeWxAccount">
						<image src="../../../static/imgs/微信.png" style="width: 50rpx;height: 50rpx;"></image>
						<text style="margin-left: 10rpx;color: #007AFF;text-decoration: underline;" @click.stop="addtoPanel(weixin,'wx')">{{weixin}}</text>
					</view>
				</view>
				<view class="map-contain ">
					<text class="detail-title">送达时间</text>
					<text class="detail-font">尽快送达</text>
				</view>
				<view class="map-contain" style="align-items: flex-start;">
					<text class="detail-title">收货地址</text>
					<view class="detail-font" >
						<view class="map-contain">
							<text>{{userInformation.def_address.address|getAddress}}</text>
							<text v-if="!orderFlag"  style="color: #007AFF;" @click.stop="goselectAddress">修改</text>
						</view>
						<view>{{userInformation.def_address.phoneNo|getAddress}}</view>
					</view>
					
				</view>
				<view class="map-contain">
					<text class="detail-title">配送方式</text>
					<text class="detail-font">蜂鸟专送</text>
				</view>
				<view class="map-contain">
					<text class="detail-title">配送骑手</text>
					<view class="detail-font map-contain" >
						<text>骑手电话|无</text>
						<view @click.stop="callPhone" style="margin-left: 20rpx;display: flex;flex-direction: row;align-items: center;">
							<image src="../../../static/imgs/phone.png" style="width:40rpx;height: 40rpx;"></image>
							<text class="detail-font" >联系骑手</text>
						</view>
						
					</view>
				</view>
		</view>

		<view class="panel_module">
					<view class="title">订单信息</view>
					<view class="map-contain">
						<text class="detail-title">订单号</text>
						<text v-if="!orderFlag" class="detail-font">{{shopping[0].goodsId}}</text>
						<text v-else class="detail-font">{{shopping[0].orderId}}</text>
					</view>
					<view class="map-contain">
						<text class="detail-title">支付方式</text>
						<text class="detail-font">线下支付</text>
					</view>
					<view class="map-contain">
						<text class="detail-title">下单时间</text>
						<text class="detail-font">2020-04-20 11:28</text>
					</view>
		</view>
		<button v-if="!orderFlag" type="primary" @click.stop="dopay" style="position: fixed;bottom: 0rpx;width: 100%;height: 100rpx;" :disabled="clicked">下单后并复制下方链接给商家</button>
		<view style="margin-top: 20rpx;text-align: center;line-height: 50rpx;" v-for="(item ,index) in shopping" :key="index">
			<text>订单号：</text>
			<text  v-if="!orderFlag" @click.stop="addtoPanel(item.goodsId,'goodsId')" style="color: #007AFF;text-decoration: underline;">{{item.goodsId}}</text>
			<text  v-if="orderFlag" @click.stop="addtoPanel(item.orderId,'goodsId')" style="color: #007AFF;text-decoration: underline;">{{item.orderId}}</text>
			
		</view>
	</scroll-view>
</template>

<script>
	import config from '../../../static/config.js'
	export default {
		data() {
			return {
				weixin:'',
				clicked:false,
				// linkShopping:"",
				share:{
					title:'分享到商家',
					path:'/pages/index/index',
					imageUrl:'',
					desc:'dfdsf',
					content:'ewgreghrehehe'
				},
				type_index:'',
				order_index:'',
				ordersum:0.00,
				old_ordersums:0.00,
				business:{},
				shopping:[
					{orderId:'',detail:{}}
				],
				userInformation:{
					def_address:{}
				},
				substatus:true,
				config:config,
				orderImg: '../../../static/imgs/swiper/hygz_01.jpg',
				mapScale:12,
				includePoints:[
					// {
					// 	"latitude": 23.278412,
					// 	"longitude": 116.175574
					// },
					// {
					// 	"latitude": 23.278422,
					// 	"longitude": 116.175594
					// },
				],
				mapObj: {
					latitude: 39.909,
					longitude: 116.39742,
				},
				markers: []

			}
		},
		methods: {
			seeWxAccount(){
				this.weixin=this.business.weixin
			},
			addtoPanel(id,flag){
				console.log(id)
				let title=''
				if(flag=='weixin'){
					title='微信号复制成功'
				}else if(flag=='goodsId'){
					title='商品号复制成功'
				}
				uni.setClipboardData({
					data:id,
					success: (res) => {
						uni.showToast({
							title:title,
							icon:'none'
						})
					}
				})
			},
			// 再来一单
			godoorder(){
				console.log('再来一单')
				uni.navigateTo({
					url:'../select_main/select_main?index='+this.order_index+"&type_index="+this.type_index
				})
			},
			dopay(){
				// 调用支付接口,完成的话在提交订单信息
				
				// 提交订单
					if(this.userInformation.Id==undefined){
						uni.showToast({
							title:'请选择收货人',
							icon:'none'
						})
						return
					}
				let data={
					shopping:this.shopping,
					user:this.userInformation,
					business:this.business
				}
				
			uni.request({
				url:config.server+'/postOrder',
				data:data,
				method:'POST',
				success: (res) => {
					console.log(res.data)
					if(res.statusCode==200){
						this.clicked=true
						console.log('分享并下单成功')
						console.log(this.shopping[0].goodsId)
					}	
				}
			})
			

			},
			

			goselectAddress(){
				uni.navigateTo({
					url:'../selectAddress/selectAddress'
				})
			},
			callPhone(flag){
				
				if(flag==undefined){
					uni.showToast({
						title:'暂无该联系方式',
						icon:'none'
					})
				}else{
					uni.makePhoneCall({
						phoneNumber:flag,
						success: (res) => {
							
						},
						fail: (err) => {
							
						}
					})
				}
				
			},
			changScale(){
				if(this.mapScale<16){
					this.mapScale++
				}else{
					uni.showToast({
						title:'已经是最大了'
					})
				}
			}
		},
		filters:{
			getSize(size){
				if (size == 's') return '小份';
				if (size == 'm') return '中份';
				if (size == 'l') return '大份';
			},
			getAddress(value){
				if(value==undefined){
					return '未填写'
				}else{
					return value
				}
			},
			getprices(value){
				return value.toFixed(2)
			}
		},
		mounted() {
			uni.getLocation({
				success: (res) => {
					let lat=res.latitude+0.001;
					let long=res.longitude+0.001;
					this.mapObj.latitude = res.latitude
					this.mapObj.longitude = res.longitude
					this.markers=[
						{
							id:1,
							latitude:res.latitude,
							longitude:res.longitude,
							iconPath: '../../../static/imgs/qs.png'
						},
						{
							id:2,
							latitude:lat,
							longitude:long,
							iconPath: '../../../static/imgs/sj.png'
						},
						{
							id:3,
							latitude:lat+0.0015,
							longitude:long+0.0015,
							iconPath: '../../../static/imgs/marker.png'
						},
					]
					this.includePoints=[
						{
								latitude: res.latitude,
								longitude: res.longitude
						},
						{
								latitude: lat,
								longitude: long
						},
						{
								latitude:lat+0.0015,
								longitude:long+0.0015,
						}
					]
					// plus.maps.Map.plugins
					// new plus.maps.Map('mapContext')
					
				},
				fail: (err) => {
					
					uni.showToast({
						title: '该地图不支持获取定位'
					})
				}
			})
		},
		onLoad(data) {
			console.log(data)
			if(data.orderId!=undefined){
				this.orderFlag=true
				uni.request({
					url:config.server+'/getdetailLists?orderId='+data.orderId,
					success: (res) => {
						console.log(res.data)
						if(res.statusCode==200){
							
							this.shopping=res.data.order
							this.business=res.data.business
							this.userInformation=res.data.user
							this.ordersum=(parseFloat(this.shopping[0].price)*parseInt(this.shopping[0].num)+parseFloat(this.business.delFee)).toFixed(2)
							this.type_index=data.type_index
							this.order_index=data.index
							// this.old_ordersums=parseFloat(this.$store.state.old_sums)+parseFloat(this.business.delFee)
						}
					}
				})
			}else{
				this.orderFlag=false
				this.shopping=this.$store.state.shopping
				this.business=this.$store.state.selectedBusiness
				this.userInformation=this.$store.state.userInformation
				this.ordersum=(parseFloat(this.$store.state.sums)+parseFloat(this.business.delFee)).toFixed(2)
				this.old_ordersums=(parseFloat(this.$store.state.old_sums)+parseFloat(this.business.delFee)).toFixed(2)
				
			}
			
			
				let shareTitle=[]
				this.shopping.map(item=>{
					if(item.size=='s'){
						shareTitle.push(item.name+"(小份)*"+item.num+"=￥"+item.count+"\n")
					}else if(item.size=='m'){
						shareTitle.push(item.name+"(中份)*"+item.num+"=￥"+item.count+"\n")
					}else if(item.size=='l'){
						shareTitle.push(item.name+"(大份)*"+item.num+"=￥"+item.count+"\n")
					}
				})
				// this.share.content=shareTitle.toString()
				this.share.imageUrl=config.rescourceServer+this.shopping[0].detail.menu_img
				this.share.path='/pages/index/seeMap/seeMap'
				// this.share.query='11111'
		}
	}
</script>

<style scoped>
	.map-contain {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items:center;
	}
.panel_module{
	margin:10rpx 30rpx;
	padding:20rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
}
	.title {
		font-size: 32rpx;
		font-weight: 600;
		color: #000000;
		line-height: 100rpx;
	}

	.orderlist {
		font-size: 28rpx;
		font-weight: 500;
		color: #666666;
		line-height: 60rpx;
		text-align: left;
	}

	.detail-title {
		font-size: 28rpx;
		color: #666666;
		/* font-weight: 600; */
		line-height: 56rpx;
		flex: 1;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.detail-font {
		flex: 3;
		font-size: 22rpx;
		color: #666666;
		/* font-weight: bold; */
		line-height: 56rpx;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
