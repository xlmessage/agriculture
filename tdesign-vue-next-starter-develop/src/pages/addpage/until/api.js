import axios from "./axios"
import request from "axios"
import { getdata } from './data'
const headers = {
    'Content-Type': 'application/json', // 设置 Content-Type 为 application/json
    // 其他自定义请求头
    'Authorization': localStorage.getItem("token")
}
// axios.defaults.headers.Authorization = localStorage.getItem("token")

export default {
    getClickDist (latlng) {
        let distList = {}
        // let data_url = "http://124.222/geoserver/JYS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JYS:fhwg&maxFeatures=50&outputFormat=application%2Fjson%20&filter=%3CFilter%20xmlns=%22http://www.opengis.net/ogc%22%20xmlns:gml=%22http://www.opengis.net/gml%22%3E%20%3CIntersects%3E%20%3CPropertyName%3Eshape%3C/PropertyName%3E%20%3Cgml:Point%3E%20%3Cgml:coordinates%3E106.30689,29.69887%3C/gml:coordinates%3E%20%3C/gml:Point%3E%20%3C/Intersects%3E%20%3C/Filter%3E"
        let data_url = `http://jyskg.riknow.cn//geoserver/JYS2023/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JYS2023:r_wg_xhwg_a&maxFeatures=50&outputFormat=application%2Fjson &filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"> <Intersects> <PropertyName>shape</PropertyName> <gml:Point> <gml:coordinates>${latlng}</gml:coordinates> </gml:Point> </Intersects> </Filter>`
        // distList = axios.get('http://jyskg.riknow.cn//geoserver/JYS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JYS:fhwg&maxFeatures=50&outputFormat=application%2Fjson &filter=<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"> <Intersects> <PropertyName>shape</PropertyName> <gml:Point> <gml:coordinates>' + latlng + '</gml:coordinates> </gml:Point> </Intersects> </Filter>')
        distList = axios.get(data_url)
            .then(res => {
                try {
                    return res.features
                } catch (error) {
                    console.log(error)
                    return []
                }
            })
            .catch(res => {
                console.log("获取数据错误")
            })
        // console.log(distList);
        return distList
    },
    getClickDist1 (latlng = "106.28105,29.72159") {
        let lat = latlng.split(",")[0]
        let lng = latlng.split(",")[1]
        const options = {
            method: 'POST',
            url: 'http://124.222.82.134:8888/xhwg/area',
            headers: {
                Authorization: localStorage.getItem("token"),
                // 'content-type': 'application/json'
            },
            data: {
                "geo": 'SRID=4490;MULTIPOINT(' + lat + ' ' + lng + ')'
            }
        }
        return request(options).then(res => {
            console.log(res)
            return res
        }).catch(function (error) {
            console.error(error)
        })
    },
    getPathPlan () {
        let distList = axios.get('/path1')
            .then(res => {
                try {
                    return res
                } catch (error) {
                    console.log(error)
                    return []
                }
            })
            .catch(res => {
                console.log("获取数据错误")
            })
        // console.log(distList);
        return distList
    },
    login () {
        let distList = axios.post('http://124.222.82.134:8888/login', {
            "userId": "admin",
            "password": "123456"
        })
            .then(res => {
                try {
                    return res
                } catch (error) {
                    console.log(error)
                    return []
                }
            })
            .catch(res => {
                console.log("获取数据错误")
            })
        // console.log(distList);
        return distList
    },
    getResource (data = {
        "geo": "SRID=4490;MULTIPOINT(106.34587 29.78610)",
        "radius": "500000"
    }) {
        const options = {
            method: 'POST',
            url: 'http://124.222.82.134:8888/pg/areadata',
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
            data: data
        }

        return request(options).then(res => {
            console.log(res)
            return res
        }).catch(function (error) {
            console.error(error)
        })
        // return dataList
    },
    getAllResource () {
        const options = {
            method: 'GET',
            url: 'http://124.222.82.134:8888/pg/selectAll',
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
        }

        return request(options).then(res => {
            console.log(res)
            return res
        }).catch(function (error) {
            console.error(error)
        })
        // return dataList
    },
    getForseter (data = "缙云山,缙云村") {
        const options = {
            method: 'GET',
            url: 'http://124.222.82.134:8888/inspector/inspector/' + data,
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
        }
        return request(options).then(res => {
            console.log(res)
            return res
        }).catch(function (error) {
            console.error(error)
        })
    },
    getAllGrid () {
        const options = {
            method: 'GET',
            // url: 'http://124.222.82.134:8888/geoserver/JYS2023/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JYS2023:r_wg_xhwg_a&maxFeatures=50&outputFormat=application%2Fjson',
            // url: 'http://jyskg.riknow.cn/sgeoserver/JYS2023/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JYS2023:r_wg_xhwg_a&maxFeatures=50&outputFormat=application%2Fjson',
            // url: "http://124.222.82.134:8080/geoserver/JYS2023/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JYS2023:r_wg_xhwg_a&maxFeatures=50&outputFormat=application%2Fjson",
            url: "http://jyskg.riknow.cn/geoserver/JYS2023/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=JYS2023:r_wg_xhwg_a&maxFeatures=50&outputFormat=application%2Fjson",
            // headers: {
            // Authorization: localStorage.getItem("token"),
            // 'content-type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            // },
        }
        try {
            return request(options).then(res => {
                // console.log(res);
                return res
            }).catch(function (error) {
                console.error(error)
            })
        } catch (error) {
            console.log(error)
        }

    },
    getArea () {
        const options = {
            method: 'GET',
            url: 'http://124.222.82.134:8888/bhq/area',
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
        }
        // return new Promise((resolve, reject) => {
        //     fetch('./data.js')
        //         .then(response => {
        //             if (!response.ok) {
        //                 // throw new Error(`Failed to fetch file: ${fileUrl}`);
        //             }
        //             return response.text();
        //         })
        //         .then(data => {
        //             resolve(data);
        //         })
        //         .catch(error => {
        //             reject(error);
        //         });
        // });
        return request(options).then(res => {
            console.log(res)
            return res
        }).catch(function (error) {
            console.error(error)
        })
    },
    // 类别
    getType1 (id, name) {
        const options = {
            method: 'GET',
            url: `http://124.222.82.134:8888//type/type/${id},${name}`,
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
        }
        try {
            return request(options).then(res => {
                console.log(res)
                return res
            }).catch(function (error) {
                console.error(error)
            })
        } catch (error) {

        }



        // console.log(distList);
        return distList
    },
    // 属性 
    getType2 (id, name) {
        const options = {
            method: 'POST',
            url: 'http://124.222.82.134:8888/attributes',
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
            data: {
                "tuceng": name,
                "entity_id": id,
            }
        }
        try {
            return request(options).then(res => {
                console.log(res)
                return res
            }).catch(function (error) {
                console.error(error)
            })
        } catch (error) {

        }
        // return dataList
    },
    // 特征
    getType3 (id, name) {
        const options = {
            method: 'POST',
            url: 'http://124.222.82.134:8888/features',
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
            data: {
                "tuceng": name,
                "entity_id": id,
            }
        }
        try {
            return request(options).then(res => {
                console.log(res)
                return res
            }).catch(function (error) {
                console.error(error)
            })
        } catch (error) {

        }

        // return dataList
    },
    //关系
    getType4 (data = {
        "category": "管理单元",
        "data_s_type": "自然保护区范围",
        "entity_id": "0202010310EC66E0000000z000",
        "entity_name": "安乐村",
        "tuceng": "zrbhq"
    }) {
        const options = {
            method: 'POST',
            url: 'http://124.222.82.134:8888/relations',
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
            data: data,
        }
        try {
            return request(options).then(res => {
                // console.log(res);
                return res
            })
            // .catch(function (error) {
            // console.error(error);
            // });
        } catch (error) {

        }

    },
    //联系
    getType5 (data = {
        "category": "管理单元",
        "data_s_type": "自然保护区范围",
        "entity_id": "0202010310EC66E0000000z000",
        "entity_name": "缙云山管理局森林防火突击队"
    }) {
        const options = {
            method: 'POST',
            url: 'http://124.222.82.134:8888/lx/lx',
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
            data: data,
        }
        try {
            return request(options).then(res => {
                console.log(res)
                return res
            }).catch(function (error) {
                // console.error(error);
            })
        } catch (error) {

        }
    },

    getGroupResource (id = 1) {
        const options = {
            method: 'GET',
            url: `http://124.222.82.134:8888/pg/select/${id}`,
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
        }
        try {
            return request(options).then(res => {
                // console.log(res);
                return res
            }).catch(function (error) {
                // console.error(error);
            })
        } catch (error) {

        }

        // return dataList

    },
    getResourceData (tuceng, id) {
        const options = {
            method: 'POST',
            url: `http://124.222.82.134:8888/pg/select/single`,
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
            data: {
                "tuceng": tuceng,
                "entity_id": id
            }
        }
        try {
            return request(options).then(res => {
                // console.log(res);
                return res
            }).catch(function (error) {
                // console.error(error);
            })
        } catch (error) {

        }

    },
    getQaRelist (data = {
        "category": "管理单元",
        "data_s_type": "自然保护区范围",
        "entity_id": "0202010310EC66E0000000z000"
    }) {
        const options = {
            method: 'POST',
            url: `http://124.222.82.134:8888/qa/relist`,
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
            data: data
        }
        try {
            return request(options).then(res => {
                // console.log(res);
                return res
            }).catch(function (error) {
                // console.error(error);
            })
        } catch (error) {

        }

    },
    getQaReanswer (data = {
        "category": "管理单元",
        "data_s_type": "自然保护区范围",
        "entity_id": "0202010310EC66E0000000z000",
        "name": "缙云山管理局森林防火突击队",
        "question": "区域内有什么灭火资源"
    }) {
        const options = {
            method: 'POST',
            url: `http://124.222.82.134:8888/qa/reanswer`,
            headers: {
                Authorization: localStorage.getItem("token"),
                'content-type': 'application/json'
            },
            data: data
        }
        try {
            return request(options).then(res => {
                // console.log(res);
                return res
            }).catch(function (error) {
                // console.error(error);
            })
        } catch (error) {

        }

    }
}