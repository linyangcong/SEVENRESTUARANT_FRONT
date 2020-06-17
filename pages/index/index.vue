<template>
	<view @touchstart='startTouch' @touchend="endTouch">
		
		<uni-drawer   ref="settingDrawer" style="z-index: 2000;position: fixed;">
			<view style="padding: 40rpx;background-color: #EFEFEF;">
				<view v-if="add_modal" @click.stop="closecreateAddress" style="background-color: rgba(20,20,20,0.5);width: 100vw;height: 100vh;position: fixed;left: 0rpx;top: 0rpx;z-index: 999;text-align: center;">
					<view @click.stop="" 
					style="background-color: #FFFFFF;display: flex;flex-direction: column;justify-content: center;position: fixed;top: 10vh;width:100vw;padding: 5vw;text-align: left;">
						<view style="margin: 20rpx 0rpx;width: 90vw;">添加配送地址信息:</view>
						<input style="margin: 20rpx 0rpx;width: 90vw;" placeholder="联系人" v-model="newaddress.name" class="shopping_input" />
						<input style="margin: 20rpx 0rpx;width: 90vw;" placeholder="联系方式" v-model="newaddress.mobile" class="shopping_input" />
						<!-- 小程序地图 -->
						<map
						scale="12"
						:longitude="marker[0].longitude"
						:latitude="marker[0].latitude"
						@tap.stop="getmapLoacation"
						style="width: 90vw;text-align: center;"
						:markers="marker"
						></map>
						<input style="margin: 20rpx 0rpx;" placeholder="详细配送地址" v-model="newaddress.address" class="shopping_input" />
						<!-- <input style="margin: 20rpx 0rpx;" v-model="newaddress" class="shopping_input" /> -->
						<button @click.stop="createAddress" style="margin: 20rpx 0rpx;">提交</button>
					</view>
				</view>
				
				<view v-if="userlist.length==0" style="text-align: center;" @click.stop="closecreateAddress">
					<image src="../../static/imgs/addImg.png" style="width: 140rpx;height: 140rpx;"></image>
					<view style="color: #666666;">添加配送地址</view>
				</view>
				<view v-else>
					<view class="uni-flex" style="font-size: 30rpx;">
						<view>我的派送地址</view>
						<view style="color: #007AFF;font-size: 30rpx;line-height: 60rpx;" @click.stop="closecreateAddress">添加+</view>
					</view>
					<view v-for="(item,index) in userlist" :key="item.onlyId" @click.stop="selectUserItem(item)" 
					class="uni-flex" :class="item.onlyId==clickId?'selectedUser':''"
					style="color: #666;font-size: 20rpx;line-height: 50rpx;border-bottom:1px solid #CCCCCC ;">
						<text class="addItem" >{{item.userName}}</text>
						<text class="addItem" >{{item.phoneNo}}</text>
						<text class="addItem" style="flex: 2;">{{item.address}}</text>
					</view>
				</view>
			</view>
			
			<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding: 20rpx;">
				<view @click="goProduce">
					<image src="../../static/imgs/swiper/hygz_01.jpg" style="height: 100rpx;width:100rpx;border-radius: 50rpx;"></image>
					<view style="font-size: 26rpx; color: #888;">我的店铺</view>
				</view>
				<view>
					<image src="../../static/imgs/swiper/hygz_01.jpg" style="height: 100rpx;width:100rpx;border-radius: 50rpx;"></image>
					<view style="font-size: 26rpx; color: #888;">我的店铺</view>
				</view>
				<view>
					<image src="../../static/imgs/swiper/hygz_01.jpg" style="height: 100rpx;width:100rpx;border-radius: 50rpx;"></image>
					<view style="font-size: 26rpx; color: #888;">我的店铺</view>
				</view>
				<view>
					<image src="../../static/imgs/swiper/hygz_01.jpg" style="height: 100rpx;width:100rpx;border-radius: 50rpx;"></image>
					<view style="font-size: 26rpx; color: #888;">我的店铺</view>
				</view>
			</view>
		</uni-drawer>
		<view class="fixed_search">
			<view style="flex: 1;text-align: center;">
				<image @click="scanCode" class="fixed_img" src="../../static/imgs/scan.png"></image>
			</view>
			<input style="flex:4" class="fixed_input" type="text" v-model="fixed_search" placeholder="查询菜名" confirm-type="search"/>
			<view style="flex: 1;text-align: center;">
			<image @click.stop="goShopping_car" class="fixed_img" src="../../static/imgs/shopping.png"></image>
			</view>
		</view>
		<com-main></com-main>
		<!-- <view class="active_accelebr" :style="{top:activlocationY+'px'}" @touchstart="touch_active_start" @touchend="touch_active_end" >
			<image src="../../static/imgs/discount/icon.png" style="width: 60rpx;height:60rpx;"></image>
			<view>店铺活动</view>
		</view>	 -->
			<view @click.stop="hidden_sheet" v-show="showshoppingCar" style="position: fixed;top: 0rpx;left: 0rpx;background-color: rgba(60,60,60,0.4);width: 100vw;height: 100vh;z-index: 500;">
				<view @click.stop="" class="selected_flex_col" style="position: fixed;bottom: 0rpx;left: 0rpx;width: 100vw;height: 80vh;z-index: 600;background-color: #FFFFFF;padding: 20rpx;">
					<shopping-car ></shopping-car>
				</view>
			</view>
		
	</view>
</template>

<script>
	import uniDrawer from '../../components/uni-drawer/uni-drawer.vue'
	import comMain from './scroll_main' 
	import shoppingCar from './shopping_car/shopping_car'
	import config from '../../static/config.js'
	export default {
		data() {
			return {
				clickId:'',
				add_modal:false,
				config:config,
				fixed_search:'',
				activlocationX:'',
				activlocationY:'',
				showshoppingCar:false,
				touchXY:[],
				userlist:[
					// {name:'linyangcong',mobile:'19925956050',address:'广东省普宁市流沙镇南亨里12号'}
				],
				newaddress:{
					name:'',
					mobile:'',
					address:'',
					location:{
						lat:'',
						long:''
					}
				},
				marker:[
					{
					latitude:'',
					longitude:'',
					}
				]
				
			}
			
		},
		mounted() {
			// uni.showModal({
			// 	title:'今日优惠券',
			// 	content:'今日优惠券看看能不能放图片',
			// 	confirmText:'确定',
			// 	confirmColor:"#00ff00",
			// 	cancelText:'none'
			// })
			uni.getLocation({
				success: (res) => {
					this.marker[0].latitude = res.latitude
					this.marker[0].longitude = res.longitude
				},
				fail: (err) => {
					// console.log(err)
					uni.showToast({
						title: '该地图不支持获取定位'
					})
				}
			})
			this.getUserlist()
		},
		methods: {
			selectUserItem(value){
				console.log(value)
				this.clickId=value.onlyId
				this.$store.dispatch('setUser',value)
			
			},
			getmapLoacation(e){
				console.log(e.detail)
				this.marker[0].latitude = e.detail.latitude
				this.marker[0].longitude =e.detail.longitude
				this.newaddress.location.lat=e.detail.latitude
				this.newaddress.location.long=e.detail.longitude
			},
			createAddress(){
				uni.request({
					url:config.server+'/addAddress',
					method:'POST',
					data:this.newaddress,
					success: (res) => {
						if(res.statusCode==200){
							uni.showToast({
								title:'提交成功'
							})
							this.closecreateAddress()
							this.getUserlist()
						}
						console.log(res)
					},
					fail: (err) => {
						
					}
				})
			},
			getUserlist(){
				uni.request({
					url:config.server+'/getUserList',
					method:'GET',
					success: (res) => {
						console.log(res)
						this.userlist=res.data.userlist
					}
				})
			},
			closecreateAddress(){
				this.add_modal=!this.add_modal
			},
			goProduce(){
				uni.navigateTo({
					url:'./operation_page/operation_page'
				})
			},
			startTouch(e){
				this.touchXY=[e.changedTouches[0].clientX,e.changedTouches[0].clientY]
				// console.log(e.changedTouches[0].clientX,e.changedTouches[0].clientY)
			},
			endTouch(e){
				// 抽屉在左边时
				if(this.touchXY[0]>=(e.changedTouches[0].clientX+200)){
					// 关闭
					this.$refs.settingDrawer.close()
				}else if((this.touchXY[0]+200)<=e.changedTouches[0].clientX){
					//打开
					this.$refs.settingDrawer.open()
				}
				// console.log(e.changedTouches[0].clientX,e.changedTouches[0].clientY)
			},
			hidden_sheet() {
				this.showshoppingCar = false
				// this.selected_item = {}
			},
			goShopping_car(){
				this.showshoppingCar=true
			},
			touch_active_start(e){
				// console.log(e)
			},
			touch_active_end(e){
				// this.activlocationX=e.changedTouches[0].clientX+e.currentTarget.offsetLeft
				this.activlocationY=e.changedTouches[0].clientY-e.currentTarget.offsetTop
				console.log(this.activlocationY)
				console.log(e)
			},
			scanCode(){
				uni.scanCode({
					scanType:['qrCode'],
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
									})
			}
			
		},
		components:{
			comMain,
			shoppingCar,
			uniDrawer
		}
	}
</script>

<style scoped>
	.uni-flex{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
	}
	.addItem{
		flex: 1;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 0rpx 5rpx;
	}
	.fixed_search{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		height: 100rpx;
		top: 0px;
		left: 0px;
		z-index: 1000;
		background-color:rgba(255,255,255,0.8);
		color: #333333;
		width: 100vw;
	}
	.fixed_input{
		border: 1px solid #AAAAAA;
		padding: 10rpx;
		border-radius: 10rpx;
	}
	.fixed_img{
		width: 50rpx;
		height:50rpx;
	}
	/* 店铺活动 */
	.active_accelebr{
		position: fixed;
		bottom: 100rpx;
		right: 10rpx;
		font-size: 20rpx;
		background-color: #FF0000;
		color: #FFFFFF;
		font-weight: 600;
		border-radius: 60rpx;
		height: 120rpx;
		width: 120rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
	.shopping_input {
		flex: 3;
		border: 1px solid #AAAAAA;
		border-radius: 10rpx;
		padding: 10rpx;
	}
	.selectedUser{
		background-color: #CfCfCf;
	}

</style>
