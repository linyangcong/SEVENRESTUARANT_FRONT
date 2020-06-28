<template>
	<scroll-view>
		<view  style="margin-bottom: 100rpx;" v-if="!addflag">
			<view v-show="commentLists.length!=0" v-for="(item,index) in commentLists"  class="commentItem">
				<view class="comment-row">
				<view class="comment-user">
					<image class="comment-user-icon" :src="config.rescourceServer+item.user.urlImg" ></image>
					<view >{{item.user.userName==''?'匿名':item.user.userName}}</view>
				</view>
				<view style="flex: 4;">
					<view class="comment-time">{{item.createTime}}</view>
					<view style="margin: 10rpx 0rpx;">
						<uni-rate max="5" disabled="true" :value="item.servernum" size="12" margin="5"></uni-rate>
					</view>
					<view>
						<text class="comment-flag">服务:{{item.servernum|getStartNum}}</text>
						<text class="comment-flag">味道:{{item.tastynum|getStartNum}}</text>
						<text class="comment-flag">包装:{{item.packnum|getStartNum}}</text>
						<text class="comment-flag">配送:{{item.distributionnum|getStartNum}}</text>
					</view>
					<view class="comment-content">{{item.content}}</view>
					<view >
						<image class="comment-img" v-for="(it,i) in item.imgeUrl" :key="i" :src="config.rescourceServer+it" ></image>
					</view>
				</view>
				</view>
				<view class="comment-row" style="align-items: center;">
					<view class="comment-user">推荐:</view>
					<view class="comment-row comment-menu" >
						<view class="comment-row comment-menu-name" >
							<image style="width: 40rpx;height: 40rpx;border-radius: 20rpx;" :src="config.rescourceServer+item.menu.menu_img" ></image>
							<view style="margin-left: 10rpx;">{{item.menu.name}}</view>
						</view>
					</view>
					<view class="comment-user" style="flex: 2;">{{item.business.business_name}}</view>
				</view>
			</view>
			<view v-show="commentLists.length==0" style="margin: 20vh 0rpx; text-align: center;color: #CCCCCC;font-size: 50rpx;" >
				空空如也
			</view>
		</view>
		
		<!-- 添加评价 -->
		<view v-else class="commentItem" style="background-color: #FFFFFF;">
			<view style="font-size: 18rpx;text-align: center;line-height: 80rpx;color: #AAAAAA;">
				{{addComments.createTime}}
			</view>
			<view class="comment-row" style="align-items: flex-start;background-color: #fafafa;">
				<image class="comment-img" :src="addComments.menu==undefined?'../../../static/imgs/notfound.jpg':config.rescourceServer+addComments.menu.menu_img"></image>
				<view class="comment-content">
					<view >
						{{addComments.business==undefined?'':addComments.business.business_name}}
					</view>
					<view >{{addComments.menu==undefined?'':addComments.menu.name}}</view>
					<view style="font-size: 26rpx;">
						<text>{{addComments.size|getSize}}:</text>
						<text style="color: #FF0000;">￥{{addComments.price}}</text>
						<text style="margin-left: 10rpx;color: #FF0000;">*{{addComments.num}}</text>
					</view>
				</view>
			</view>
			<view style="background-color: #fafafa;margin-top: 50rpx;">
				<view  style="line-height: 120rpx;text-align: center;font-size: 40rpx;">评分</view>
				<view class="comment-row-star" >
					<view class="comment-title">服务:</view>
					<view style="flex: 3;">
						<uni-rate size="20" margin="10" :value="servernum" @change="server"></uni-rate>
					</view>
					<view class="comment-title" style="flex: 1;">
						{{servernum.toFixed(1)}}
					</view>
				</view>
				<view class="comment-row-star" style="margin-top: 50rpx;">
					<view class="comment-title">味道:</view>
					<view style="flex: 3;">
						<uni-rate size="20" margin="10" :value="tastynum" @change="tasty"></uni-rate>
					</view>
					<view class="comment-title" style="flex: 1;">
						{{tastynum.toFixed(1)}}
					</view>
				</view>
				<view class="comment-row-star" style="margin-top: 50rpx;">
					<view class="comment-title">包装:</view>
					<view style="flex: 3;">
						<uni-rate size="20" margin="10" :value="packnum" @change="pack"></uni-rate>
					</view>
					<view class="comment-title" style="flex: 1;">
						{{packnum.toFixed(1)}}
					</view>
				</view>
				
				<view class="comment-row-star" style="margin-top: 50rpx;">
					<view class="comment-title">配送:</view>
					<view style="flex: 3;">
						<uni-rate size="20" margin="10" :value="distributionnum" @change="distribution"></uni-rate>
					</view>
					<view class="comment-title" style="flex: 1;">
						{{distributionnum.toFixed(1)}}
					</view>
				</view>
				<view class="comment-row-star" style="align-items: flex-start;margin-top: 50rpx;">
					<view class="comment-title">评论：</view>
					<textarea v-model="context" maxlength="50" style="flex: 3;border: 1px solid #AAAAAA;border-radius: 10rpx;padding: 10rpx;height: 160rpx;">
					</textarea>
				</view>
				<view  style="margin-top: 50rpx;"> 
					<view class="comment-row-star" >
						<text class="comment-title">上传图片</text>
						<text style="flex: 3;text-align: right;color: #007AFF;" @click.stop="addImg(0)">+添加</text>
					</view>
					<view  style="margin-top: 20rpx;">
						<image class="comment-img" @click.stop="addImg(index)" v-for="(item,index) in imgUrl" :src="config.rescourceServer+item" ></image>
					</view>
				</view>
				<view class="comment-row-star" style="margin: 40rpx 0rpx;">
					<text class="comment-title" >当前用户:</text>
					<text style="flex: 3;font-size: 36rpx;color: #007AFF;text-decoration: underline;" @click.stop="changeUser">{{userInformation.username==undefined?'匿名':userInformation.username}}</text>
				</view>
			</view>
			<button type="primary" @click.stop="comfirmComment">提交</button>
			
		</view>
	</scroll-view>
</template>

<script>
	import config from '../../../static/config.js'
	import uniRate from '../../../components/uni-rate/uni-rate.vue'
	export default {
		data() {
			return {
				userInformation:{},
				commentId:0,
				servernum:5,
				tastynum:5,
				packnum:5,
				distributionnum:5,
				context:'',
				imgUrl:[],
				
				addflag:'',
				config:config,
				addComments:{},
				commentLists:[]
			}
		},
		props:['addcomment','business'],
		methods: {
			changeUser(){
				uni.navigateTo({
					url:'../../index/selectAddress/selectAddress'
				})
			},
			addImg(index){
				
				if(this.imgUrl.length>=3){
					uni.showToast({
						title:'最多只能上传三张',
						icon:'none'
					})
					return ;
				}
				if(index==0){
				
				uni.chooseImage({
					count:1,
					success: (res) => {
					uni.uploadFile({
						url:config.server+'/uploadCommentImg',
						fileType:'image',
						filePath:res.tempFilePaths[0],
						name:'upload',
						success: (response) => {
							if(response.statusCode==200){
						
							this.imgUrl.push(JSON.parse(response.data).url)
							this.commentId=JSON.parse(response.data).Id
							// this.imgUrl.push(res.tempFilePaths[0])
							}
						}
					})
					
					}
				})
				}
				else{
					uni.chooseImage({
						count:1,
						success: (res) => {
						uni.uploadFile({
							url:config.server+'/uploadCommentImg',
							fileType:'image',
							filePath:res.tempFilePaths[0],
							name:'upload',
							success: (response) => {
								if(response.statusCode==200){
							
								this.imgUrl.push(JSON.parse(response.data).url)
								this.commentId=JSON.parse(response.data).Id
								// this.imgUrl[index]=res.tempFilePaths[0]
								}
							}
						})
						
						}
					})
				}
			},
			comfirmComment(){
				
				uni.showModal({
					title:'选择评论角色：',
					content:this.$store.state.userInformation.username==undefined?'还未选择当前用户，系统将默认为匿名评论':'您确定使用'+this.$store.state.userInformation.username+'参与评论吗',
					cancelText:'否',
					confirmText:'是',
					success: (res) => {
						
						if(res.confirm!=undefined){
							this.commitComment()
							
						}else if(res.cancel!=undefined){
							return;
						}
						
					}
				})
			},
			commitComment(){
				let userid=this.$store.state.userInformation.Id==undefined?'':this.$store.state.userInformation.Id
				let commentData={
					Id:this.commentId,
					servernum:this.servernum,
					tastynum:this.tastynum,
					packnum:this.packnum,
					distributionnum:this.distributionnum,
					context:this.context,
					businessId:this.addComments.business.Id,
					typeId:this.addComments.menu.fk_list,
					menuId:this.addComments.menu.Id,
					orderId:this.addComments.Id,
					userId:userid,
					imgUrl:this.imgUrl.toString()
				}
				uni.request({
					url:config.server+'/postComment',
					data:commentData,
					method:'POST',
					success: (res) => {
						if(res.statusCode==200){
							uni.showToast({
								title:'提交成功！',
								icon:'none',
								success: (response) => {
									this.addflag=false
									this.getCommentData()
								}
							})
						}else if(res.statusCode==500){
							uni.showToast({
								title:'订单已经评论',
								icon:'none',
								success: (response) => {
									// this.addflag=false
									// this.getCommentData()
								}
							})
						}
						
						
					},
					fail: (err) => {
						
					}
				})
				
				
			},
			server(value){
				this.servernum=value.value
			},
			tasty(value){
				this.tastynum=value.value
			},
			pack(value){
				this.packnum=value.value
			},
			distribution(value){
				this.distributionnum=value.value
			},
			getCommentData(){
				let businessId=''
				if(this.addComments.business!=undefined){
					businessId=this.addComments.business.Id
				}else{
					businessId=this.business.Id
				}
				
				uni.request({
					url:config.server+'/getCommentList?businessId='+businessId,
					success: (res) => {
						
						this.commentLists=res.data.result
						
					}
				})
			}
		},
		// watch:{
		// 	"$store.state.userInformation":function(val,oval){
				
		// 	}
		// }
		// mounted() {
			
			
		// },
		onShow() {
			this.userInformation=this.$store.state.userInformation
			console.log(this.userInformation)
			uni.setNavigationBarTitle({
				title:'评价区'
			})
			if(this.addcomment!=undefined){
				this.addflag=this.addcomment
				
				this.getCommentData()
			}
		},
		filters:{
			getStartNum(num){
				if(num>=4){
					return '超赞'
				}
				else if(num>=3&&num<4){
					return '赞'
				}else if(num>=2&&num<3){
					return '差'
				}else if(num>=0&&num<2){
					return '超差'
				}
				else{
					return '未评分'
				}
			},
			getSize(size){
				if(size=='s'){
					return '小份'
				}
				if(size=='m'){
					return '中份'
				}
				if(size=='l'){
					return '大份'
				}
			}
		},
		onLoad(data) {
			
			// 判断是否从评价过来的
			if(data.addcomment=='t'){
				this.addflag=true
				uni.request({
					url:config.server+'/getCommentItem?orderId='+data.orderId,
					method:'GET',
					success: (res) => {
						
						this.addComments=res.data.results
					},
					fail: (err) => {
						
					}
				})
			}
		},
		components:{
			uniRate
		}
	}
</script>

<style scoped>
.commentItem{
	margin: 20rpx;
	padding:10rpx;
	background-color: #f6f6f6;
}
.comment-row{
	display: flex;
	flex-direction: row;
}
.comment-row-star{
	display: flex;
	flex-direction: row;
	align-items: center;
}

.comment-user{
	flex: 1;
	text-align: center;
	font-size: 24rpx;
	color: #888;
}
.comment-user-icon{
	width: 100rpx;
	height: 100rpx;
	border-radius: 60rpx;
}

.comment-time{
	font-size: 20rpx;
	color: #888;
	line-height: 40rpx;
}


.comment-flag{
	font-size: 18rpx;
	color: #888;
	background-color: #eef;
	padding: 10rpx;
	border-radius: 10rpx;
	margin-right: 10rpx;
}
.comment-content{
	font-size: 28rpx;
	color: #333;
	line-height: 60rpx;
}
.comment-img{
	width: 200rpx;
	height: 160rpx;
	margin: 10rpx;
}
.comment-menu{
	flex: 2;
	font-size: 20rpx;
	color: #888;
	align-items: center;
}
.comment-menu-name{
	background-color: #eef;
	line-height: 40rpx;
	padding: 10rpx;
	border-radius: 10rpx
}
.comment-title{
	flex: 1;
	font-size: 36rpx;
	color: #333;
}
</style>
