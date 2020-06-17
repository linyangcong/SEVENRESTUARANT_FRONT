<template>
	<view class="detail_bg">
		<text @click.stop="goback" style="position: fixed;top: 100rpx;right: 5vw;font-size: 50rpx;z-index: 1000;color: #FFFFFF;background-color: rgba(150,150,150,0.4);padding: 2vw;">X</text>
		<image :src="detail.menu_img?(config.rescourceServer+detail.menu_img):'../../../static/imgs/notFound.jpg'" style="width: 100%;
		height: 40vh;"></image>
		<view >
			<view class="detail_titile">
				<view class="menu_detail_item_title ">{{detail.name}}</view>
				<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
					<view>
						<view class="menu_detail_item_text">月售：{{detail.sold_count}}</view>
						<view v-show="detail.price_type.s!=='-1'" class="menu_detail_item_price" >
							<text>小份：</text>
							<text style="color: #FF0000;">￥{{detail.price_type.s}}</text>
							<text class="menu_detail_item_oldprice">{{detail.price_type.old_s}}</text>
						</view>
						<view  v-show="detail.price_type.m!=='-1'" class="menu_detail_item_price" >
							<text>中份：</text>
							<text style="color: #FF0000;">￥{{detail.price_type.m}}</text>
							<text class="menu_detail_item_oldprice">{{detail.price_type.old_m}}</text>
						</view>
						<view  v-show="detail.price_type.l!=='-1'" class="menu_detail_item_price" >
							<text style="">大份：</text>
							<text style="color: #FF0000;">￥{{detail.price_type.l}}</text>
							<text class="menu_detail_item_oldprice">{{detail.price_type.old_l}}</text>
						</view>
					</view>
					<view @click.stop="selected_goods" style="font-size: 30rpx;color: #fff; background-color: #007AFF;border-radius: 40rpx;padding: 10rpx 20rpx;">选择规格</view>
				</view>
			</view>
			<view style="margin-top: 20rpx;" class="detail_titile">
				<view class="menu_detail_item_title">商品简介</view>
				<view class="menu_detail_item_text">主要原料：{{detail.decorations}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../../static/config.js'
	export default {
		data() {
			return {
				config:config,
				detail:{
					price_type:{
						s:0,
						old_s:0,
						m:0,
						old_m:0,
						l:0,
						old_l:0
					}
				}
			}
		},
		props:["detailItem"],
		methods: {
			// imgload(e){
			// 	console.log(e)
			// },
			// imgerror(e){
			// 	console.log(e)
			// },
			goback(){
				this.$emit('goDetail')
			},
			selected_goods(){
				this.$emit('openShoppingSheet',this.detail,true)
			}
		},
		onLoad() {
			// this.detail=JSON.parse(data.item)
			
		},
		mounted() {
			console.log(this.detailItem)
			this.detail=this.detailItem
		}
	}
</script>

<style scoped>
.detail_bg{
	background-color: #eee;
	height: 90vh;
}
.detail_titile{
	padding: 30rpx 10rpx;
	background-color: #fff;
	/* font-size: 30rpx; */
}

.menu_detail_item_title{
	color: #000;
	font-size: 32rpx;
	font-weight: bold;
	line-height: 56rpx;
	
}
.menu_detail_item_text{
	font-size: 22rpx;
	color: #aaa;
	line-height: 44rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	/* word-wrap: break-word; */
}
.menu_detail_item_price{
	font-size: 30rpx;
}
.menu_detail_item_oldprice{
	font-size: 20rpx;
	color: #aaa;
	text-decoration: line-through;
	margin: 0rpx 10rpx;
}
.menu_detail_item_size{
	font-size: 24rpx;
	background: #007AFF;
	color: #fff;
	padding: 5rpx 16rpx;
	border-radius: 17rpx;
	margin-left: 10rpx;
}
</style>
