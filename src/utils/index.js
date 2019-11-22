import Vue from 'vue'
import request from './ajax.js'
import utils from './util.js'

Object.keys(request).forEach((item) => {
	Vue[`__${item}`] = Vue.prototype[`__${item}`] = request[item]
})

Object.keys(utils).forEach((item) => {
	Vue[`__${item}`] = Vue.prototype[`__${item}`] = utils[item]
})
