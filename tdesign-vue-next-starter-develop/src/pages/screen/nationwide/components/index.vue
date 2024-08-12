<template>
  <div class="back-color">
    <div id="box" ref="box">
      <div class="screen-header">
        <div class="header-title">中国各省农作物碳排放可视化</div>
        <div class="header-time">{{currentTime}}</div>
        <div class="header-return" @click="returnToHome">
          <svg t="1716634605528" 
            class="icon" 
            viewBox="0 0 1024 1024" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            p-id="1486" 
            width="16" 
            height="16">
            <path d="M296.704 145.28l-196.096 196.096 196.096 196.117333 60.352-60.352L263.893333 384H629.333333a202.666667 202.666667 0 0 1 0 405.333333H362.666667v85.333334h266.666666C788.394667 874.666667 917.333333 745.728 917.333333 586.666667S788.394667 298.666667 629.333333 298.666667H264l93.034667-93.056-60.330667-60.330667z" p-id="1487" fill="#ffffff"></path>
          </svg>
        </div>
      </div>
      <div class="screen-contents">
        <div class="contents-left">
          <div id="left-one">
            <div class="left-one-title">西南地区农田生态系统的碳排放(万吨)</div>
            <div id="left-one-chart"></div>
          </div>
          <div id="left-two">
            <div class="left-two-title">西南地区农田生态系统的碳排放(万吨)</div>
            <div id="left-two-chart"></div>
          </div>
          <div id="left-three">
            <div id="fb1"></div>
            <div id="fb2"></div>
            <div id="fb3"></div>
          </div>
        </div>
        <div class="contents-center">
          <div id="center-one">

            <div class="center-one-number">
              <div class="center-number">9982.96</div>
              <div class="center-number">9982.96</div>

            </div>
            <div class="center-one-text">
              <div class="center-text">2019年农作物碳排放总量(万吨)</div>
              <div class="center-text">2019年农作物碳排放强度(千克/公顷)</div>
            </div>

          </div>
          <div id="center-two">
            <div class="center-two-map1">
              <img src="/mapdata/jt.png" alt="">
            </div>
            <div class="center-two-map2">
              <img src="/mapdata/lbx.png" alt="">
            </div>
            <div class="center-two-map3">
              <img src="/mapdata/map.png" alt="">
            </div>
            <div id="center-two-map4"></div>
          </div>
        </div>
        <div class="contents-right">
          <div id="right-one">
            <div class="right-one-title">西南地区农田生态系统的碳排放(万吨)</div>
            <div id="right-one-chart"></div>
          </div>
          <div id="right-two">
            <div class="right-two-title">西南地区农田生态系统的碳排放(万吨)</div>
            <div id="right-two-chart"></div>
          </div>
          <div id="right-three">
            <div class="right-three-title">西南地区农田生态系统的碳排放(万吨)</div>
            <div id="right-three-chart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { watch } from 'vue'

export default {
  name: 'screen',

  data () {
    return {
      currentTime: '',
      timer: null,
    }
  },
  methods: {
    startTimer () {
      this.timer = setInterval(() => {
        const dt = new Date()
        const y = dt.getFullYear()
        const mt = dt.getMonth() + 1
        const day = dt.getDate()
        const h = dt.getHours()
        const m = dt.getMinutes()
        const s = dt.getSeconds()

        this.currentTime = `${y}/${this.appendZero(mt)}/${this.appendZero(
          day
        )} ${this.appendZero(h)}:${this.appendZero(m)}:${this.appendZero(s)}`
      }, 1000)
    },
    clearTimer () {
      clearInterval(this.timer)
    },
    appendZero (obj) {
      if (obj < 10) return "0" + "" + obj
      else return obj
    },

    autoScale (width, height) {
      const el = this.$refs.box
      const scaleX = window.innerWidth / width
      const scaleY = window.innerHeight / height
      const scale = Math.min(scaleX, scaleY)

      const left = (window.innerWidth - width * scale) / 2
      const top = (window.innerHeight - height * scale) / 2

      el.style.transformOrigin = 'top left'
      el.style.transform = `translate(${left}px, ${top}px) scale(${scale})`
    },

    onResize () {
      this.autoScale(1280, 720)
      this.echarts_1()
    },

    echarts_1 () {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById('left-one-chart').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById('left-one-chart'))
      const option = {
        //  backgroundColor: '#00265f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['重庆', '四川', '贵州', '云南', '西藏'],
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'solid',
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '12',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '12',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1	)',
                width: 1,
                type: 'solid',
              },
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
              },
            },
          },
        ],
        series: [
          {
            type: 'bar',
            data: [148.69, 409.5, 148.81, 348.06, 15.33],
            barWidth: '30%', //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
              },
            },
          },
        ],
      }
      myChart.setOption(option)
    },
    echarts_2 () {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById('left-two-chart').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById('left-two-chart'))
      const option = {
        //  backgroundColor: '#00265f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['重庆', '四川', '贵州', '云南', '西藏'],
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
                width: 1,
                type: 'solid',
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '12',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '12',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1	)',
                width: 1,
                type: 'solid',
              },
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
              },
            },
          },
        ],
        series: [
          {
            type: 'bar',
            data: [148.69, 409.5, 148.81, 348.06, 15.33],
            barWidth: '30%', //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5,
              },
            },
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      // window.addEventListener("resize", function () {
      //   myChart.resize()
      // })
    },
    echarts_31 () {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById('fb1').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById('fb1'))
      const option = {
        title: [
          {
            text: '柴油的碳排放(万吨)',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: '12',
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          position: function (p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10]
          },
        },
        legend: {
          top: '70%',
          itemWidth: 10,
          itemHeight: 10,
          data: ['重庆', '四川', '贵州', '云南', '西藏'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
          },
        },
        series: [
          {
            name: '柴油的碳排放',
            type: 'pie',
            center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: 12.57, name: '重庆' },
              { value: 27.86, name: '四川' },
              { value: 6.7, name: '贵州' },
              { value: 15.53, name: '云南' },
              { value: 1.96, name: '西藏' },
            ],
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    echarts_32 () {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById('fb2').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById('fb2'))
      const option = {
        title: [
          {
            text: '农膜的碳排放(万吨)',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: '12',
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          position: function (p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10]
          },
        },
        legend: {
          top: '70%',
          itemWidth: 10,
          itemHeight: 10,
          data: ['重庆', '四川', '贵州', '云南', '西藏'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
          },
        },
        series: [
          {
            name: '农膜的碳排放',
            type: 'pie',
            center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: 22.05, name: '重庆' },
              { value: 63.84, name: '四川' },
              { value: 22.85, name: '贵州' },
              { value: 63.27, name: '云南' },
              { value: 0.76, name: '西藏' },
            ],
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    echarts_33 () {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById('fb3').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById('fb3'))
      const option = {
        title: [
          {
            text: '机械的碳排放(万吨)',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: '12',
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          position: function (p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10]
          },
        },
        legend: {
          top: '70%',
          itemWidth: 10,
          itemHeight: 10,
          data: ['重庆', '四川', '贵州', '云南', '西藏'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
          },
        },
        series: [
          {
            name: '机械用电的碳排放',
            type: 'pie',
            center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: 5.77, name: '重庆' },
              { value: 16.73, name: '四川' },
              { value: 9.48, name: '贵州' },
              { value: 11.92, name: '云南' },
              { value: 0.55, name: '西藏' },
            ],
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    echarts_map () {
      document.getElementById('center-two-map4').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById("center-two-map4"))
      axios.get("/mapdata/china.json").then(res => {
        let data = res.data
        console.log(data)
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
      myChart.on('click', function (params) {
        // 控制台打印数据的名称
        console.log(params.name)
      })
    },
    echarts_4 () {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById('right-one-chart').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById("right-one-chart"))

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b",
            },
          },
        },
        legend: {
          top: "0%",
          // data: ['碳排放强度', '耕地面积'],
          data: ["碳排放强度"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12",
          },
        },
        grid: {
          left: "10",
          top: "30",
          right: "10",
          bottom: "10",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)",
              },
            },

            data: ["重庆", "四川", "贵州", "云南", "西藏"],
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20,
          },
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "碳排放强度",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#0184d5",
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$myecharts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: [444.41, 422.47, 271.48, 501.61, 564.62],
          },

        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    echarts_5 () {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById('right-two-chart').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById("right-two-chart"))

      const option = {
        //  backgroundColor: '#00265f',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },

        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["重庆", "四川", "贵州", "云南", "西藏"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid",
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: [8.14, 22.84, 4.54, 23.39, 0.39],
            barWidth: "35%", //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: "#2f89cf",
                opacity: 1,
                barBorderRadius: 5,
              },
            },
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener("resize", function () {
        myChart.resize()
      })
    },
    echarts_6 () {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById('right-three-chart').removeAttribute('_echarts_instance_')
      let myChart = this.$myecharts.init(document.getElementById("right-three-chart"))

      let dataStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          //shadowBlur: 40,
          //shadowColor: 'rgba(40, 40, 40, 1)',
        },
      }
      let placeHolderStyle = {
        normal: {
          color: "rgba(255,255,255,.05)",
          label: { show: false },
          labelLine: { show: false },
        },
        emphasis: {
          color: "rgba(0,0,0,0)",
        },
      }
      const option = {
        color: ["#0f63d6", "#0f78d6", "#0f8cd6", "#0fa0d6", "#0fb4d6"],
        tooltip: {
          show: true,
          formatter: "{a} : {c} ",
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 12,
          bottom: "3%",
          data: ["重庆", "四川", "贵州", "云南", "西藏"],
          textStyle: {
            color: "rgba(255,255,255,.6)",
          },
        },

        series: [
          {
            name: "重庆",
            type: "pie",
            clockWise: false,
            center: ["50%", "42%"],
            radius: ["59%", "70%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [
              {
                value: 18.59,
                name: "01",
              },
              {
                value: 20,
                name: "invisible",
                tooltip: { show: false },
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "四川",
            type: "pie",
            clockWise: false,
            center: ["50%", "42%"],
            radius: ["49%", "60%"],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [
              {
                value: 78.72,
                name: "02",
              },
              {
                value: 30,
                name: "invisible",
                tooltip: { show: false },
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "贵州",
            type: "pie",
            clockWise: false,
            hoverAnimation: false,
            center: ["50%", "42%"],
            radius: ["39%", "50%"],
            itemStyle: dataStyle,
            data: [
              {
                value: 30.75,
                name: "03",
              },
              {
                value: 35,
                name: "invisible",
                tooltip: { show: false },
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "云南",
            type: "pie",
            clockWise: false,
            hoverAnimation: false,
            center: ["50%", "42%"],
            radius: ["29%", "40%"],
            itemStyle: dataStyle,
            data: [
              {
                value: 51.23,
                name: "04",
              },
              {
                value: 40,
                name: "invisible",
                tooltip: { show: false },
                itemStyle: placeHolderStyle,
              },
            ],
          },
          {
            name: "西藏",
            type: "pie",
            clockWise: false,
            hoverAnimation: false,
            center: ["50%", "42%"],
            radius: ["20%", "30%"],
            itemStyle: dataStyle,
            data: [
              {
                value: 7.35,
                name: "05",
              },
              {
                value: 50,
                name: "invisible",
                tooltip: { show: false },
                itemStyle: placeHolderStyle,
              },
            ],
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)

    },

    returnToHome () {
      this.$router.push('/')
    }

  },

  mounted () {
    this.startTimer()

    this.autoScale(1280, 720)
    window.addEventListener('resize', this.onResize)

    this.echarts_1()
    this.echarts_2()
    this.echarts_31()
    this.echarts_32()
    this.echarts_33()
    this.echarts_4()
    this.echarts_5()
    this.echarts_6()
    this.echarts_map()
  },
  beforeDestroy () {
    this.clearTimer()
    window.removeEventListener('resize', this.onResize)
    this.$myecharts.dispose()
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
@keyframes myfirst2 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes myfirst {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-359deg);
  }
}
@font-face {
  font-family: electronicFont;
  src: url(@/assets/font/DS-DIGIT.TTF);
}
.back-color {
  background: #000d4a url(@/assets/bg.jpg) center center;
    background-size: cover;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  #box {
    width: 1280px;
    height: 720px;
    background: #000d4a url(@/assets/bg.jpg) center center;
    background-size: cover;
    transition: all 1s;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .screen-header {
      background: #000d4a url(@/assets/head_bg.png) center center;
      background-size: 100% 100%;
      position: relative;
      .header-title{
        height: 50px;
        line-height: 50px;
        color: white;
        text-align: center;
        font-size: 15px;
      }
      .header-time{
        position: absolute;
        right: 60px;
        top: 10px;
        color: white;
        font-family: electronicFont;
      }
      .header-return{
        position: absolute;
        right: 10px;
        top: 12px;
      }
    }
    .screen-contents {
      flex: 1;
      // border: 1px solid red;
      color: white;
      display: flex;
      .contents-left {
        flex: 2;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        #left-one {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          border: 1px solid rgba(25, 186, 139, 0.17);


          .left-one-title {
            text-align: center;
          }
          #left-one-chart {
            flex: 1;
            padding: 10px;
            box-sizing: border-box;
          }
        }
        #left-two {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          margin: 10px 0;
          border: 1px solid rgba(25, 186, 139, 0.17);
          .left-two-title {
            text-align: center;
          }
          #left-two-chart {
            flex: 1;
            padding: 10px;
            box-sizing: border-box;
          }
        }
        #left-three {
          flex: 1;
          display: flex;
          padding: 10px;
          box-sizing: border-box;

          border: 1px solid rgba(25, 186, 139, 0.17);
          #fb1{
            flex: 1;
          }
          #fb2{
            flex: 1;
          }
          #fb3{
            flex: 1;
          }
        }
      }
      .contents-center {
        flex: 3;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin: 0 5px;
        #center-one{
          flex: 1;
          background: rgba(101, 132, 226, 0.1);
          // border: 1px solid red;
          box-sizing: border-box;
          padding: 10px;

          .center-one-number{
           display: flex;
           border: 1px solid rgba(25, 186, 139, 0.17);
           font-family: electronicFont;
           
            .center-number{
              font-size: 40px;
              flex: 1;
              padding: 20px 60px;
              color: rgb(241, 211, 39);
              position: relative;
              &:first-child::after{
                content: '';
                display: block;
                height: 50%;
                width: 2px;
                position: absolute;
                right: 0;
                top: calc(50% / 2);
                background-color: rgba(25, 186, 139, 0.17);
              }
            }
          }
          .center-one-text{
            display: flex;
            justify-content: space-between;
            .center-text{
              flex: 1;
              text-align: center;
              padding: 10px 15px;
            }
          }
        }
        #center-two{
          flex: 5;
          overflow: hidden;
          .center-two-map1{
            position: relative;
            img{
              position: absolute;
              top: 28px;
              left: 20px;
              width:90%;
              z-index: 2;
              animation: myfirst 15s infinite linear;
            }
          }
          .center-two-map2{
            position: relative;
            width: 100%;
            img{
              width: 92%;
              position: absolute;
              z-index: 2;
              top: 23px;
              left: 14px;
              animation: myfirst2 15s infinite linear;
            }
          }
          .center-two-map3{
            position: relative;
            img{
              position: absolute;
              z-index: 1;
              width: 81%;
              left: 45px;
              top: 53px;
            }
          }
          #center-two-map4{
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 8;
          }
        }
      }
      .contents-right {
        flex: 2;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        #right-one {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          border: 1px solid rgba(25, 186, 139, 0.17);
          .right-one-title {
            text-align: center;
          }
          #right-one-chart {
            flex: 1;
            padding: 10px;
            box-sizing: border-box;
          }
        }
        #right-two {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          margin: 10px 0;
          border: 1px solid rgba(25, 186, 139, 0.17);
          .right-two-title {
            text-align: center;
          }
          #right-two-chart {
            flex: 1;
            padding: 10px;
            box-sizing: border-box;
          }
        }
        #right-three {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          // margin: 10px 0;
          border: 1px solid rgba(25, 186, 139, 0.17);
          .right-three-title {
            text-align: center;
          }
          #right-three-chart {
            flex: 1;
            padding: 10px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
