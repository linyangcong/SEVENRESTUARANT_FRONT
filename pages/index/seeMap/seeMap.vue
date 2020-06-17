<template>
	<scroll-view style="background-color: #EEEEEE;">
		<view>
			<map @click="changScale" :scale="mapScale" id="mapContext" :longitude="mapObj.longitude" :latitude="mapObj.latitude" :enable-traffic="true" style="width: 100%;height: 400rpx;"
			 :markers="markers" :include-points="includePoints"></map>
		</view>


		<view class="panel_module" >
			<view class="map-contain title">
				<view>{{$store.state.shopping[0].shopName}}</view>
				<view style="font-size: 30rpx;font-weight: 400;color:#007AFF;">再来一单</view>
			</view>

				<view class="map-contain "  v-for="(item,index) in $store.state.shopping" :key="index" style="margin: 10rpx 0rpx;">
					<view style="flex: 1;">
						<image style="width: 120rpx;height: 120rpx;" :src="config.rescourceServer+item.detail.menu_img"></image>
					</view>
					<view class="map-contain orderlist" style="flex: 3;align-items: flex-end;">
						<view >
							<view>{{item.name}}</view>
							<view>
								<text style="color: #FF0000;">￥{{item.price[item.size]}}</text>
								<text style="font-size: 20rpx;text-decoration: line-through;margin-left: 10rpx;">￥{{item.price[item.size]}}</text>
							</view>
						</view>
						<view>x{{item.num}}</view>
						<view >￥{{item.count}}</view>
					</view>
				</view>
			<view class="map-contain title" >
				<view @click.stop="callPhone($store.state.shopping[0].shopDetail.phoneNo)" style="color: #007AFF;font-size:30rpx;display: flex;align-items: center;flex-direction: row;">
					<image src="../../../static/imgs/phone.png" style="width:40rpx;height: 40rpx;margin-left: 20rpx;"></image>
					<text>联系店家</text>
				</view>
				<view>
					<text>实付：</text><text style="color: #FF0000;">￥{{$store.state.sums}}</text>
					<text style="text-decoration: line-through;color: #AAAAAA;font-size: 26rpx;margin-left: 10rpx;">￥{{$store.state.old_sums}}</text>
				</view>
			</view>
		</view>


		<view class="panel_module" >
			
				<view class="title">配送信息</view>
				<view class="map-contain ">
					<text class="detail-title">送达时间</text>
					<text class="detail-font">尽快送达</text>
				</view>
				<view class="map-contain" style="align-items: flex-start;">
					<text class="detail-title">收货地址</text>
					<view class="detail-font" >
						<view class="map-contain">
							<text>{{$store.state.userInformation.address==undefined?'未填写':$store.state.userInformation.address}}</text>
							<text  style="color: #007AFF;">修改</text>
						</view>
						<view>{{$store.state.userInformation.phoneNo==undefined?'未填写':$store.state.userInformation.phoneNo}}</view>
					</view>
					
				</view>
				<view class="map-contain">
					<text class="detail-title">配送方式</text>
					<text class="detail-font">蜂鸟专送</text>
				</view>
				<view class="map-contain">
					<text class="detail-title">配送骑手</text>
					<view class="detail-font map-contain" >
						<text>骑手电话|郑佳明</text>
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
						<text class="detail-font">{{$store.state.shopping[0].goodsId}}</text>
					</view>
					<view class="map-contain">
						<text class="detail-title">支付方式</text>
						<text class="detail-font">在线支付</text>
					</view>
					<view class="map-contain">
						<text class="detail-title">下单时间</text>
						<text class="detail-font">2020-04-20 11:28</text>
					</view>
		</view>
	</scroll-view>
</template>

<script>
	import config from '../../../static/config.js'
	export default {
		data() {
			return {
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
			callPhone(flag){
				console.log(flag)
				if(flag==undefined){
					uni.showToast({
						title:'暂无该联系方式',
						icon:'none'
					})
				}else{
					uni.makePhoneCall({
						phoneNumber:flag,
						success: (res) => {
							console.log(res)
						},
						fail: (err) => {
							console.log(err)
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
		mounted() {
			console.log(this.$store.state.userInformation)
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
					// console.log(res.latitude,res.longitude)
					// console.log(lat,long)
				},
				fail: (err) => {
					// console.log(err)
					uni.showToast({
						title: '该地图不支持获取定位'
					})
				}
			})
		},
		onLoad() {
			console.log(this.$store.state.shopping[0])
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
