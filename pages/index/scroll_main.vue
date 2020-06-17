<template>
	<scroll-view scroll-y="true" class="container">
		<swiper autoplay="true" indicator-dots="true" class="swiper_contain">
			<swiper-item v-for="(item,index) in swiperItem_detail" :key="index">
					<image :src="item.urlImg" class="swiper_image" @click.stop="go_detail(item)"></image> 
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view v-for="(item,index) in detail_lists" :key="index">
				<view class="detail_lists_title">
					<text>{{item.type_name}}</text>
					<!-- <text v-show="item.more!==''" @click="go_detail(item)" style="text-decoration: underline;color: #007AFF;">更多</text> -->
				</view>
				<scroll-view scroll-x="true" class="list_item" v-show="item.result_list_arr.length!==0">
					<view @click.stop="go_detail(it,item.onlyIndex)" class="list_block" v-for="(it,i) in item.result_list_arr" :key="i">
						<image class="detail_lists_image" :src="config.rescourceServer+it.menu_img"></image>
						<view class="list_item_title">
							<text class="list_item_font">{{it.name}}</text>
							<!-- <text class="dis_style">{{it.discounted===''?'':it.discounted+'折'}}</text> -->
						</view>
						<view>
							<text class="dis_style">￥{{it.price_type.s=='-1'?(it.price_type.m=='-1'?it.price_type.l:it.price_type.m):it.price_type.s}}</text>
							<text style="font-size: 20rpx;color: #ccc;text-decoration: line-through;">￥{{it.price_type.old_s=='-1'?(it.price_type.old_m=='-1'?it.price_type.old_l:it.price_type.old_m):it.price_type.old_s}}</text>
						</view>
						<view class="detail_dec">
							{{it.decorations}}
						</view>
					</view>
				</scroll-view>
			<view v-show="item.result_list_arr.length===0" style="text-align: center;font-size: 26rpx;color: #CCCCCC;line-height: 60rpx;">暂无未发布该食品类型，敬请期待！</view>
		</view>
		
		<view @click="hidden_modal" v-show="onload_modal" class="onload_modal">
			<image @click.stop="cellect_dis" class="onload_modal_img" :src="discounted_today.img"></image>
		</view>
	</scroll-view>
</template>

<script>
	import config from '../../static/config.js'
	export default {
		name:'scroll_main',
		data() {
			return {
				config:config,
				onload_modal:false,
				discounted_today:{
					img:'../../static/imgs/swiper/hygz_01.jpg'
				},
				scroll_dir:true,
				swiperItem_detail:[
					{name:'洪阳果汁',index:'1',urlImg:'../../static/imgs/swiper/hygz_01.jpg',path_url:'',decoration:'美味忘不掉，今天到店享受八折优惠',discounted:'8.8'},
					{name:'捞面',index:'2',urlImg:'../../static/imgs/swiper/lm_01.jpg',path_url:'',decoration:'',discounted:''},
				],
				detail_lists:[]
			}
		},
		methods: {
			go_detail(item,index){
				uni.navigateTo({
					url:'./select_main/select_main?type_index='+index+'&index='+item.onlyIndex
				})
			},
			hidden_modal(){
				this.onload_modal=!this.onload_modal
			},
			cellect_dis(){
				// console.log('hello')
				this.onload_modal=false
				uni.navigateTo({
					url:'activities/activities'
				})
			}
		},
		mounted() {
			console.log(config)
			uni.request({
				method:'GET',
				url:config.server+'/getProduct',
				success: (res) => {
					this.detail_lists=res.data.result_type
					this.$store.dispatch('setBusiness',res.data.business)
					
				}
			})
		}
	}
</script>

<style scoped>
	.container {
		padding: 2vw;
		width: 96vw;
		height: 100vh;
	/* 	width: 100vw;
		overflow-x: hidden; */
	}
	.swiper_contain{
		width: 100%;
		height: 30vh;
	}
	.swiper_image{
		height: 100%;
		width: 100%;
	}
	/* list样式 */
	
	.detail_lists_title{
		font-size: 36rpx;
		padding: 20rpx;
		color: #333;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
		border-bottom: 1px solid #ccc;
		/* width: 90vw; */
	}
	.list_item{
	white-space: nowrap;
	overflow-x:hidden;
	width: 100%;
	}
	.list_block{
		display: inline-block;
		font-size: 32rpx;
		margin-right: 20rpx;
		width:30vw;
	}
	.detail_lists_image{
		height: 20vw;
		width: 100%;
	}
	.detail_dec{
		font-size: 20rpx;
		color: #888;
		width: 30vw;
		text-overflow: ellipsis;
		white-space:nowrap;
		overflow-x: hidden;
		/* word-wrap:break-word; */
	}
	.list_item_title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.list_item_font{
		/* flex: 5; */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow-x: hidden;
	}
	.dis_style{
		/* flex: 1; */
		font-size: 28rpx;
		color: #ff0000;
		/* margin-right: 6rpx; */
	}
	.onload_modal{
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100vw;
		height: 100vh;
		background-color: rgba(60,60,60,0.6);
		z-index: 1900;
	}
	.onload_modal_img{
		position: fixed;
		width: 80vw;
		height: 60vh;
		top: 15vh;
		left: 10vw;
		z-index: 2000;
	}
</style>
