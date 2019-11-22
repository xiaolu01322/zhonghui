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

const APIs = {
    
	// 公共首页
    'appList': '/app/list',
    
}

// let isDebug = process.env.NODE_ENV !== 'production';

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，等需要
 */
const ajax = function (type, url, data, fn, errorfn, noloading) {
	let datas, config;
	var source = CancelToken.source();
	// source.cancel(); //终止请求

	if(typeof data == 'function'){
		fn = data;
		data = {};
	}
	if(typeof errorfn == 'boolean'){
		noloading = errorfn;
		errorfn = null;
	}

	if (type === 'get') {
		datas = {
			params: data
		};
		//canceltoken得写在datas后面
		Object.assign(datas, {cancelToken: source.token});

	} else {
		// post 还不能取消
		// datas = Qs.stringify(data);
		datas = data;
		config = { cancelToken: source.token }; //also see: https://github.com/axios/axios/issues/1074
		// config.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
		// config.headers['Content-Type'] = 'application/json';
	}
	if(!noloading){
		loadingCount++
		if(!loadingObj){
			loadingObj = Loading.service({
				// lock: true,
				text: '',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0)'
			})
		}
	}

	Vue.axios[type](url, datas, config).then((res) => {
        loadingCount--
		if(loadingCount == 0 && loadingObj){
			loadingObj.close()
			loadingObj = null
		}

		if (Number(res.data.code) === 0) {
			fn && fn(res.data.data)
		} else {
            if(Number(res.data.code) === 2000) {
                this.$store.commit('$_removeStorage');
                this.$router.push({path:'/login'});
            } else {
                errorfn && errorfn(res.data.message);
            }
        }
	}).catch((err) => {
		loadingObj.close();
		loadingObj = null;
		let msg;
		if(err.message && err.message.indexOf('timeout') > -1){
			msg = '查询需要的计算量过大，请适当减少数据量或减少查询维度';
		}else {
			msg = '服务错误，请刷新重试';
		}
		if(!axios.isCancel(err)){
			this.$alert(msg);
		}

		// errr时 重置loading相关
		loadingObj && loadingObj.close();
		loadingObj = null;
		loadingCount = 0;
	})
	return source;
}

axios.interceptors.request.use(
	config => {
		if(config.method == 'post'){
			//config.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
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
export default {
	getData (type, data, fn, errorfn, noloading) {
		return ajax.call(this, 'get', APIs[type], data, fn, errorfn, noloading)
	},
	postData (type, data, fn, errorfn,noloading) {
		return ajax.call(this, 'post', APIs[type], data, fn, errorfn, noloading)
	}
	// APIs
}
