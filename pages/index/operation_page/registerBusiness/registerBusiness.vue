<template>
	<view style="margin: 10rpx;background-color: #f8f8f8;padding: 20rpx;border-radius: 20rpx;">
		<view style="text-align: center;">完善商家信息</view>
		<view class="regflex">
			<view style="flex: 1;">店铺头像:</view>
			<view style="margin: 30rpx 0rpx;flex: 2;border: 1px solid #EEEEEE;" @click.stop="addshopImg">
				<image  :src="config.rescourceServer+newbusiness.shopImg" style="width:120rpx;height: 120rpx;"></image>
			</view>
		</view>
		<view class="regflex">
			<view style="flex: 1;">店铺名称:</view>
			<input class="regiInput" v-model="newbusiness.shopname" placeholder="请输入店铺名称"/>
		</view>
		<view class="regflex">
			<view style="flex: 1;">店铺地址:</view>
			<input class="regiInput" v-model="newbusiness.shopaddress" placeholder="请输入店铺所在详细地址"/>
		</view>
		<view>
			<view style="font-size: 30rpx;line-height: 80rpx;color: #666666">请点击地图以更精确的获取您的店铺位置：</view>
			<map
			scale="12"
			:longitude="marker[0].longitude"
			:latitude="marker[0].latitude"
			@tap.stop="getmapLoacation"
			style="width: 90vw;text-align: center;"
			:markers="marker"
			:circles="circles"
			></map>
		</view>
		<view class="regflex">
			<view style="flex: 1;">当前位置:</view>
			<view class="regiInput">{{newbusiness.location.lat}},{{newbusiness.location.long}}</view>
		</view>
		<view class="regflex">
			<view style="flex: 1;">配送范围(km):</view>
			<input @change="changedelaround" class="regiInput" maxlength="2" v-model="newbusiness.shoprdelaround" placeholder="请输入配送范围"/>
		</view>
		<view class="regflex">
			<view style="flex: 1;">店铺联系方式:</view>
			<input class="regiInput" v-model="newbusiness.shoprphone" placeholder="请输入联系方式"/>
		</view>
		<view class="regflex">
			<view style="flex: 1;">店铺微信号:</view>
			<input class="regiInput" v-model="newbusiness.shopwx" placeholder="请输入微信号"/>
		</view>
		<view class="regflex">
			<view style="flex: 1;">选择配送方式:</view>
			<view class="regiInput" @click.stop="goshopDel">
				<text>{{newbusiness.shopdel|getshopDel}}</text>
			</view>
		</view>
		<view class="regflex" v-show="newbusiness.shopdel=='00'">
			<view style="flex: 1;">配送费:</view>
			<input class="regiInput" v-model="newbusiness.shopdelfee" placeholder="请输入配送费"/>
		</view>
		<view class="regflex">
			<view style="flex: 1;">配送起步价:</view>
			<input class="regiInput" v-model="newbusiness.shopstartfee" placeholder="请输入配送起步价"/>
		</view>
		<button type="primary" @click.stop="insertShopping">提交</button>
	</view>
</template>

<script>
	import config from '../../../../static/config.js'
	export default {
		data() {
			return {
				config:config,
				newbusiness:{
					shopImg:'',
					shopwx:'',
					shopname:'',
					shopaddress:'',
					shoprdelaround:'',
					shoprphone:'',
					shopdel:'00',  //00：本店配送，01：顺丰配送，02：蜂鸟配送
					shopdelfee:'',
					shopstartfee:'',
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
				 circles: [{  
							latitude: 23.278983401640446,  
							longitude: 116.17904663085938, 
							radius: 2000,  
							strokeWidth: 1,  
							color: "#6FF63333",  
							fillColor: "#6FF63333",  
				          }], 
			}
		},
		methods: {
			changedelaround(){
				
				this.circles[0].radius=parseInt(this.newbusiness.shoprdelaround)*1000
				console.log(this.circles[0])
			},
			goshopDel(){
				uni.showActionSheet({
					itemList:['本店配送','顺丰配送','蜂鸟配送'],
					itemColor:'#007AFF',
					success: (res) => {
						if(res.tapIndex==0){
							this.newbusiness.shopdel='00'
						}if(res.tapIndex==1){
							this.newbusiness.shopdel='01'
						}if(res.tapIndex==2){
							this.newbusiness.shopdel='02'
						}
					}
				})
			},
			addshopImg(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						
						uni.uploadFile({
							url:config.server+'/businessImg',
							fileType:'image',
							filePath:res.tempFilePaths[0],
							name:'upload',
							success: (response) => {
								if(response.statusCode==200){
								
									this.newbusiness.shopImg=JSON.parse(response.data).url
									// this.createOBJ={
									// 	...this.createOBJ,
									// 	menu_img:JSON.parse(response.data).url
									// }
								}
							}
						})
					}
				})
			},
			// #ifdef MP-WEIXIN
			getmapLoacation(e){
				console.log(e.detail)
				this.marker[0].latitude = e.detail.latitude
				this.marker[0].longitude =e.detail.longitude
				this.newbusiness.location.lat=e.detail.latitude
				this.newbusiness.location.long=e.detail.longitude
				this.circles[0].latitude= e.detail.latitude
				this.circles[0].longitude= e.detail.longitude
			},
			// #endif
			// #ifdef APP-PLUS||H5
			getmapLoacation(){
				uni.showToast({
					icon:'none',
					title:'地图定位失败，请确保地址详细'
				})
			},
			// #endif
			
			validateData(index,title){
				if(index=='location'){
					if(this.newbusiness['location'].lat==''||this.newbusiness['location'].long==''){
						uni.showToast({
							title:title,
							icon:'none'
						})
						return false;
					}else{
						return true;
					}
				}else if(index=='shopdelfee'){
					if(this.newbusiness['shopdel']=='00'&&this.newbusiness['shopdelfee']==''){
						uni.showToast({
							title:title,
							icon:'none'
						})
						return false;
					}else{
						return true;
					}
				}
				else{
					if(this.newbusiness[index]==''){
						uni.showToast({
							title:title,
							icon:'none'
						})
						return false;
					}else{
						return true;
					}
				}
				
			},
			
			insertShopping(){
				let flag=false
				flag=this.validateData('shopImg','请选择店铺头像')
				if(!flag)return;
				flag=this.validateData('shopname','请填写店铺名称')
				if(!flag)return;
				flag=this.validateData('shopaddress','请填写店铺地址')
				if(!flag)return;
				// flag=this.validateData('location','请选择店铺位置')
				// if(!flag)return;
				flag=this.validateData('shoprdelaround','请填写配送范围')
				if(!flag)return;
				flag=this.validateData('shoprphone','请填写店铺电话')
				if(!flag)return;
				flag=this.validateData('shopwx','请填写商家微信号')
				if(!flag)return;
				flag=this.validateData('shopdel','请填写店铺配送方式')
				if(!flag)return;
				flag=this.validateData('shopdelfee','请填写店铺配送费')
				if(!flag)return;
				flag=this.validateData('shopstartfee','请填写店铺配送起步价')
				if(!flag)return;
				
				uni.request({
					url:config.server+'/insertbusiness?loginid='+this.$store.state.userInformation.Id,
					method:'POST',
					data:this.newbusiness,
					success: (res) => {
						
						if(res.statusCode==200){
							uni.showToast({
								title:'提交成功',
								icon:'none'
							})
							uni.navigateTo({
								url:'../../../myDetail/myDetail'
							})
						} if(res.statusCode==500){
							uni.showToast({
								title:'店铺名称已被注册',
								icon:'none'
							})
							return;
						}
						
					}
				})
				
			},
			
		},
		filters:{
			getshopDel(val){
				if(val=='00'){
					return '本店配送'
				}
				if(val=='01'){
					return '顺丰配送'
				}
				if(val=='02'){
					return '蜂鸟配送'
				}
			}
		},
		onLoad() {
			uni.showToast({
				title:'请完善该账号商家信息',
				icon:'none'
			})
			uni.getLocation({
				success: (res) => {
					this.marker[0].latitude = res.latitude
					this.marker[0].longitude = res.longitude
				},
				fail: (err) => {
					
					uni.showToast({
						title: '该地图不支持获取定位',
						icon:'none'
					})
				}
			})
		}
	}
</script>

<style scoped>
.regiInput{
	flex: 2;
	border: 1px solid #CCCCCC;
	padding: 10rpx;
	border-radius: 10rpx;
	font-size: 28rpx;
	margin: 30rpx 0rpx;
}
.regflex{
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 30rpx;
}
</style>
