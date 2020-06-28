import Vue from 'vue'
import App from './App'
import store from './pages/store/store'
import share from 'pages/mixins/share.js'
Vue.config.productionTip = false
Vue.prototype.$store=store
Vue.mixin(share)
App.mpType = 'app'
const app = new Vue({
	...App,
	store,
	
})
app.$mount()
