<template>
	<view @click="unsupport" style="margin: 20rpx;background-color: #F8F8F8;border-top: 1px solid #CCCCCC;;">
		<view class="order_problem_list">
			配餐问题，联系商家？
		</view>
		<view  class="order_problem_list">
			收货问题，联系骑手？
		</view>
		<view  class="order_problem_list">
			其他问题，联系客服？
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
			unsupport(){
				uni.showToast({
					title:'暂不支持',
					icon:'none'
				})
			}
		}
	}
</script>

<style scoped>
.order_problem_list{
	font-size: 30rpx;
	color: #007AFF;
	padding: 20rpx;
	border-bottom: 1px solid #CCCCCC;
}
</style>
