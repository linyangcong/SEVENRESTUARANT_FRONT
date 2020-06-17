import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		order:[
			{
			shopDetail:{},
			goodsId:'',
			name:'',
			price:{},
			count:0.00,
			old_count:0.00,
			num:0,
			size:'',
			size_type:[]
		},
		],
		userInformation:{},
		//购物车
		shopping:[],
		sums:0,
		old_sums:0
	},
	getters:{
		getOrder:state=>{
			return state.order[0]
		}
	},
    mutations: {
		initGoods(state,goodsItem){
			console.log(goodsItem)
			state.order[0].name=goodsItem.name
			state.order[0].goodsId=goodsItem.onlyIndex
			state.order[0].price=goodsItem.price_type
			// state.order[0].old_price=goodsItem.old_price
			state.order[0].size_type=goodsItem.size_type
			state.order[0].num=1
			if(goodsItem.size_type.indexOf('s')!=-1){
				state.order[0].size='s'
				state.order[0].count=goodsItem.price_type.s*1
				state.order[0].old_count=goodsItem.price_type.old_s*1
				return;
			}
			if(goodsItem.size_type.indexOf('m')!=-1){
				state.order[0].size='m'
				state.order[0].count=goodsItem.price_type.m*1
				state.order[0].old_count=goodsItem.price_type.old_m*1
				return;
			}
			if(goodsItem.size_type.indexOf('l')!=-1){
				state.order[0].size='l'
				state.order[0].count=goodsItem.price_type.l*1
				state.order[0].old_count=goodsItem.price_type.old_l*1
				return;
			}
			
		},
		setShopDetail(state,unload){
			state.order[0].shopDetail=unload
		},
		addGoods(state,upload){
			state.order[0].goodsId=upload
		},
		removeGoods(state,index){
		},
	addnum(state){
		state.order[0].num++
	},
	decnum(state){
		if(state.order[0].num<=1) return;
		state.order[0].num--
	},
		chooseSize(state,obj){
				state.order[0].size=obj.size
				switch(obj.size){
					case 's':
					state.order[0].count=state.order[0].num*obj.item.price_type.s;
					state.order[0].old_count=state.order[0].num*obj.item.price_type.old_s
					;break;
					case 'm': 
					state.order[0].count=state.order[0].num*obj.item.price_type.m;
					state.order[0].old_count=state.order[0].num*obj.item.price_type.old_m
					;break;
					case 'l': 
					state.order[0].count=state.order[0].num*obj.item.price_type.l;
					state.order[0].old_count=state.order[0].num*obj.item.price_type.old_l
					;break;
					default: break;
				}
	},
	addShoppingOp(state,detail){
		// state.order[0].detail=detail
		let detailObj={
			detail,
			...state.order[0]
		}
		state.shopping=[
			detailObj,
			...state.shopping
			
		]
	},
	allSum(state){
		if(state.shopping.length<=0){state.sum='0';return} 
		let sums=0,old_sums=0
		state.shopping.map(item=>{
			sums+=item.count
			old_sums+=item.old_count
		})
		state.sums=sums
		state.old_sums=old_sums
		
	},
	shoppingNum_add(state,index){
		state.shopping[index].num++
		state.shopping[index].count=state.shopping[index].num*state.shopping[index].price[state.shopping[index].size]
		state.shopping[index].old_count=state.shopping[index].num*state.shopping[index].price[state.shopping[index].size]
		
	},
	shoppingNum_dec(state,index){
		if(state.shopping[index].num<=1) return;
		state.shopping[index].num--
		state.shopping[index].count=state.shopping[index].num*state.shopping[index].price[state.shopping[index].size]
		state.shopping[index].old_count=state.shopping[index].num*state.shopping[index].price[state.shopping[index].size]
		
	},
	changeSize(state,index_size){
		console.log(state.shopping[index_size.index],state.shopping[index_size.index].size)
		state.shopping[index_size.index].size=index_size.size
		state.shopping[index_size.index].count=state.shopping[index_size.index].num*state.shopping[index_size.index].price[state.shopping[index_size.index].size]
		state.shopping[index_size.index].old_count=state.shopping[index_size.index].num*state.shopping[index_size.index].price['old_'+state.shopping[index_size.index].size]
	},
	setuserInformation(state,unload){
		state.userInformation=unload
	},
	},
    actions: {
		setUser(context,unload){
			context.commit('setuserInformation',unload)
		},
		setBusiness(context,shopDetail){
			context.commit('setShopDetail',shopDetail)
		},
		changeSize_goods(context,obj){  //obj={timestamp,size}
			context.state.shopping.map((item,index)=>{
				if(item.goodsId==obj.goodsId){
					context.commit('changeSize',{index,size:obj.size})
					return ;
				}
			})
			context.commit('allSum')
		},
		operate_shoppingNum_add(context,upload){
			context.state.shopping.map((item,index)=>{
				if(item.goodsId==upload){
					context.commit('shoppingNum_add',index)
					return;
				}
			})
			context.commit('allSum')
		},
		operate_shoppingNum_dec(context,upload){
			context.state.shopping.map((item,index)=>{
				if(item.goodsId==upload){
					context.commit('shoppingNum_dec',index)
					return;
				}
			})
			context.commit('allSum')
		},
		addShopping(context,detail){
			// 产生订单号时间戳
			context.commit('addGoods',new Date().getTime())
			context.commit('addShoppingOp',detail)
			context.commit('allSum')
		},
		addNum(context,goodsItem){
			context.commit('addnum')
			context.commit('chooseSize',{size:context.state.order[0].size,item:goodsItem})
		},
		decNum(context,goodsItem){
			context.commit('decnum')
			context.commit('chooseSize',{size:context.state.order[0].size,item:goodsItem})
		},
		
	}
})
export default store