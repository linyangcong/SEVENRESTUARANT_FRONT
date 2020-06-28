<template>
	<view>
		<!-- 查询所有 店铺菜单 -->
		<view  v-show="$store.state.userInformation.role=='01'">
			<view @click.stop="goShopping(item)" v-for="(item,index) in detail_lists" :key="index" style="display: flex;flex-direction: row;,align-items: flex-start;border-bottom: 1px solid #CCCCCC;margin: 10rpx;padding: 20rpx 0rpx;">
				<image  :src="config.rescourceServer+item.urlImg" style="width: 160rpx;height: 160rpx;flex: 1;"></image>
				<view style="margin-left: 20rpx;flex: 2;font-size: 24rpx;line-height: 40rpx;">
					<view style="font-size: 30rpx"  class="businessItem">店铺名称：{{item.business_name}}</view>
					<view  class="businessItem">地址：{{item.address}}</view>
					<view  class="businessItem">联系电话：{{item.phoneNo}}</view>
					<view  class="businessItem">配送费：￥{{item.delFee}}</view>
				</view>
			</view>
		</view>
		
		<!-- 查询自家店铺菜单 -->
		<view  v-show="$store.state.userInformation.role=='02'">
			<view @click.stop="goShopping(item)" v-for="(item,index) in detail_lists" :key="index" style="display: flex;flex-direction: row;,align-items: flex-start;border-bottom: 1px solid #CCCCCC;margin: 10rpx;padding: 20rpx 0rpx;">
				<image  :src="config.rescourceServer+item.urlImg" style="width: 160rpx;height: 160rpx;flex: 1;"></image>
				<view style="margin-left: 20rpx;flex: 2;font-size: 24rpx;line-height: 40rpx;">
					<view style="font-size: 30rpx"  class="businessItem">店铺名称：{{item.business_name}}</view>
					<view  class="businessItem">地址：{{item.address}}</view>
					<view  class="businessItem">联系电话：{{item.phoneNo}}</view>
					<view  class="businessItem">配送费：￥{{item.delFee}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goShopping(item){
				console.log(item)
				this.$store.dispatch('setbusiness',item)
				uni.navigateTo({
					url:'select_main/select_main'
				})
			},
		}
	}
</script>

<style>

</style>
