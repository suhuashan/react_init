import axios from 'axios';
import { message } from 'antd';

// axios默认参数配置
axios.defaults.baseURL = 'http://localhost:8000/blog';
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

let pending = []; 
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for(let p in pending){
        if(pending[p].url === config.url) { 
            pending[p].clear();       
            pending.splice(p, 1); 
        }
    }
}

// window.addEventListener('hashchange',()=>{
//     for(let p in pending) {
//         pending[p].clear();       
//         pending.splice(p, 1); 
//     }
// })

axios.interceptors.request.use(config => {
    removePending(config);
    config.cancelToken = new cancelToken((c)=>{
        pending.push({ url: config.url, clear: c });  
    });
     return config;
})

axios.interceptors.response.use(res => {
    removePending(res.config);  
    return res;
})

const ajax = (option) => {
    let ajaxUrl = option.url;

    let ajaxMethod = option.method ? option.method.toLowerCase() : "get";
    var ajaxData = null;
    if (ajaxMethod === "get") {
        ajaxData = {params: option.data || {}};
    } else {
        ajaxData = {data: option.data || {}};
    }

    return new Promise(function (resolve, reject) {
        axios({
            url: ajaxUrl,
            type: 'json',
            method: ajaxMethod,
            headers: option.headers || {
                "content-type": "application/json"
            },
            ...ajaxData
        }).then((res) => {
            let data = res.data;

            if (res.status === 200 && data.code === 0) {
                resolve(res.data);
            } else {
                message.error(data.message || data.msg || "网络错误，请刷新重试");
                reject("fail: ", res);
            }
        }).catch((err) => {
            console.log("error: ", err);
            message.error("网络错误，请刷新重试");
            reject(err);
        });
    })
}

export default ajax;