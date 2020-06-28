<template>
	<view  style="padding: 10vw;">
		<!-- 登录 -->
		<view v-show="loginflag=='0'">
		<view class="title">登录</view>
		<view>
			<input v-model="loginname" placeholder="请输入用户名"  class="inputBorder "/>
			<input password="true" v-model="password" placeholder="请输入密码"  class="inputBorder "/>
			<view class="formline">
				<view >
					<text @click.stop="forgotPass">忘记密码</text>
					<text @click.stop="goWXlogin" style="margin-left: 20rpx;">微信登录</text>
				</view>
				<view >
					<text @click.stop="godefaullogin" style="margin-right: 20rpx;">我有订单号</text>
					<text @click.stop="goRegister">注册</text>
				</view>
			</view>
			<view style="font-size: 28rpx;margin: 30rpx 0rpx;">
				<text>请选择登录角色：</text>
				<text @click.stop="goselectRole" style="color: #007AFF;text-decoration: underline;">{{roleId|getRole}}</text>
			</view>
			<button type="primary" @click.stop="gologin">登录</button>
		</view>
		</view>
		<!-- 注册 -->
		<view v-show="loginflag=='1'">
			<view class="title">注册</view>
			<view>
				
				<input v-model="username" placeholder="请输入用户名"  class="inputBorder "/>
				<input v-model="loginname" placeholder="请输登录账号"  class="inputBorder "/>
				<input v-model="password" placeholder="请输入密码"  class="inputBorder "/>
				<view style="font-size: 28rpx;line-height: 100rpx;">
					<text>请选择注册角色：</text>
					<text @click.stop="goselectRole" style="color: #007AFF;text-decoration: underline;">{{roleId|getRole}}</text>
				</view>
				<view style="display: flex;flex-direction: row;align-items: center;">
					<button style="flex: 1;" type="primary" @click="goback" plain="true">返回</button>
					<button style="flex: 1;" type="primary" @click="Register">注册</button>
				</view>
			</view>
		</view>
		
		<view v-show="loginflag=='3'">
			<view class="title">请输入订单号</view>
			<view>
				
				<input v-model="orderId" placeholder="请输入订单号"  class="inputBorder"/>
				<view style="font-size: 28rpx;line-height: 100rpx;">
					<text>请选择登录角色：</text>
					<text style="color: #007AFF;text-decoration: underline;">游客</text>
				</view>
				<view style="display: flex;flex-direction: row;align-items: center;">
					<button style="flex: 1;" type="primary" @click.stop="goback" plain="true">返回登录</button>
					<button style="flex: 1;" type="primary" @click.stop="seeOrderId">查看订单</button>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import config from '../../../static/config.js'
	export default {
		data() {
			return {
				orderId:'',
				config:config,
				loginflag:'0',
				username:'',
				loginname:'',
				password:'',
				roleId:'01',
				provider:'',
			}
		},
		methods: {
			goWXlogin(){
				if(this.provider==undefined){
					uni.showToast({
						title:'该平台不支持微信登录',
						icon:'none'
					})
				}else{
				uni.login({
					provider:this.provider,
					success: (res) => {
						if(res.code){
							uni.getUserInfo({
								provider:this.provider,
								lang:'zh_CN',
								success: (res1) => {
									uni.request({
										url:config.server+'/getWXSession',
										method:'POST',
										data:{
											js_code:res.code,
											grant_type:'authorization_caode',
											appid:config.appid,
											secret:config.secret,
											signature:res1.signature,
											rawData:res1.rawData,
											// userInfo:res1.userInfo
											},
										success: (response) => {
											// 登录成功
											console.log(res1.userInfo)
											console.log(response.data)
											
											if(response.data.status){
												this.password=response.data.reuslt.openid
												this.loginname=res1.userInfo.nickName
												if(response.data.flag){
													uni.request({
														url:config.server+'/register',
														data:{
															loginname:res1.userInfo.nickName,
															password:response.data.reuslt.openid,
															roleId:this.roleId,
															username:res1.userInfo.nickName,
															wxflag:'02'
														},
														method:'POST',
														success: (res2) => {
															this.gologin()
														}
													})
												}else{
													this.gologin()
												}
												this.$store.dispatch('setOpenId',response.data.reuslt.openid)
												this.$store.dispatch('setSessionKey',response.data.reuslt.session_key)
											
											}else{
												uni.showToast({
													title:'微信登录失败',
													icon:'none'
												})
												
											}
											
										},
										fail: (err) => {
											console.log(err)
										}
									})
								},
								fail: (err) => {
									uni.showToast({
										title:'获取验证信息失败',
										icon:'none'
									})
								}
							})
						
						}else{
							uni.showToast({
								title:'获取登录态失败',
								icon:'none'
							})
						}
					},
					fail: (res) => {
						uni.showToast({
							title:'登录失败'+err,
							icon:'none'
						})
					}
				})
				
				}
				
				
			},
			getProvider(){
				uni.getProvider({
					service:'oauth',
					success: (res) => {
						console.log(res.provider[0])
						if(res.provider.length!==0){
							this.provider=res.provider[0]
						}
					}
				})
			},
			godefaullogin(){
			this.loginflag='3'
			},
			seeOrderId(){
				uni.request({
					url:config.server+'/getdetailLists?orderId='+this.orderId,
					success: (res) => {
						console.log(res.data)
						if(res.statusCode==200){
							let gopage='../../index/seeMap/seeMap'
							// 组件在index中时
							if(this.loginpage=='t'){
								gopage='./seeMap/seeMap'
							}
							uni.navigateTo({
								url:gopage+'?orderId='+this.orderId,
							})
						}else if(res.statusCode==404){
							uni.showToast({
								title:'订单不存在',
								icon:'none'
							})
							
						}
					}
				})
				
			
			},
			goback(){
				this.username=''
				this.loginname=''
				this.password=''
				this.roleId='01'
				this.loginflag='0'
				this.orderId=''
			},
			goselectRole(){
				uni.showActionSheet({
					itemList:['普通用户','商家','骑手'],
					itemColor:'#007AFF',
					success: (res) => {
						if(res.tapIndex==0){
							this.roleId='01'
						}
						if(res.tapIndex==1){
							this.roleId='02'
						}
						if(res.tapIndex==2){
							this.roleId='03'
						}
					}
				})
			},
			gologin(){
				console.log(this.loginname,this.password)
				uni.request({
					url:config.server+'/login',
					method:'POST',
					data:{loginname:this.loginname,password:this.password,roleId:this.roleId},
					success: (res) => {
						if(res.statusCode==200){
							if(res.data.result.def_address==undefined){
								this.$store.dispatch('setUser',{...res.data.result,def_address:{phoneNo:'',address:''}})
							}else{
								this.$store.dispatch('setUser',res.data.result)
							}
							console.log(res)
							uni.showToast({
								title:'微信登录成功',
								icon:'none'
							})
							uni.navigateBack({
								
							})
						}else if(res.statusCode==404){
							uni.showToast({
								title:'角色，账号或密码错误',
								icon:'none'
							})
						}
						
					}
				})
			},
			forgotPass(){
				uni.showToast({
					title:'暂未开通',
					icon:'none'
				})
			},
			goRegister(){
				this.loginname=''
				this.password=''
				this.roleId='01'
				this.loginflag='1'
			},
			Register(){
				uni.request({
					url:config.server+'/register',
					data:{loginname:this.loginname,username:this.username,password:this.password,roleId:this.roleId,wxflag:'01'},
					method:'POST',
					success: (res) => {
						if(res.statusCode==200){
							console.log(res.data)
							uni.showToast({
								title:'注册成功',
								icon:'none'
							})
							this.goback()
						}else if(res.statusCode==500){
							uni.showToast({
								title:'该角色账号已被注册',
								icon:'none'
							})
							return;
						}
					}
				})
			},
		},
		props:['loginpage'],
		filters:{
			getRole(roleId){
				if(roleId=='01')return '普通用户'
				if(roleId=='02')return '商家'
				if(roleId=='03')return '骑手'
			}
		},
		onShow() {
			this.getProvider()
		}
	}
</script>

<style scoped>
	.title{
		text-align: center;
		font-size: 40rpx;
	}
	.inputBorder{
		font-size: 30rpx;
		padding: 10rpx;
		border: 1px solid #AAAAAA;
		line-height: 100rpx;
		margin: 30rpx 0rpx;
		border-radius: 10rpx;
		color: #333333;
	}
	.formline{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 28rpx;
		color: #007AFF;
		text-decoration: underline;
		margin: 30rpx 0rpx;
	}
</style>
