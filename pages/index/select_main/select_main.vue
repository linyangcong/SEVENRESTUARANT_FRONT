<template>
	<scroll-view scroll-y="true" style="height: 100vh;width: 100%;">
		<comp-detail v-if='showDetail' :detailItem='selected_item' @openShoppingSheet='showSheet' @goDetail='goDetail'></comp-detail>
		<view v-else='!showDetail'>
			<image style="width: 100%;height: 16vh;position: absolute;top: 0rpx;left: 0rpx;" src="../../../static/imgs/swiper/hygz_01.jpg"></image>
			<view class="head">
				<view class="head_title">{{business.business_name}}</view>
				<view class="head_flag"><text class="head_box">月售：2001</text><text class="head_box">可自取.2公里免配送费</text></view>
				<view class="head_address">地址：广东省揭阳普宁市流沙西街道103号</view>
			</view>
			<view class="main">
				<view>
					<text @click.stop="chooseTab(0)" class="choose_tab" :class="choos_tab?'choos_tab_style':''">点餐</text>
					<text @click.stop="chooseTab(1)" class="choose_tab" :class="!choos_tab?'choos_tab_style':''">评价</text>
				</view>
				<view class="main_contain">
					<!-- 菜品类型 -->
					<scroll-view scroll-y="true" class="menu_types">
						<view @click="gotoLocate(item.onlyIndex)" :class="['menu_types_item',soup_chose==item.onlyIndex?'soup_chose':'']"
						 :id="item.onlyIndex" v-for="(item ,index) in menu_detail_list" :key="item.onlyIndex">
							{{item.type_name}}
						</view>
					</scroll-view>
					<!-- 菜名 -->
					<scroll-view scroll-with-animation="true" scroll-y="true" class="menu_detail" :scroll-into-view="srollId">
						<view v-for="(item ,index) in menu_detail_list" :key="item.onlyIndex" :id="item.onlyIndex">
							<view style="padding-left: 2vw;font-size: 36rpx;line-height: 72rpx;">{{item.type_name}}</view>
							<view class="menu_detail_item" :class="srollId==v.onlyIndex?'type_chose':''"
							 @click.stop="goDetail(item.onlyIndex,v)" v-for="(v,i) in item.result_list_arr" :key="v.onlyIndex" :id="v.onlyIndex"
							 >
								<image :src="config.rescourceServer+v.menu_img" style="width: 26vw;height: 24vw;border-radius: 2vw;"></image>
								<view class="menu_detail_item_right">
									<view class="menu_detail_item_title">{{v.name}}</view>
									<view class="menu_detail_item_text">材料：{{v.decorations}}</view>
									<view class="menu_detail_item_text">月售：{{v.sold_count}}</view>
									<view class="menu_detail_item_price"><text>￥{{v.price_type.s==-1?(v.price_type.m==-1?v.price_type.l:v.price_type.m):v.price_type.s}}</text>
									<text class="menu_detail_item_oldprice">￥{{v.price_type.old_s==-1?(v.price_type.old_m==-1?v.price_type.old_l:v.price_type.old_m):v.price_type.old_s}}</text>
										<image class="menu_detail_item_size" @click.stop="showSheet(v,true)" src="../../../static/imgs/add.png"></image>
									</view>
								</view>
							</view>

						</view>
					</scroll-view>
				</view>
			</view>
		</view>


		<!-- 购物车下拉表 -->
		<view @click.stop="hidden_sheet" v-show="showShell" style="position: fixed;top: 0rpx;left: 0rpx;background-color: rgba(60,60,60,0.4);width: 100vw;height: 100vh;z-index: 500;">
			<scroll-view scroll-y="true"  @click.stop="" class="selected_flex_col" style="position: fixed;bottom: 0rpx;left: 0rpx;width: 100vw;height: 80vh;z-index: 600;background-color: #FFFFFF;padding: 20rpx;">
				<view>
					<view v-show="selected_item.Id!=undefined">
						<view class="selected_item_flex">
							<image :src="selected_item.menu_img!=undefined?(config.rescourceServer+selected_item.menu_img):'../../../static/imgs/add.png'" style="width: 30vw;height: 30vw;"></image>
							<view style="margin-left: 20rpx;display: flex;justify-content: space-around;flex-direction: column;">
								<view class="menu_detail_item_title">{{selected_item.name}}</view>
								<view class="menu_detail_item_text">已选择：{{$store.state.order[0].size|getSize}}</view>
								<view class="menu_detail_item_price">
									<text>￥{{$store.state.order[0].price[$store.state.order[0].size]|getPrice}}</text>
									<text class="menu_detail_item_oldprice">￥{{$store.state.order[0].price['old_'+$store.state.order[0].size]|getPrice}}</text>
								</view>
							</view>
						</view>
						<view class="selected_item_flex selected_item_body " style="margin: 20rpx 0rpx;">
							<view style="flex:4">数量</view>
							<view class="selected_item_flex" style="align-items: center;justify-content: space-between;flex:1">
								<image @click.stop="operate_num('dec')" src="../../../static/imgs/dec.png" class="ope_icon"></image>
								<text>{{$store.state.order[0].num|getPrice}}</text>
								<image @click.stop="operate_num('add')" src="../../../static/imgs/add.png" class="ope_icon"></image>
							</view>
						</view>
						<view class="">
							<view>规格</view>
							<view  class="selected_item_flex" style="align-items: center;justify-content: space-around;width: 96vw;text-align: center;">
								<text @click.stop="selected_size_meth(item)" :class="['selected_size',$store.state.order[0].size==item?'selected_size_chose':'']"
								 v-show="item!==''" :id="index" v-for="(item,index) in selected_item.size_type" :key="index">
									{{item|getSize}}
								</text>
							</view>
						</view>
					</view>


					<!-- 购物车 -->
					<comp-shopping :selected_item='selected_item'></comp-shopping>
				</view>
			</scroll-view>
		</view>

		<!-- 下边购物车结算提醒 -->
		<view class="shopping" @click.stop="showSheet(0,false)">
			<view style="flex: 1;text-align: center;">
				<image src="../../../static/imgs/waimai.png" style="height: 100rpx;width: 100rpx;"></image>
			</view>
			<view style="flex: 5;margin-left: 30rpx;">
				<view style="display: flex;flex-direction: row;align-items: flex-end;">
					<text style="color: #FF0000;font-size: 36rpx;">￥{{$store.state.shopping|getallcount}}</text>
					<text style="color: #AAAAAA;font-size: 20rpx;text-decoration: line-through;">￥{{$store.state.shopping|getallcount('old')}}</text>
				</view>
				<view class="menu_detail_item_text">免配送费</view>
			</view>
			<view style="flex: 4;">
				<button type="primary" @click.stop="goPay">结算</button>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import config from '../../../static/config.js'
	import compDetail from '../detail/detail'
	import compShopping from '../shopping_car/shopping_car'
	export default {
		data() {
			return {
				business:{},
				config:config,
				showDetail: false,
				soup_chose: '',
				type_chose: false,
				srollId: '',
				choos_tab: true,
				selected_item: {},
				showShell: false,
				// DetailItem:{},
				// selected_size:'s',
				// count:1,
				menu_detail_list: []
			}
		},
		components: {
			compDetail,
			compShopping
		},
		methods: {
			goPay() {
				// uni.showToast({
				// 	title: '暂不支持支付',
				// 	icon: 'none',
				// 	success: (res) => {
						
				// 	}
				// })
				
				if(this.$store.state.sums<=0){
					uni.showToast({
						title:'请选择商品再结算',
						icon:'none'
					})
					return;
				}
				else{
					uni.navigateTo({
						url:'../seeMap/seeMap'
					})
				}
				
				
				
				// uni.requestPayment({
				//     provider: 'weixin',
				//     orderInfo: 'orderInfo', //微信、支付宝订单数据
				// 	timeStamp:(new Date()).valueOf(),
				// 	nonceStr:Math.random()*10000000000000000,
				// 	package:'',
				// 	signType:'MD5'
				//     success: function (res) {
				//         console.log('success:' + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         console.log('fail:' + JSON.stringify(err));
				//     }
				// });
			},
			// showShell(){},
			
			
			operate_num(operation) {
				if (operation == 'add') {
					this.$store.dispatch('addNum', this.selected_item)
				} else {
					this.$store.dispatch('decNum', this.selected_item)
				}
			},
			selected_size_meth(size) {
				// this.selected_size=item
				this.$store.commit('chooseSize', {
					size: size,
					item: this.selected_item
				})
			},
			hidden_sheet() {
				this.showShell = false
				this.selected_item = {}
			},
			showSheet(value, flag) {
				this.showShell = true //打开购物车
				console.log(value)
				if (value == 0) {
					this.selected_item = {} //为了清楚购物车上边数据
					return;
				}
				this.selected_item = value
				// {
				// 	...value,
				// 	size_type:value.size_type.split(',')
				// }
				this.$store.commit('initGoods', this.selected_item)
				// console.log(this.$store.state.order)

			},
			goDetail(index, item) { //index==type_index
				if(index==undefined&&item==undefined){
					this.showDetail = false
				}else{
					this.srollId =item.onlyIndex
					this.soup_chose = index
					this.showDetail = true
					this.selected_item = item
				}
				// uni.navigateTo({
				// 	url:'../detail/detail?item='+JSON.stringify(item)
				// })
			},
			gotoLocate(index) {
				this.srollId = index
				this.soup_chose = index
			},
			chooseTab(flag) {
				if (flag == 0) {
					this.choos_tab = true
				} else {
					this.choos_tab = false
				}
			}
		},
		filters: {
			getallcount(list, flag) {
				let count = 0;
				if (flag == 'old') {
					list.map(item => {
						count += item.old_count
					})
				} else {
					list.map(item => {
						count += item.count
					})
				}
				return count
			},
			getSize(size){
				if (size == 's') return '小份';
				if (size == 'm') return '中份';
				if (size == 'l') return '大份';
			},
			getPrice(data){
				return data
			}
			
		},
		onLoad(data) {
			if (data.type_index != undefined && data.index != undefined) {
				// 'menu_detail'+item.soup_index+v.index
				console.log(data)
				this.srollId = data.index
				this.soup_chose =data.type_index
				// this.type_chose=true
			}
		},
		mounted() {
			uni.request({
				method:'GET',
				url:config.server+'/getProduct?flag=sizearr',
				success: (res) => {
					console.log(res.data)
					this.business=res.data.business
					this.menu_detail_list=res.data.result_type
					// this.menu_detail_list.map(item=>{
					// 	item.result_list_arr.map(it=>{
					// 		it,
					// 	})
					// })
				}
			})
		}
	}
</script>

<style scoped>
	.head {
		position: absolute;
		top: 8vh;
		width: 92vw;
		height: 18vh;
		padding: 2vw;
		margin: 2vw;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: #efefef 10rpx 10rpx;
		/* z-index: 100; */
	}

	.head_flag {
		line-height: 48rpx;

	}

	.head_title {
		line-height: 100rpx;
		font-size: 50rpx;
		color: #333333;
	}

	.head_box {
		font-size: 20rpx;
		color: #fff;
		font-weight: 600;
		margin-right: 10rpx;
		background-color: #007AFF;
		border-radius: 14rpx;
		padding: 4rpx 10rpx;
	}

	.head_address {
		font-size: 30rpx;
		line-height: 60rpx;
		color: #888;
		width: 80vw;


	}

	.main {
		position: absolute;
		top: 30vh;
		padding: 2vw;
		width: 96vw;
		/* z-index: 1000; */
	}

	.choose_tab {
		font-size: 26rpx;
		margin-right: 46rpx;
		padding: 6rpx 0rpx;
		/* font-weight: 600; */
	}

	.choos_tab_style {
		font-weight: bold;
		border-bottom: 4rpx solid #007AFF;
	}

	.main_contain {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.menu_types {
		height: 65vh;
		flex: 1;
		background-color: #EEEEEE;

	}

	.menu_types_item {
		font-size: 28rpx;
		color: #333333;
		line-height: 64rpx;
		padding: 10rpx;
	}

	.soup_chose {
		background-color: #FFFFFF;
	}

	.menu_detail {
		flex: 3;
		height: 58vh;
	}

	.menu_detail_item {
		display: flex;
		flex-direction: row;
		padding: 10rpx 20rpx;

	}

	.menu_detail_item_right {
		margin-left: 20rpx;
		width: 32vw;
	}

	.menu_detail_item_title {
		color: #000;
		font-size: 32rpx;
		/* font-weight: bold; */
		line-height: 56rpx;

	}

	.menu_detail_item_text {
		font-size: 26rpx;
		color: #aaa;
		line-height: 44rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* word-wrap: break-word; */
	}

	.menu_detail_item_price {
		font-size: 30rpx;
		color: #FF0000;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.menu_detail_item_oldprice {
		font-size: 24rpx;
		color: #aaa;
		text-decoration: line-through;
		margin: 0rpx 5rpx;
	}

	.menu_detail_item_size {
		width: 50rpx;
		height: 50rpx;
		margin-left: 10rpx;
	}



	.selected_item_flex {
		display: flex;
		flex-direction: row;

	}

	.selected_flex_col {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.selected_item_body {
		justify-content: space-between;
		align-items: center;
		width: 96vw;
	}

	.ope_icon {
		width: 40rpx;
		height: 40rpx;
	}

	.selected_size {
		background-color: #eee;
		flex: 1;
		padding: 10rpx 20rpx;
		margin: 10rpx 20rpx;
		font-size: 30rpx;
		color: #666;
	}

	.selected_size_chose {
		background-color: rgba(0, 122, 255, 0.2);
		color: #007AFF;
	}

	.type_chose {
		background-color: rgba(20, 230, 100, 0.1);
	}

	.shopping {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		background-color: rgba(255, 255, 255, 0.8);
		height: 10vh;
		width: 100vw;
	}
</style>
