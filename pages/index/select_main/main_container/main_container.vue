<template>
		<view class="main_contain">
			<!-- 菜品类型 -->
			<scroll-view scroll-y="true" class="menu_types">
				<!-- #ifdef APP-PLUS||H5 -->
				<!-- @click="gotoLocate(item.soup_index)" -->
				<view  :class="['menu_types_item',soup_chose==('soup_chose'+item.soup_index)?'soup_chose':'']" :id="item.soup_index" v-for="(item ,index) in menu_detail_list" :key="index">
					{{item.name}}
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<!--  @bindtap="gotoLocate(item.soup_index)" -->
				<view :class="['menu_types_item',soup_chose==('soup_chose'+item.soup_index)?'soup_chose':'']" :id="item.soup_index" v-for="(item ,index) in menu_detail_list" :key="index">
					{{item.name}}
				</view>
				<!-- #endif -->
			</scroll-view>
			<!-- 菜名 -->
			<scroll-view scroll-with-animation="true" scroll-y="true" class="menu_detail" :scroll-into-view="srollId" >
				<view   v-for="(item ,index) in menu_detail_list" :key="item.soup_index" :id="item.soup_index">
					<view style="padding-left: 2vw;font-size: 36rpx;line-height: 72rpx;">{{item.name}}</view>
					<view class="menu_detail_item" :class="srollId==('menu_detail'+item.soup_index+v.index)?'type_chose':''" @click.stop="goDetail(item.soup_index,v)" v-for="(v,i) in item.soups_list" :id="v.index" :key="i">
						<image :src="v.imgUrl" style="width: 26vw;height: 24vw;border-radius: 2vw;"></image>
						<view class="menu_detail_item_right">
							<view class="menu_detail_item_title">{{v.label}}</view>
							<view class="menu_detail_item_text">材料：{{v.decorations}}</view>
							<view class="menu_detail_item_text">月售：{{v.sold}}</view>
							<view  class="menu_detail_item_price"><text>￥{{v.price.s}}</text><text class="menu_detail_item_oldprice">￥{{v.price_old.s}}</text>
							<image  class="menu_detail_item_size"  @click.stop="showSheet(v,true)" src="../../../../static/imgs/add.png"></image>
							</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				srollId:'',
				soup_chose:'',
				menu_detail_list:[
					// 汤类
					{
						soup_index:"1",
						name:'粿类',
						soups_list:[
						{
							index:'1',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:10,m:13,l:15},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
						{
							index:'2',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:10,m:13,l:15},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
						{
							index:'3',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:10,m:13,l:15},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
					],
					},
					// 汤类
					{
						soup_index:"2",
						name:'面类',
						soups_list:[
						{
							index:'1',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
						{
							index:'2',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
						{
							index:'3',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
					],
					},
					// 汤类
					{
						soup_index:"3",
						name:'套餐',
						soups_list:[
						{
							index:'1',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
						{
							index:'2',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
						{
							index:'3',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
					],
					},
					// 汤类
					{
						soup_index:"4",
						name:'菜汤',
						soups_list:[
						{
							index:'1',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
						{
							index:'2',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
						{
							index:'3',label:'云吞',imgUrl:'../../../../static/imgs/swiper/hygz_01.jpg',
							price_old:{s:15,m:18,l:22},price:{s:12,m:15,l:20},sold:'21',
							decorations:'猪肉，青菜，香料，火腿，面条',specific:['s','m','l'],suplus:'12'
						},
					],
					},
						
				]
			}
		},
		onLoad(data) {
			console.log(data.type_index,data.index)
			if(data.type_index!=undefined&&data.index!=undefined){
				this.srollId='menu_detail'+data.type_index+data.index
				this.soup_chose='soup_chose'+data.type_index
				// this.type_chose=true
			}
		},
		methods: {
			goDetail(index,item){ //index==type_index
				this.srollId='menu_detail'+index+item.index
				this.soup_chose='soup_chose'+index
				console.log(index,item)
				uni.navigateTo({
					url:'../detail/detail?item='+JSON.stringify(item)
				})
			},
			gotoLocate(index){
				this.srollId='menu_detail'+index
				this.soup_chose='soup_chose'+index
			},
			showSheet(value,flag){
				this.showShell=true //打开购物车
				if(value==0){
					this.selected_item={} //为了清楚购物车上边数据
					return;
				}
				this.selected_item=value
				this.$store.commit('initGoods',this.selected_item)
				console.log(value)
				
			},
		}
	}
</script>

<style scoped>
.main_contain{
	margin-top: 20rpx;
	width: 100%;
	display: flex;
	flex-direction: row;
}
.menu_types{
	height: 65vh;
	flex: 1;
	background-color: #EEEEEE;
	
}
.menu_types_item{
	font-size: 28rpx;
	color: #333333;
	line-height: 64rpx;
	padding:10rpx;
}
.soup_chose{
	background-color: #FFFFFF;
}
.menu_detail{
	flex: 3;
	height: 65vh;
}
.menu_detail_item{
	display: flex;
	flex-direction: row;
	padding:10rpx 20rpx;
	
}
.menu_detail_item_right{
	margin-left: 20rpx;
	width: 32vw;
}
.menu_detail_item_title{
	color: #000;
	font-size: 32rpx;
	/* font-weight: bold; */
	line-height: 56rpx;
	
}
.menu_detail_item_text{
	font-size: 26rpx;
	color: #aaa;
	line-height: 44rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	/* word-wrap: break-word; */
}
.menu_detail_item_price{
	font-size: 30rpx;
	color: #FF0000;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.menu_detail_item_oldprice{
	font-size: 24rpx;
	color: #aaa;
	text-decoration: line-through;
	margin: 0rpx 20rpx;
}
.menu_detail_item_size{
	/* font-size: 30rpx;
	background: #007AFF;
	color: #fff;
	padding: 5rpx 14rpx;
	border-radius: 24rpx; */
	width: 50rpx;
	height: 50rpx;
	margin-left: 10rpx;
}
</style>
