		export default{
		    data(){
		        return {
		                       //设置默认的分享参数
		            share:{
		                title:'七只企鹅',
		                path:'/pages/index/index',
		                imageUrl:'',
		                desc:'',
		                content:''
		            }
		        }
		    },
			// shareType(){
			// 	console.log(this.shopping)
				
			// 	let shareTitle=[]
			// 	this.shopping.map(item=>{
			// 		if(item.size=='s'){
			// 			shareTitle.push(item.name+"(小份)*"+item.num+"=￥"+item.count+"\n")
			// 		}else if(item.size=='m'){
			// 			shareTitle.push(item.name+"(中份)*"+item.num+"=￥"+item.count+"\n")
			// 		}else if(item.size=='l'){
			// 			shareTitle.push(item.name+"(大份)*"+item.num+"=￥"+item.count+"\n")
			// 		}
			// 	})
				
			// 	
			// 	onShareAppMessage({
			// 		title:'商家',
			// 		path:'/pages/index/index',
			// 		imageUrl:config.rescourceServer+this.shopping[0].detail.menu_img,
			// 		content:'大师傅的',
			// 		query:'1'
			// 	})
			// 
			// },
			
		    onShareAppMessage(res) {
		        return {
		            title:this.share.title,
		            path:this.share.path,
		            imageUrl:this.share.imageUrl,
		            desc:this.share.desc,
		            content:this.share.content,
		            success(res){
		                uni.showToast({
		                    title:'分享成功'
		                })
		            },
		            fail(res){
		                uni.showToast({
		                    title:'分享失败',
		                    icon:'none'
		                })
		            }
		        }
		    }
		}
		
			