<template>
	<view class="container">
		<view  v-if="userlist.length==0" style="text-align: center;" @click.stop="closecreateAddress">
			<image src="../../../static/imgs/addImg.png" style="width: 140rpx;height: 140rpx;"></image>
			<view style="color: #666666;">添加配送地址</view>
		</view>
		<view v-else>
			<view class="uni-flex" style="font-size: 40rpx;margin-bottom: 50rpx;">
				<view>我的派送地址</view>
				<view style="color: #007AFF;font-size: 30rpx;line-height: 60rpx;" @click.stop="closecreateAddress">添加+</view>
			</view>
			<view @touchstart.stop='startTouch($event,item.onlyId)' @touchend.stop="endTouch($event,item.onlyId)" v-for="(item,index) in userlist" :key="item.onlyId" @click.stop="selectUserItem(item)" 
			 :ref="item.onlyId" 
			>
			<view class="uni-flex addresslist" :class="item.onlyId==clickId?'selectedUser':''">
				<text class="addItem" >{{item.userName}}</text>
				<text class="addItem" >{{item.phoneNo}}</text>
				<text class="addItem" style="flex: 2;">{{item.address}}</text>
				<view style="flex: 1;margin: 0rpx 5rpx;" v-show="showBtn==item.onlyId">
					<text class="editbtn" @click.stop="EditUserAddress(item)">编辑</text>
					<text  class="editbtn" style="background-color: #FF0000;" @click.stop="DeleteUserAddress(item)">删除</text>
				</view>
			</view>
			
			
			</view>
		</view>
		
		
		<view v-if="add_modal" @click.stop="closecreateAddress" style="background-color: rgba(20,20,20,0.5);width: 100vw;height: 100vh;position: fixed;left: 0rpx;top: 0rpx;z-index: 999;text-align: center;">
			<view @click.stop="" 
			style="background-color: #FFFFFF;display: flex;flex-direction: column;justify-content: center;position: fixed;top: 10vh;width:100vw;padding: 5vw;text-align: left;">
				<view class="addressItemtitle" >添加配送地址信息:</view>
				<input class="addressItem shopping_input"  placeholder="联系人" v-model="newaddress.name"  />
				<input class="addressItem shopping_input"  placeholder="联系方式" v-model="newaddress.mobile"  />
				<!-- 小程序地图 -->
				<view>
					<view style="font-size: 26rpx;line-height: 60rpx;color: #666666;">点击地图以获取您的位置，方便更好为您服务：</view>
					<map
					scale="12"
					:longitude="marker[0].longitude"
					:latitude="marker[0].latitude"
					@tap.stop="getmapLoacation"
					style="width: 90vw;text-align: center;"
					:markers="marker"
					></map>
				</view>
			
				<view class="shopping_input addressItem">
					<text>{{newaddress.location.lat=='点击地图以获取经纬度'?'':newaddress.location.lat}},{{newaddress.location.long}}</text>
				</view>
				<input class="shopping_input addressItem" placeholder="详细配送地址" v-model="newaddress.address"  />
				<!-- <input style="margin: 20rpx 0rpx;" v-model="newaddress" class="shopping_input" /> -->
				<button class="addressItem" @click.stop="createAddress" >提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../../static/config.js'
	export default {
		data() {
			return {
				editflag:false,
				showBtn:'',
				config:config,
				userlist:[],
				add_modal:false,
				clickId:'',
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
				],
				touchXY:[],
				
				
			}
		},
		methods: {
			DeleteUserAddress(item){
				uni.showModal({
					title:'温馨提示！',
					content:'您确认删除本条信息吗？',
					cancelText:'否',
					confirmText:'是',
					success: (res) => {
						console.log(res)
						if(res.confirm){
							uni.request({
								url:config.server+'/delAddress',
								data:{Id:item.Id},
								method:'POST',
								success: (res) => {
									if(res.statusCode==200){
										uni.showToast({
											title:'删除成功',
											icon:'none'
										})
									}else{
										uni.showToast({
											title:'删除失败',
											icon:'none'
										})
									}
									this.getUserlist()
								}
							})
						}
					}
				})
				console.log(item)
			},
			EditUserAddress(item){
				console.log(item)
				this.newaddress={
					Id:item.Id,
					name:item.userName,
					mobile:item.phoneNo,
					address:item.address,
					location:{
						lat:item.location.split(',')[0],
						long:item.location.split(',')[1]
					}
				}
				this.editflag=true
				this.add_modal=true
			},
			startTouch(e,value){
				// console.log(e)
				// console.log(value)
				this.touchXY=[e.changedTouches[0].clientX,e.changedTouches[0].clientY]
			
			},
			endTouch(e,value){
				// 抽屉在左边时
				console.log(this.$refs[value])
				if(this.touchXY[0]>=(e.changedTouches[0].clientX+60)){
					// 关闭
					this.showBtn=value
					
				}else if((this.touchXY[0]+60)<=e.changedTouches[0].clientX){
					//打开
					this.showBtn=''
				}
			
			},
			selectUserItem(value){
				console.log(value)
			
				this.clickId=value.onlyId
				console.log(this.$store.state.userInformation)
				this.$store.dispatch('setUseraddress',value)
				uni.showToast({
					title:'当前用户切换为'+this.$store.state.userInformation.def_address.userName,
					icon:'none'
				})
			
			},
			createAddress(){
				// name:'',
				// mobile:'',
				// address:'',
				// location:{
				// 	lat:'',
				// 	long:''
				// }
				if(this.newaddress.name==''){
					uni.showToast({
						title:'联系人不能为空',
						icon:'none'
					})
					return;
				}if(this.newaddress.mobile==''){
					uni.showToast({
						title:'联系人不能为空',
						icon:'none'
					})
					return;
				}if(this.newaddress.address==''){
					uni.showToast({
						title:'联系人不能为空',
						icon:'none'
					})
					return;
				}
				
				
				this.newaddress.fk_b=this.$store.state.userInformation.Id
				this.newaddress.editflag=this.editflag
				uni.request({
					url:config.server+'/addAddress',
					method:'POST',
					data:this.newaddress,
					success: (res) => {
						if(res.statusCode==200){
							uni.showToast({
								title:'提交成功',
								icon:'none'
							})
							this.editflag=false
							this.closecreateAddress()
							this.getUserlist()
						}
						console.log(res)
					},
					fail: (err) => {
						
					}
				})
			},
			getmapLoacation(e){
				if(e.detail.latitude==undefined){
					if(this.newaddress.location.lat==''){
						uni.showToast({
							title:'地图定位失败，请确保收货地址精确',
							icon:'none'
						})
					}
				}else{
					this.marker[0].latitude = e.detail.latitude
					this.marker[0].longitude =e.detail.longitude
					this.newaddress.location.lat=e.detail.latitude
					this.newaddress.location.long=e.detail.longitude
				}
			
			},
			closecreateAddress(){
				this.add_modal=!this.add_modal
			},
			getUserlist(){
				console.log(this.$store.state.userInformation)
				uni.request({
					url:config.server+'/getUserList?userType='+this.$store.state.userInformation.role+'&userId='+this.$store.state.userInformation.Id+'&businessId='+this.$store.state.userInformation.businessId,
					method:'GET',
					success: (res) => {
						console.log(res)
						this.userlist=res.data.userlist
						if(res.data.userlist.length!==0){
							this.$emit('addressStatus',true)
						}
						else{
							this.$emit('addressStatus',false)
						}
						
					}
				})
			},
		},
		mounted() {
			uni.getLocation({
				success: (res) => {
					this.marker[0].latitude = res.latitude
					this.marker[0].longitude = res.longitude
				},
				fail: (err) => {
					// console.log(err)
					uni.showToast({
						title: '该地图不支持获取定位',
						icon:'none'
					})
				}
			})
			this.getUserlist()
		
		}
	}
</script>

<style scoped>
	
	.container{
		padding: 10rpx;
	}
	.addressItemtitle{
		line-height: 100rpx;
		margin: 20rpx 0rpx;
		width: 90vw;
	}
.addressItem{
	/* line-height: 80rpx; */
	margin: 20rpx 0rpx;
	width: 90vw;
}
.shopping_input {
		flex: 3;
		border: 1px solid #AAAAAA;
		border-radius: 10rpx;
		padding: 10rpx;
	}
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
	.selectedUser{
		background-color: #efffef;
	}
	.editbtn{
		background-color: #007AFF;
		color: #FFFFFF;
		padding: 10rpx;
	}
	.addresslist{
		color: #666;
		font-size: 26rpx;
		line-height: 50rpx;
		border-bottom:1px solid #CCCCCC ;
		margin:20rpx 0rpx ;
	}
</style>
