import Vue from 'vue'
// import Qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {Loading} from 'element-ui'
Vue.use(VueAxios, axios)

axios.defaults.withCredentials=true;//让ajax携带cookie
// axios.defaults.timeout=600000;//10min超时

var CancelToken = axios.CancelToken,
	loadingCount = 0,
	loadingObj;



// let isDebug = process.env.NODE_ENV !== 'production';

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，等需要
 */


axios.interceptors.request.use(
	config => {
		if(config.method == 'post'){
			// config.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
			config.headers['Content-Type'] = 'application/json';
		}


		return config
	},
	err => {
		return Promise.reject(err)
	}
)

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */
// export default {
// 	getData (type, data, fn, errorfn, noloading) {
// 		return ajax.call(this, 'get', APIs[type], data, fn, errorfn, noloading)
// 	},
// 	postData (type, data, fn, errorfn,noloading) {
// 		return ajax.call(this, 'post', APIs[type], data, fn, errorfn, noloading)
// 	}
// 	// APIs

	
// }

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
	return new Promise((resolve,reject) => {
	  axios.get(url,{
		params:params
	  })
	  .then(response => {
		resolve(response.data);
	  })
	  .catch(err => {
		reject(err)
	  })
	})
  }
  
  
  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  
   export function post(url,data = {}){
	 return new Promise((resolve,reject) => {
	
	   axios.post(url,data)
			.then(response => {
			  resolve(response.data);
			},err => {
			  reject(err)
			})
	 })
   }

