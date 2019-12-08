import Vue from 'vue'
import {fetch,post} from './ajax.js'
import utils from './util.js'

// Object.keys(request).forEach((item) => {
// 	Vue[`__${item}`] = Vue.prototype[`__${item}`] = request[item]
// })

Object.keys(utils).forEach((item) => {
	Vue[`__${item}`] = Vue.prototype[`__${item}`] = utils[item]
})
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
