import Vue from 'vue'
import App from './App'
import store from './pages/store/store'
Vue.config.productionTip = false
Vue.prototype.$store=store
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
