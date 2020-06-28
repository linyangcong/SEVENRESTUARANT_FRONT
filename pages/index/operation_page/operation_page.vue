<template>
	<view style="padding: 20rpx;">
		<view v-if="type_modal" @click.stop="closeTypeChoose(0,'sheet')" style="background-color: rgba(20,20,20,0.5);width: 100vw;height: 100vh;position: fixed;left: 0rpx;top: 0rpx;z-index: 2000;text-align: center;">
		
			<view   v-if="itemSheet" style="position: fixed;left: 0rpx;bottom: 0rpx;background-color: #FFFFFF;width: 100vw;"> 
				<view  @click.stop="chooseTypeItem(item,'sheet')" :style="item.onlyIndex==choosetypeItem.onlyIndex?'background-color:#eee':''" style="padding: 20rpx 0rpx;color: #007AFF;" v-for="(item,index) in type_list" :key="item.onlyIndex">
					{{item.type_name}}
				</view>
			</view>
			
			<view @click.stop="" v-else
			style="background-color: #FFFFFF;display: flex;flex-direction: column;justify-content: center;position: fixed;top: 40vh;left: 10vw;right: 10vw;padding: 5vw;text-align: left;">
				<view style="margin: 20rpx 0rpx;">商品类型名称:</view>
				<input style="margin: 20rpx 0rpx;" v-model="newType" class="shopping_input" />
				<button @click.stop="createType" style="margin: 20rpx 0rpx;">提交</button>
			</view>
		</view>
		<view style="font-size: 36rpx;line-height: 100rpx;border-bottom: 1px solid #CCCCCC;">
			<text v-if="!editFlag">创建新商品</text>
			<text v-else>修改商品信息</text>
		</view>
		<view style="margin: 32rpx 0rpx;">
			<view class="shopping_item">
				<text style="flex: 1">商品类型</text>
				<view  @click.stop="chooseType('sheet')" class="shopping_select">
					{{createOBJ.type_name==''?'请选择商品类型':createOBJ.type_name}}
				</view>
				<view @click.stop="chooseType('type')" style="flex: 1;margin: 0rpx 10rpx;color: #007AFF;">创建类型</view>
				<!-- <input :disabled="true"  v-model="" placeholder="商品类型" /> -->
			</view>
			<view class="shopping_item">
				<text style="flex: 1">商品名称</text>
				<input class="shopping_input" v-model="createOBJ.name" placeholder="商品名称" />
			</view>
			<view class="shopping_item selectImg">
				<text style="flex: 1">上传图片</text>
				<view  style="flex: 3;text-align: left;line-height: 100%;"> 
					<image  :src="createOBJ.menu_img==''?'../../../static/imgs/addImg.png':config.rescourceServer+createOBJ.menu_img" style="height: 160rpx;width:160rpx" @click.stop="addOreditImg"></image>
					<!-- <image v-show="createOBJ.menu_img==''" src="../../../static/imgs/addImg.png" style="height: 160rpx;width:160rpx" @click.stop="addOreditImg(1)"></image> -->
					<!-- <view v-show="createOBJ.img==''" style="font-size: 140rpx;border: 1px solid #AAAAAA;width: 140rpx;height: 140rpx;line-height:140rpx;text-align: center; ;">+</view> -->
				</view>
				
				<!-- <input class="shopping_input" v-model="createOBJ.img" placeholder="商品图片" /> -->
			</view>
			<view class="shopping_item">
				<text style="flex: 1">商品型号</text>
				<view style="flex: 3;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
					<button style="height: 50rpx;line-height: 40rpx;font-size: 30rpx;" type="primary" :plain="!createOBJ.size_type.s"
					 @click.stop="selectSize('s')">小份</button>
					<button style="height: 50rpx;line-height: 40rpx;font-size: 30rpx;" type="primary" :plain="!createOBJ.size_type.m"
					 @click.stop="selectSize('m')">中份</button>
					<button style="height: 50rpx;line-height: 40rpx;font-size: 30rpx;" type="primary" :plain="!createOBJ.size_type.l"
					 @click.stop="selectSize('l')">大份</button>
				</view>
			</view>
			<view class="shopping_item" v-if="createOBJ.size_type.s">
				<text style="flex: 1">小份价格</text>
				<view style="flex:3;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					￥<input @change="priOrdisCh('s')" style="flex: 1;" class="shopping_input" v-model="createOBJ.price_type.old_s" placeholder="原价" />
					<!-- <view style="flex:2;display: flex;flex-direction: row;align-items: center;">
				</view> -->
					<text style="flex: 1;text-align: center;">打</text>
					<input @change="priOrdisCh('s')" style="flex: 1" class="shopping_input" type="text" v-model="discount.s" placeholder="折扣"/>
					<text style="flex: 1;text-align: center;">折剩</text>
					<text style="flex: 2;text-align: center;">￥{{createOBJ.price_type.s}}</text>
				</view>
			</view>
			<view class="shopping_item" v-if="createOBJ.size_type.m">
				<text style="flex: 1">中份价格</text>
				<view style="flex:3;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					￥<input @change="priOrdisCh('m')" style="flex: 1;" class="shopping_input" v-model="createOBJ.price_type.old_m" placeholder="原价" />
					<!-- <view style="flex:2;display: flex;flex-direction: row;align-items: center;">
				</view> -->
					<text style="flex: 1;text-align: center;">打</text>
					<input @change="priOrdisCh('m')" style="flex: 1" class="shopping_input" type="text" v-model="discount.m" placeholder="折扣"/>
					<text style="flex: 1;text-align: center;">折剩</text>
					<text style="flex: 2;text-align: center;">￥{{createOBJ.price_type.m}}</text>
				</view>
			
			</view>
			<view class="shopping_item" v-if="createOBJ.size_type.l">
				<text style="flex: 1">大份价格</text>
				<view style="flex:3;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					￥<input @change="priOrdisCh('l')" style="flex: 1;" class="shopping_input" v-model="createOBJ.price_type.old_l" placeholder="原价" />
					<!-- <view style="flex:2;display: flex;flex-direction: row;align-items: center;">
				</view> -->
					<text style="flex: 1;text-align: center;">打</text>
					<input @change="priOrdisCh('l')" style="flex: 1" class="shopping_input" type="text" v-model="discount.l" placeholder="折扣"/>
					<text style="flex: 1;text-align: center;">折剩</text>
					<text style="flex: 2;text-align: center;">￥{{createOBJ.price_type.l}}</text>
				</view>
			
			</view>
			<view class="shopping_item">
				<text style="flex: 1">主要成分</text>
				<input class="shopping_input" v-model="createOBJ.decorations" placeholder="主要成分" />
			</view>
		</view>
		
		<view style="margin: 30rpx 0rpx;padding-top:30rpx;border-top: #AAAAAA solid 1px;display: flex;flex-direction: row;align-items: center;">
			<button  @click.stop="saveEdit('insert')"style="flex: 1;" type="primary" plain="true" :disabled="editFlag">创建</button>
			<button @click.stop="saveEdit('update')" style="flex: 1;" type="primary" :disabled="!editFlag">保存</button>
		</view>
		
		<view style="font-size: 36rpx;line-height: 100rpx;border-bottom: 1px solid #CCCCCC;margin-top: 60rpx;display: flex;flex-direction: row;justify-content: space-between;">
			<text>历史商品列表</text>
			<text style="color: #007AFF;" @click.stop="newShopping">新建</text>
		</view>
		<view style="margin-top: 32rpx;">
			<view v-for="(it,i) in his_list" :key="it.onlyIndex">
				<view style="text-align: center;padding: 20rpx;background-color: #aaccee;color: #FFFFFF;">{{it.type_name}}</view>
			<view class="his_item" :style="index==editId?'background-color:#EEEEFE':''" 
			@click.stop="openEditSheet(item,index,it)" v-for="(item,index) in it.result_list_arr"  :key="item.onlyIndex">
				<image style="height: 36vw;width: 46vw;"  :src="config.rescourceServer+item.menu_img"></image>
				<view style="width: 60vw;font-size: 26rpx;color: #333;margin-left: 20rpx;">
					<view style="font-size: 32rpx;line-height: 70rpx;color: #000000;">{{item.name}}</view>
					<view>
						<text>商品归属：</text>
						<text style="color: #FF0000;">{{it.type_name}}</text>
					</view>
					<view>
						<view>
							<view v-if="item.size_type.s=='1'">
								<text>小份量：</text>
								<text style="color: #FF0000;">￥{{item.price_type.s=='-1'?'暂无标价':item.price_type.s}}</text>
								<text style="color: #AAAAAA;text-decoration: line-through;margin-left: 10rpx;">￥{{item.price_type.old_s=='-1'?'无':item.price_type.old_s}}</text>
							</view>
							<view v-if="item.size_type.m=='1'">
								<text>中等量：</text>
								<text style="color: #FF0000;">￥{{item.price_type.m=='-1'?'暂无标价':item.price_type.m}}</text>
								<text style="color: #AAAAAA;text-decoration: line-through;margin-left: 10rpx;">￥{{item.price_type.old_m=='-1'?'无':item.price_type.old_m}}</text>
							</view>
							<view v-if="item.size_type.l=='1'">
								<text>大份量：</text>
								<text style="color: #FF0000;">￥{{item.price_type.l=='-1'?'暂无标价':item.price_type.l}}</text>
								<text style="color: #AAAAAA;text-decoration: line-through;margin-left: 10rpx;">￥{{item.price_type.old_l=='-1'?'无':item.price_type.old_l}}</text>
							</view>
						</view>
						
					</view>
					<view >
						<text>主要成分：</text>
						<text >{{item.decorations}}</text>
					</view>
				</view>
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
				choosetypeItem:'',
				newType:'',
				type_modal:false,
				uploadurl:'',
				type_list:[],
				itemSheet:'',
				his_business:{},
				// chose:{
				// 	s:false,
				// 	m:false,
				// 	l:false,
				// },
				
				config:config,
				discount:{
					s:10,
					m:10,
					l:10
				},
				// discount_m:10,
				// discount_l:10,
				createOBJ: {
					type_name: '',
					name: '',
					menu_img: '',
					size_type:{
						s:false,
						m:false,
						l:false
					},
					price_type: {
						s:'0',
						m:'0',
						l:'0'
					},
					decorations: ''
				},
				editFlag:false,
				// discount: 10,
				// selectSizes: 's',
				editId:-1,
				his_list:[]
			}
		},
		methods: {
			createType(){
				this.itemSheet=false
				this.type_modal=false
				// this.newType=''
				
				uni.request({
					data:{newType_name:this.newType,newType_fk_type:this.his_business.Id},
					url:config.server+'/newType',
					method:'POST',
					success: (res) => {
					// 刷新页面
					this.initPage()
					}
				})
			},
			closeTypeChoose(val,flag){
				if(flag=='sheet'){
					if(val==0){
						this.type_modal=false
						this.itemSheet=''
						this.type_list=[]
					}
				}else{
					this.newType=''
				}
				
			},
			chooseTypeItem(Item,flag){
				if(flag=='sheet'){
				this.type_modal=true
				this.choosetypeItem=Item
				this.createOBJ.type_name=Item.type_name
				this.createOBJ.type_id=Item.onlyIndex
				this.createOBJ.menu_type=Item
				}else{
					
				}

			},
			chooseType(flag){
				
				if(flag=='sheet'){
					
					uni.request({
						// data:data,
						url:config.server+'/getShoppingType?businessId='+this.$store.state.userInformation.businessId,
						// method:'POST',
						success: (res) => {
						
						if(res.data.type.length==0){
							this.type_modal=false
							this.itemSheet=false
							uni.showToast({
								title:'您尚未添加商品类型',
								icon:'none'
							})
						}else{
							this.type_modal=true
							this.itemSheet=true
							this.type_list=res.data.type
						}
					
						}
					})
				}
				else if(flag=='type'){
					
					this.type_modal=true
					this.itemSheet=false
					
				}
				
				
			},
			saveEdit(flag){
				if(this.createOBJ.menu_img==''){
					uni.showToast({
						title:'请选择图片',
						icon:'none'
					})
					return;
				}
				let ind=-1
				if(this.createOBJ.size_type.s){
					this.createOBJ.size_type.s='1'
				}else{
					this.createOBJ.size_type.s='0'
					this.createOBJ.price_type.old_s='-1'
				}
				if(this.createOBJ.size_type.m){
					this.createOBJ.size_type.m='1'
				}else{
					this.createOBJ.size_type.m='0'
					this.createOBJ.price_type.m='-1'
					this.createOBJ.price_type.old_m='-1'
				}
				if(this.createOBJ.size_type.l){
					this.createOBJ.size_type.l='1'
				}else{
					this.createOBJ.size_type.l='0'
					this.createOBJ.price_type.l='-1'
					this.createOBJ.price_type.old_l='-1'
				}
				if(flag=='update'){
					this.submitData(this.createOBJ,'update')
				}
				else{
					this.submitData(this.createOBJ,'insert')
				}
				
				
			},
			submitData(data,flag){
				
				if(flag=='update'){
					
					uni.request({
						data:data,
						url:config.server+'/updateItem',
						method:'POST',
						success: (res) => {
						// 刷新页面
						this.initPage()
						this.editFlag=false
						
						}
					})
				}
				if(flag=='insert'){
					
					uni.request({
						data:data,
						url:config.server+'/insertItem',
						method:'POST',
						success: (res) => {
						// 刷新页面
						this.initPage()
						this.editFlag=false
						
						
						}
					})
				}
				this.newShopping()
			},
			initPage(){
				uni.request({
					method:'GET',
					url:config.server+'/getProduct?businessId='+this.$store.state.userInformation.businessId,
					success: (res) => { 
					
						this.his_list=res.data.result_type
						this.his_business=res.data.business
						if(this.his_list.length==0){
							uni.showToast({
								title:'您尚未添加商品类型',
								icon:'none'
							})
						}
					}
				})
			},
			newShopping(){
				this.editFlag=false
				this.createOBJ={
					type_name: '',
					name: '',
					menu_img: '',
					size_type:{
						s:false,
						m:false,
						l:false
					},
					price_type: {
						s:'0',
						m:'0',
						l:'0'
					},
					decorations: ''
				}
				// this.chose={
				// 	s:false,
				// 	m:false,
				// 	l:false
				// }
			},
			priOrdisCh(size){
				this.createOBJ.price_type[size]=(this.createOBJ.price_type['old_'+size]*(this.discount[size]/10)).toFixed(2)
			},
			addOreditImg(){
				if(this.createOBJ.type_id==''||this.createOBJ.type_id==undefined){
					uni.showToast({
						title:'请选择商品类型',
						icon:'none'
					})
					return;
				}
				if(this.createOBJ.menu_img!=''){
					uni.showToast({
						title:'仅可以上传一张图片',
						icon:'none'
					})
					return ;
				}
				uni.chooseImage({
					success: (res) => {
						uni.uploadFile({
							url:config.server+'/uploadFile?menu_Id='+this.createOBJ.type_id+'&Id='+this.createOBJ.Id,
							fileType:'image',
							filePath:res.tempFilePaths[0],
							name:'upload',
							success: (response) => {
								if(response.statusCode==200){
									this.createOBJ={
										...this.createOBJ,
										menu_img:JSON.parse(response.data).url
									}
									this.initPage()
								}
							}
						})
					},
					fail: (err) => {
						
					}
				})
			},
			selectSize(size) {
				this.createOBJ.size_type[size]=!this.createOBJ.size_type[size]
				
			},
			openEditSheet(item,index,it){
				uni.showActionSheet({
					itemList:['编辑','删除'],
					itemColor:'#007AFF',
					success: (res) => {
						
						if(res.tapIndex==0){
							// 编辑
							this.editId=index
							this.editFlag=true
			
							this.createOBJ={
								...item,
								type_name:it.type_name,
								type_id:it.onlyIndex,
								size_type:item.size_type,
								menu_type:it
							}
							if(this.createOBJ.size_type.s){
								this.discount.s=(this.createOBJ.price_type.s*10/this.createOBJ.price_type.old_s).toFixed(1)
							}
							if(this.createOBJ.size_type.m){
								this.discount.m=(this.createOBJ.price_type.m*10/this.createOBJ.price_type.old_m).toFixed(1)
							}
							if(this.createOBJ.size_type.l){
								this.discount.l=(this.createOBJ.price_type.l*10/this.createOBJ.price_type.old_l).toFixed(1)
							}
							
						}else{
							// 删除
							this.his_list.splice(index,1)
						}
					},
					fail: (err) => {
						
					}
				})
			}
		},
		filters:{
			getSize(size){
				if(size=='s')return '小份'
				if(size=='m')return '中份'
				if(size=='l')return '大份'
			}
		},
		mounted() {
			
			if(this.$store.state.userInformation.businessId==undefined){
				uni.navigateTo({
					url:'../login/login'
				})
			}else if(this.$store.state.userInformation.businessId==''||this.$store.state.userInformation.businessId==null){
				uni.navigateTo({
					url:'registerBusiness/registerBusiness'
					
				})
			}
			else{
				
				this.initPage()
			}
			
		}
	}
</script>

<style scoped>
	.shopping_item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		line-height: 80rpx;
	}

	.selectImg {
		line-height: 200rpx;
	}
.shopping_select{
	flex: 2;
	border: 1px solid #AAAAAA;
	border-radius: 10rpx;
	line-height: 60rpx;
	color: #888888;
	padding-left: 10rpx;
	/* padding: 10rpx; */
}
	.shopping_input {
		flex: 3;
		border: 1px solid #AAAAAA;
		border-radius: 10rpx;
		padding: 10rpx;
	}
	.his_item{
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		background-color: #F8F8F8;
		margin:20rpx 0rpx;
		overflow: hidden;
		height: 36vw;
/* 		padding: 20rpx; */
	}
</style>
