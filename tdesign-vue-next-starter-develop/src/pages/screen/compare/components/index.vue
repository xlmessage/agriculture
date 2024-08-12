<template>
  <div class="combox">
    <div class="content">
      <div id="left"></div>
      <div class="right">
        <div class="inner" v-if="flag" >
          请点击地图进行选择
        </div>
        <div class="inner" v-if="datalist" v-for="item in datalist">
          {{item}}
        </div>
        <div class="look" v-if="!flag" @click="toAnalysis">查看</div>
      </div>
    </div>
  </div>
</template>
<!-- <script setup>
import axios from 'axios'
import { onMounted } from 'vue'


// const echarts_map = () => {
//   document.getElementById('left').removeAttribute('_echarts_instance_')
//   let myChart = this.$myecharts.init(document.getElementById("left"))
//   axios.get("/mapdata/china.json").then(res => {
//     let data = res.data
//     console.log(data)
//     let ment = []
//     data.features.forEach(element => {
//       let mind = []
//       for (const key in element.properties.center) {
//         mind.push(element.properties.center[key])
//       }
//       mind.push(element.properties.name)
//       ment.push(mind)
//     })

//     this.$myecharts.registerMap('中国', data)
//     // 配置option
//     let option = {
//       title: {
//         left: 'center',
//         text: '2019年各省农作物碳排放量(万吨)',
//         textStyle: {
//           color: '#fff'
//         }
//       },
//       /** 地理坐标系组件。 */
//       geo: {
//         top: 100,
//         // 使用 registerMap 注册的地图名称
//         map: '中国',
//         // 当前视角的缩放比例
//         zoom: 1.2,
//         emphasis: {
//           label: {
//             color: '#fff',
//           },
//           itemStyle: {
//             areaColor: 'blue'
//           }
//         },
//         // 说明图形的一些数据信息
//         label: {
//           show: false,
//           // color: 'rgb(105, 105, 105)',
//         },
//         // 设置地图颜色
//         itemStyle: {

//           normal: {
//             areaColor: '#4C60FF',

//           }
//         }
//       },
//       series: [
//         {
//           // 绘制涟漪特效的地点
//           type: 'effectScatter',
//           // 设置散点颜色
//           color: 'rgb(230, 255, 10)',
//           // 坐标系选择
//           coordinateSystem: 'geo',
//           zlevel: 2,
//           symbolSize: 5,
//           // 涟漪特效相关配置
//           rippleEffect: {
//             color: 'rgb(230, 255, 10)',
//             period: 6,
//             scale: 5,
//             brushType: 'stroke',
//             // 波纹的绘制方式
//             brushType: 'stroke'
//           },
//           data: ment
//         }
//       ]
//     }
//     myChart.setOption(option)
//   })
//   // echarts图点击事件
//   myChart.on('click', function (params) {
//     // 控制台打印数据的名称
//     console.log(params.name)
//   })
// }

// onMounted(()=>{
//   echarts_map()
// })

</script> -->

<script>
import axios from 'axios'
import { watch } from 'vue'

export default {
  name: 'screen',

  data () {
    return {
      currentTime: '',
      timer: null,
      // 点击数据表
      datalist: [],
      flag:true
    }
  },
  // computed: {
  //   clearRepeat (newVal) {
  //     const uniqueArray = newVal.reduce((accumulator, current) => {
  //       // 如果当前元素不在累加器中（即没有重复）
  //       if (!accumulator.includes(current)) {
  //         // 将其添加到累加器数组中
  //         accumulator.push(current)
  //       }
  //       // 总是返回累加器（这里是一个数组）
  //       return accumulator
  //     }, [])
  //     return uniqueArray
  //   }
  // },
  methods: {

    echarts_map (datalist) {
      document.getElementById('left').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById("left"))
      axios.get("/mapdata/china.json").then(res => {
        let data = res.data
        // console.log(data)
        let ment = []
        data.features.forEach(element => {
          let mind = []
          for (const key in element.properties.center) {
            mind.push(element.properties.center[key])
          }
          mind.push(element.properties.name)
          ment.push(mind)
        })

        this.$myecharts.registerMap('中国', data)
        // 配置option
        let option = {
          title: {
            left: 'center',
            text: '2019年各省农作物碳排放量(万吨)',
            textStyle: {
              color: '#fff'
            }
          },
          /** 地理坐标系组件。 */
          geo: {
            top: 100,
            // 使用 registerMap 注册的地图名称
            map: '中国',
            // 当前视角的缩放比例
            zoom: 1.2,
            emphasis: {
              label: {
                color: '#fff',
              },
              itemStyle: {
                areaColor: 'blue'
              }
            },
            // 说明图形的一些数据信息
            label: {
              show: false,
              // color: 'rgb(105, 105, 105)',
            },
            // 设置地图颜色
            itemStyle: {

              normal: {
                areaColor: '#4C60FF',

              }
            }
          },
          series: [
            {
              // 绘制涟漪特效的地点
              type: 'effectScatter',
              // 设置散点颜色
              color: 'rgb(230, 255, 10)',
              // 坐标系选择
              coordinateSystem: 'geo',
              zlevel: 2,
              symbolSize: 5,
              // 涟漪特效相关配置
              rippleEffect: {
                color: 'rgb(230, 255, 10)',
                period: 6,
                scale: 5,
                brushType: 'stroke',
                // 波纹的绘制方式
                brushType: 'stroke'
              },
              data: ment
            }
          ]
        }
        myChart.setOption(option)
      })
      // echarts图点击事件
      myChart.on('click', (params) => {
        // 控制台打印数据的名称
        // console.log(params.name)
        // datalist.push(params.name)
        // datalist = this.clearRepeat(datalist)

        this.flag = false

        this.updateArrayWithLimit(datalist, params.name)
        this.datalist = datalist

        console.log(this.datalist)
      })
    },

    returnToHome () {
      this.$router.push('/')
    },

    clearRepeat (arr) {
      const uniqueArray = arr.reduce((accumulator, current) => {
        // 如果当前元素不在累加器中（即没有重复）
        if (!accumulator.includes(current)) {
          // 将其添加到累加器数组中
          accumulator.push(current)
        }
        // 总是返回累加器（这里是一个数组）
        return accumulator
      }, [])
      return uniqueArray
    },

    // 限制选择的元素
    updateArrayWithLimit (array, element) {
      // 使用 Set 来检查并控制数组中元素的唯一性
      const uniqueElements = new Set(array)

      // 如果新元素已经存在，则从数组中移除它
      if (uniqueElements.has(element)) {
        const index = array.indexOf(element)
        array.splice(index, 1)
      } else {
        // 如果新元素不存在，并且数组中元素的种类少于3种
        if (uniqueElements.size < 3) {
          // 直接添加新元素
          array.push(element)
        } else {
          // 如果已经有3种不同的元素，不做任何操作
          // 这里可以添加一些日志输出，以帮助调试
          console.log('Array already contains 3 unique elements. No action taken.')
        }
      }

      // 重新创建 Set，以确保更新后的数组状态正确
      uniqueElements.clear()
      for (let item of array) {
        uniqueElements.add(item)
      }
      // 如果 Set 的大小为 3 或以上，且新元素不在 Set 中，移除最旧的元素
      if (uniqueElements.size >= 3 && !uniqueElements.has(element)) {
        // array.shift() // 移除数组的第一个元素
        return
      }
    },

    // 路由跳转
    toAnalysis(){
      this.$router.push('/screen/locality')
    }

  },

  mounted () {
    this.echarts_map(this.datalist)

    // console.log(this.datalist);
  },
  // watch: {
  //   datalist: {
  //     handler (newVal, oldVal) {
  //       console.log('user 对象发生变化')
  //       // console.log(newVal)
  //       this.datalist = this.clearRepeat (newVal)
  //       console.log(this.datalist);
  //     },
  //     deep: true
  //   }
  // },

  beforeDestroy () {
    this.$myecharts.dispose()
  },
};
</script>







<style lang="less" scoped>
.combox{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  // background-color: rgb(151, 193, 231);
  display: flex;
  justify-content: center;
  align-items: center;
  .content{
    width: 90vw;
    height: 90vh;
    border: 1px solid rgb(185, 186, 186);
    border-radius: 5px;
    display: flex;
    #left{
      flex: 1;
      height: 100%;
      width: 100%;
    }
    .right{
      flex: 1;
      // border: 1px solid red;
      padding: 10px;
      .inner{
        padding: 10px 20px;
        border: 1px solid rgb(20, 105, 126);
        margin-bottom: 10px;
        border-radius: 10px;
        cursor: pointer;
      }
      .look{
        width: 20%;
        text-align: center;
        margin: 0 auto;
        padding: 10px 20px;
        border: 1px solid rgb(20, 105, 126);
        margin-bottom: 10px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>