import Vue from 'vue'
import App from './App.vue'
import router from './router'
import utils from './utils/utils'
Vue.config.productionTip = false

Vue.prototype.$utils = utils;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
