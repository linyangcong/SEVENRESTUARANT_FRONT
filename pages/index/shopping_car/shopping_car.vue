<template>
	<view style="display: flex;flex-direction: column;justify-content: space-between;height: 100%;">
		<!-- 购物车 -->
		<view>
		<view style="margin-top: 30rpx;">购物车</view>
		<view style="font-size: 32rpx;display: flex;flex-direction: row;justify-content: space-between;align-items: center;padding: 10rpx 30rpx;border-bottom: #AAAAAA solid 1px;">
			<view style="flex: 2;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">商品名称</view>
			<view style="flex: 1;">价格</view>
			<view style="flex: 1;">规格</view>
			<view style="margin:0rpx 36rpx;flex: 1;">数量</view>
			<view style="flex: 1;">合计</view>
		</view>
		<scroll-view scroll-y="true" style="height: 26vh;">
			<!-- {index:'0',name:'商品名称',price:'价格',count:'数量',sum:'合计'}, -->
		
			<view v-show="$store.state.shopping.length!=0" style="font-size: 28rpx;display: flex;
			flex-direction: row;justify-content: space-between;
			align-items: center;padding: 10rpx 30rpx;
			border-bottom: #AAAAAA solid 1px;"
			 v-for="(item ,index) in $store.state.shopping" :key="index">
				<view style="flex: 2;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.detail.name}}</view>
				<view style="flex: 1;">￥{{item.price[item.size]}}</view>
				<view @click.stop="changeSize(item.goodsId)" style="flex: 1;color: #007AFF;text-decoration: underline;">{{item.size|getSize}}</view>
				<view style="flex: 1;align-items: center;display: flex;flex-direction: row;">
					<image @click.stop="operate_shopping_num('dec',item.goodsId)" style="height: 36rpx;width:36rpx" src="../../../static/imgs/dec.png"></image>
					<text style="margin:0rpx 5rpx;">{{item.num}}</text>
					<image @click.stop="operate_shopping_num('add',item.goodsId)" style="height: 36rpx;width:36rpx" src="../../../static/imgs/add.png"></image>
				</view>
				<view style="flex: 1;">￥{{item.count|getPrice}}</view>
			</view>
		
			<view v-show="$store.state.shopping.length==0" style="text-align: center;margin-top: 50rpx;color: #AAAAAA;">
				空空如也
			</view>
		</scroll-view>
		</view>
		
		<view class="" style="width: 96vw;display: flex;flex-direction: row;height: 100rpx;margin-bottom: 100rpx;">
			<button :disabled="selected_item==undefined||selected_item.Id==undefined" @click.stop="addShopping" type="primary" style="flex: 1;">加入购物车</button>
			<button :disabled="$store.state.sums<='0'" @click.stop="goPay" type="warn" style="flex: 1;display: flex;flex-direction: row;align-items: center;white-space: nowrap;overflow-x: hidden;" plain="true">
				<text>结算:</text>
				<text>￥{{$store.state.sums|getPrice}}</text>
				<text style="color:#AAAAAA;font-size: 28rpx;text-decoration: line-through;margin: 0rpx 10rpx;">￥{{$store.state.old_sums|getPrice}}</text>
				<text>元</text>
			</button>
		</view>
	</view>
</template>

<script>
	import config from '../../../static/config.js'
	export default {
		data() {
			return {
				config:config
				
			}
		},
		props:["selected_item"],
		methods: {
			goPay(){
				let count = 0.00,sum=0.0;
					this.$store.state.shopping.map(item => {
						count += item.count
					})
				sum=(parseFloat(this.$store.state.selectedBusiness.shopstartfee)-count).toFixed(2)
				// console.log(count,this.business.shopstartfee,sum)
				if(this.$store.state.sums<=0){
					uni.showToast({
						title:'结算异常',
						icon:'none'
					})
					return;
				}
				else if(sum>0){
					uni.showToast({
						title:'还差￥'+sum+'起送',
						icon:'none'
					})
					return;
				}
				else{
					uni.navigateTo({
						url:'../seeMap/seeMap',
					})
				}
			},
			operate_shopping_num(operation, timestamp) {
				// this.operate_num(operation)
				if (operation == 'add') {
					this.$store.dispatch('operate_shoppingNum_add', timestamp)
				} else {
					this.$store.dispatch('operate_shoppingNum_dec', timestamp)
				}
			},
			addShopping() {
				if (this.selected_item.Id == undefined) {
					return
				}
				this.$store.dispatch('addShopping', this.selected_item)
			},
			changeSize(goodid) {
				uni.showActionSheet({
					itemList: ['小分', '中等', '大分'],
					itemColor: '#007AFF',
					success: (res) => {
						let size = 0
						if (res.tapIndex == 0) size = 's'
						if (res.tapIndex == 1) size = 'm'
						if (res.tapIndex == 2) size = 'l'
						console.log(this.$store.state.order[0].size_type)
						if(this.$store.state.order[0].size_type.indexOf(size)<0){
							uni.showToast({
								title:'该型号已售空',
								icon:'none'
							})
							return ;
						}
						this.$store.dispatch('changeSize_goods', {
							goodsId: goodid,
							size
						})
					},
					fail: (res) => {
			
					}
				})
			
			},
		},
		filters: {
			// Vue.filter('getSize',function(size){
			// 	if (size == 's') return '小份';
			// 	if (size == 'm') return '中份';
			// 	if (size == 'l') return '大份';
			// })
			getSize(size){
				if (size == 's') return '小份';
				if (size == 'm') return '中份';
				if (size == 'l') return '大份';
			},
			getPrice(data){
				return data.toFixed(2)
			}
			
		}
	}
</script>

<style>

</style>
