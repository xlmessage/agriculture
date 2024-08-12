import axios from "axios";
// import qs from "qs";
axios.defaults.baseURL = ''

axios.defaults.baseURL = 'http://127.0.0.1:5173'

// axios.defaults.Authorization = ""


axios.defaults.headers.post["Content-Type"] = 'application/json'

//允许跨域携带cookie信息 
axios.defaults.withCredentials = true;

//设置超时 
axios.defaults.timeout = 15000;

axios.interceptors.request.use(config => { return config; }, error => { return Promise.reject(error); });

axios.interceptors.response.use(response => {
    if (response.status == 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    // alert(JSON.stringify(error), '请求异常', {
    //     confirmButtonText: '确定',
    //     callback: (action) => {
    //         console.log(action)
    //     }
    // });
});
export default {
    /** 
     *@param {String} url 
    * @param {Object} data 
    * @returns Promise 
    * */
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post', url,
                data: JSON.stringify(data),
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            });
        })
    },
    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: data,
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
};