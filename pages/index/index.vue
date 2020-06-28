<template>
	<!-- @touchstart='startTouch' @touchend="endTouch" -->
	<view>

		<!-- 		<uni-drawer   ref="settingDrawer" style="z-index: 2000;position: fixed;">
			<view style="padding: 40rpx;background-color: #EFEFEF;">
				<view v-show="!addressflag" style="text-align: center;" @click.stop="goaddAddress">
					+暂未添加配送地址
				</view>
				<view v-show="addressflag">
					<selected-address @addressStatus="addressStatus"></selected-address>
				</view>
			</view>
			
			<view @click="goProduce" style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;padding: 20rpx;">
				<image src="../../static/imgs/swiper/hygz_01.jpg" style="height: 60rpx;width:60rpx;border-radius: 50rpx;"></image>
				<view style="font-size: 26rpx; color: #888;margin-left: 20rpx;">我的店铺</view>
			</view>
		</uni-drawer> -->
		<view class="fixed_search">
			<view style="flex: 1;text-align: center;">
				<image @click="scanCode" class="fixed_img" src="../../static/imgs/scan.png"></image>
			</view>
			<input @confirm="goSearch" style="flex:4" class="fixed_input" type="text" v-model="fixed_search" placeholder="想吃什么,我来帮你找" confirm-type="search" />
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
				<shopping-car></shopping-car>
			</view>
		</view>
		
		
	<!-- 	<view v-show="userInformation.Id==-1" style="position: fixed;top: 0vh;width: 100vw;height: 100vh;background-color: rgba(200,200,200,0.8);z-index:999;">
			<view style="width: 96vw;background-color: #FFFFFF;margin:20vh 2vw;border-radius: 20rpx;">
				<uni-login loginpage="t"></uni-login>
			</view>
		</view> -->

	</view>
</template>

<script>
	import uniDrawer from '../../components/uni-drawer/uni-drawer.vue'
	import comMain from './scroll_main'
	import shoppingCar from './shopping_car/shopping_car'
	import config from '../../static/config.js'
	import selectedAddress from './selectAddress/selectAddress'
	// import uniLogin from '../myDetail/login/login'
	export default {
		data() {
			return {
				userInformation:{},
				clickId: '',
				add_modal: false,
				config: config,
				fixed_search: '',
				// activlocationX:'',
				// activlocationY:'',
				showshoppingCar: false,
				// touchXY:[],
				// addressflag:false,

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
			this.userInformation=this.$store.state.userInformation

		},
		methods: {
			goSearch(){
				uni.showToast({
					title:'暂不支持查询',
					icon:'none'
				})
			},
			goaddAddress() {
				uni.navigateTo({
					url: 'selectAddress/selectAddress'
				})
			},
			addressStatus(flag) {

				this.addressflag = flag
			},
			goProduce() {
				uni.navigateTo({
					url: './operation_page/operation_page'
				})
			},
			// startTouch(e){
			// 	this.touchXY=[e.changedTouches[0].clientX,e.changedTouches[0].clientY]
			
			// },
			// endTouch(e){
			// 	// 抽屉在左边时
			// 	if(this.touchXY[0]>=(e.changedTouches[0].clientX+200)){
			// 		// 关闭
			// 		this.$refs.settingDrawer.close()
			// 	}else if((this.touchXY[0]+200)<=e.changedTouches[0].clientX){
			// 		//打开
			// 		this.$refs.settingDrawer.open()
			// 	}
			
			// },
			hidden_sheet() {
				this.showshoppingCar = false
			},
			goShopping_car() {
				this.showshoppingCar = true
			},
			touch_active_start(e) {},
			touch_active_end(e) {
				// this.activlocationX=e.changedTouches[0].clientX+e.currentTarget.offsetLeft
				this.activlocationY = e.changedTouches[0].clientY - e.currentTarget.offsetTop
			},
			scanCode() {
				uni.scanCode({
					scanType: ['qrCode'],
					success: (res) => {

					},
					fail: (err) => {

					}
				})
			}

		},
		watch:{
			"$store.state.userInformation":function(val,oval){
				this.userInformation=val
				if(this.userInformation.Id==-1){
					uni.navigateTo({
						url:'../myDetail/login/login'
					})
				}
			}
		},
		components: {
			comMain,
			shoppingCar,
			uniDrawer,
			selectedAddress,
			// uniLogin
		},
		onShow() {
			if(this.$store.state.userInformation.Id==-1||this.$store.state.userInformation.Id==undefined){
				uni.navigateTo({
					url:'../myDetail/login/login'
				})
			}
		}
	}
</script>

<style scoped>
	.fixed_search {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		height: 100rpx;
		top: 0px;
		left: 0px;
		z-index: 998;
		background-color: rgba(255, 255, 255, 0.8);
		color: #333333;
		width: 100vw;
	}

	.fixed_input {
		border: 1px solid #AAAAAA;
		padding: 10rpx;
		border-radius: 10rpx;
	}

	.fixed_img {
		width: 50rpx;
		height: 50rpx;
	}

	/* 店铺活动 */
	.active_accelebr {
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
</style>
