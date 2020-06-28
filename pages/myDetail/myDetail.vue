<template>
	<view >
		<text @click.stop="goAboutus" style="position: fixed;top: 100rpx;right: -10rpx;background-color: #007AFF;border-radius: 20rpx;font-size: 20rpx;padding: 10rpx 20rpx;color: #FFFFFF;">
			关于我们
		</text>
		<!-- 头部 -->
		<view style="margin: 50rpx 0rpx;">
			
			<view class="myHead" style="border-bottom: none;">
				<view style="display: flex;align-items: center;flex-direction: column;flex: 1;">
					<!-- @click.stop="changIcon" -->
					<image :src="userInformation.def_address.urlImg?'../../static/imgs/notFound.jpg':config.rescourceServer+userInformation.def_address.urlImg" class="myImg"></image>
					<view class="myHeadFont">{{userInformation.username}}</view>
				</view>
				<view style="flex: 2;">
					<view class="myHeadFont myHead">
						<text style="flex:1;text-align: right;">角色：</text>
						<text style="flex: 2;color: #007AFF;" @click.stop="changeRole">{{userInformation.role|getRole}}</text>
					</view>
					<view class="myHeadFont myHead" v-if="selectedRole=='01'">
						<text style="flex:1;text-align: right;">收货人：</text>
						<text  style="flex: 2;overflow-y: hidden;text-overflow: ellipsis;white-space: nowrap;">{{userInformation.def_address.userName==undefined?'未完善':userInformation.def_address.userName}}</text>
					</view>
					<view class="myHeadFont myHead">
						<text style="flex:1;text-align: right;">地址：</text>
						<text  style="flex: 2;overflow-y: hidden;text-overflow: ellipsis;white-space: nowrap;">{{userInformation.def_address.address==undefined?'未完善':userInformation.def_address.address}}</text>
					</view>
					<view class="myHeadFont myHead">
						<text style="flex:1;text-align: right;">电话：</text>
						<text style="flex: 2">{{userInformation.def_address.phoneNo==undefined?'未完善':userInformation.def_address.phoneNo}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 内容部分 -->
		<view style="margin-top: 10rpx">
			
			<view v-show="selectedRole=='01'">
			<view class="roleTitle">普通用户</view>
			<view class="myHead">
				<view class="myborder" @click.stop="goOrderDetail">
						<image src="../../static/imgs/order.png" class="myItemImg"></image>
					<view class="myHeadFont">历史订单</view>
				</view>
				<view class="myborder"  @click.stop="changeUser">
					<image src="../../static/imgs/wuliu.png" class="myItemImg"></image>
					<view class="myHeadFont">配送信息</view>
				</view>
				<view class="myborder" @click.stop="goTip">
					<image src="../../static/imgs/waitingfor.png" class="myItemImg"></image>
					<view class="myHeadFont">敬请期待...</view>
				</view>
			</view>
			</view>
			
			<view v-show="selectedRole=='02'">
			<view class="roleTitle">商家</view>
			<view class="myHead">
				<view class="myborder" @click.stop="goOrderDetail">
					<image src="../../static/imgs/order.png" class="myItemImg"></image>
					<view class="myHeadFont">我的订单</view>
				</view>
				<view class="myborder" @click.stop="goManageShop">
					<image src="../../static/imgs/manage.png" class="myItemImg"></image>
					<view class="myHeadFont">商品管理</view>
				</view>
				<view class="myborder"  @click.stop="goTip">
					<image src="../../static/imgs/waitingfor.png" class="myItemImg"></image>
					<view class="myHeadFont">敬请期待...</view>
				</view>
			</view>
			</view>
			
			<view v-show="selectedRole=='03'">
			<view class="roleTitle">骑手</view>
			<view class="myHead">
				<view class="myborder" @click.stop="goOrderDetail">
					<image src="../../static/imgs/order.png" class="myItemImg"></image>
					<view class="myHeadFont">我的订单</view>
				</view>
				<view class="myborder">
					<image src="../../static/imgs/wuliu.png" class="myItemImg"></image>
					<view class="myHeadFont">配送信息</view>
				</view>
				<view class="myborder"  @click.stop="goTip">
					<image src="../../static/imgs/waitingfor.png" class="myItemImg"></image>
					<view class="myHeadFont">敬请期待...</view>
				</view>
			</view>
		</view>
		</view>
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
				config:config,
				selectedRole:'',
				address:'',
				phone:''
			}
		},
		methods: {
			// changIcon(){
			// 	uni.chooseImage({
			// 		count:1,
			// 		success: (res) => {
			// 			uni.uploadFile({
			// 				url:config.server+'/businessImg',
			// 				fileType:'image',
			// 				filePath:res.tempFilePaths[0],
			// 				name:'upload',
			// 				success: (response) => {
			// 					if(response.statusCode==200){
			// 						
			// 						this.newbusiness.shopImg=JSON.parse(response.data).url
			// 						// this.createOBJ={
			// 						// 	...this.createOBJ,
			// 						// 	menu_img:JSON.parse(response.data).url
			// 						// }
			// 					}
			// 				}
			// 			})
			// 		}
			// 	})
			// },
			goAboutus(){
				uni.navigateTo({
					url:'about_us/about_us'
				})
			},
			goManageShop(){
				uni.navigateTo({
					url:'../index/operation_page/operation_page'
				})
			},
			goOrderDetail(){
				uni.navigateTo({
					url:'orderDetail/orderDetail'
				})
			},
			changeRole() {
				// 先去查询该用户ID存在哪些角色，再出现选择
				uni.request({
					url:config.server+'/getRole',
					data:{password:this.$store.state.userInformation.password,loginname:this.$store.state.userInformation.loginname},
					method:'POST',
					success: (res) => {
						if(res.statusCode==200){
							
							let arrlist={textlist:[],inlist:[]}
							res.data.result.map(item=>{
								arrlist.inlist.push(item.role)
								if(item.role=='01'){
									arrlist.textlist.push('普通用户')
								}
								if(item.role=='02'){
									arrlist.textlist.push('商家')
								}
								if(item.role=='03'){
									arrlist.textlist.push('骑手')
								}
								
							})
							arrlist.textlist.push('注册新角色')
							arrlist.inlist.push('04')
							uni.showActionSheet({
								itemList: arrlist.textlist,
								itemColor: '#007AFF',
								success: (response) => {
									// console.log(response.tapIndex,arrlist.textlist.length-1)
									if(response.tapIndex==arrlist.textlist.length-1){
										uni.showActionSheet({
											itemColor:'#007AFF',
											itemList:['添加用户角色','添加商家角色','添加骑手角色'],
											success: (res1) => {
												var data={},roleId=''
												if(res1.tapIndex==0){
													roleId='01'
												}
												if(res1.tapIndex==1){
													roleId='02'
												}
												if(res1.tapIndex==2){
													roleId='03'
												}
												console.log(res1.tapIndex,res1)
												data={
													roleId:roleId,
													username:this.userInformation.username,
													loginname:this.userInformation.loginname,
													password:this.userInformation.password,
													wxflag:this.userInformation.wxflag
												}
												console.log('------11111111----')
												console.log(data)
												uni.request({
													url:config.server+'/register',
													method:'POST',
													data:data,
													success: (ress1) => {
														console.log('-----222222222------')
														console.log(ress1)
														if(ress1.statusCode==200){
															uni.showToast({
																title:'注册成功！',
																icon:'none'
															})
														}else if(ress1.statusCode==500){
															uni.showToast({
																title:'账号角色已被注册',
																icon:'none'
															})
														}
													},fail: (err1) => {
													
													}
												})
											}
										})
										
									}else{
										console.log('===4444444444========')
										console.log(res)
										console.log(res.data.result[response.tapIndex].def_address)
										if(res.data.result[response.tapIndex].def_address==undefined){
											this.$store.dispatch('setUser',{...res.data.result[response.tapIndex],def_address:{urlImg:'/sevenRestuarant/user/user.png'}})
										}else{
											this.$store.dispatch('setUser',res.data.result[response.tapIndex])
										}
										this.selectedRole=this.$store.state.userInformation.role
									}
								
									
									// if (response.tapIndex == 0) {
									// 	// 普通用户
										
									// }
									// if (response.tapIndex == 1) {
									// 	// 商家
									// }
									// if (response.tapIndex == 2) {
									// 	// 骑手
									// }
								}
							})
						}else{
							uni.showToast({
								icon:'none',
								title:'网络异常'
							})
						}
					}
				})
				
			},
			changeUser() {
				uni.navigateTo({
					url: '../index/selectAddress/selectAddress'
				})
			},
			goTip(){
				uni.showToast({
					title:'敬请期待...',
					icon:'none'
				})
			}
		},
		filters:{
			getRole(role){
				if(role=='01')return '普通用户'
				if(role=='02')return '商家'
				if(role=='03')return '骑手'
			}
		},
		watch:{
			"$store.state.userInformation":function(val,oval){
				this.userInformation=val
				if(this.$store.state.userInformation.Id==-1||this.$store.state.userInformation.Id==undefined){
					uni.navigateTo({
						url:'../myDetail/login/login'
					})
				}
			}
		},
		onShow() {
			if(this.$store.state.userInformation.Id==-1||this.$store.state.userInformation.Id==undefined){
				uni.navigateTo({
					url:'../myDetail/login/login'
				})
			}else{
				this.selectedRole=this.$store.state.userInformation.role
				this.userInformation=this.$store.state.userInformation
			}
		}
	}
</script>

<style scoped>
	.myHead {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px solid #CCCCCC;
	}

	.myHeadFont {
		font-size: 28rpx;
		line-height: 60rpx;

	}

	.myImg {
		width: 120rpx;
		height: 120rpx;
	}
	.myItemImg{
		width: 100rpx;
		height: 100rpx;
	}
	.myborder{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* border: 1px solid #CCCCCC; */
		padding: 10rpx;
	}
	.roleTitle{
		font-size: 30rpx;
		color: #888;
		text-align: center;
	}
</style>
