<template>
	<view class='content'>
	  <view class='Main'>
	    <view>
	      <image src='../../static/imgs/swiper/hygz_01.jpg'></image>
	    </view>
	    <view>
	      <text>{{author.name}}</text>
	    </view>
	  </view>
	  <view  style="font-size: 26rpx;color: #FF0000;line-height: 60rpx;text-align: center;">
		  *目前该系统还在测试阶段暂不可使用
	  </view>
	  <view class='ahout_author'>
	    <text>{{author.decorations}}</text>
	    <text class='goReport' bindtap='goReport'>{{author.eMail}}</text>
	  </view>
	  <view class='ahout_author'>
	    <text>{{author.produce}}</text>
	    <text class='goReport' bindtap='goReport'>{{author.eMail}}</text>
	  </view>
	  
	  <view style="display: flex;flex-direction: row;align-items: center;justify-content: center;position: absolute;bottom: 0rpx;width: 90%;font-size: 30rpx;color: #AAAAAA">
		  <image style="width: 50rpx;height: 50rpx;" :src="config.rescourceServer+'/sevenRestuarant/IPC/ICP_icon.jpg'"></image>
		  <text>{{ICP}}</text>
	  </view>
	</view>
</template>

<script>
	import config from '../../static/config.js'
	export default {
		data() {
			return {
				config:config,
				author:{
				  name:'sevenRestuarant',
				  decorations:'该系统创作者由sevenPenguin所有，如有疑问可咨询:',
				  produce:"如果有什么问题，建议我希望您能联系我；以下是我的邮箱：",
				  eMail:'linyc_gd@163.com'
				},
				ICP:'粤ICP备20033097号'
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.content{
  height: 90vh;
  background: #eee;
  color: #333;
  padding: 20px;
}
.Main{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 50px;
}
.Main :first-child{
  width: 200px;
  height: 200px;
  border-radius: 100px;
}
.ahout_author{
  text-indent: 2rem
}
.goReport{
  text-decoration: underline;
  color: rgb(6, 159, 248);
}

</style>
