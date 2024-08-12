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
            <div class="left-one-title">常见农作物碳吸收率</div>
            <div id="left-one-chart"></div>
          </div>
          <div id="left-two">
            <div class="left-two-title">常见农作物经济产量(单位:万吨)</div>
            <div id="left-two-chart"></div>
          </div>

        </div>
        <div class="contents-center">
          <div id="center-one">
            <div class="center-one-box">
              <div class="center-one-left">
                <div>2019年西南地区总碳汇量</div>
                <div>
                  <span class="left-number">15654.2</span>
                  <span class="left-text">万吨</span>
                </div>
              </div>
              <div class="center-one-right">
                <div id="pie-one"></div>
                <div id="pie-two"></div>
                <div id="pie-three"></div>
              </div>
            </div>
          </div>
          <div id="center-two">
            <div id="center-two-chart"></div>
          </div>
          <div id="center-three">
            <div id="center-three-chart"></div>
          </div>
        </div>
        <div class="contents-right">
          <div id="right-one">
            <div class="right-one-title">西南地区碳排放强度、碳吸收强度(单位:千克/公顷)</div>
            <div id="right-one-chart"></div>
          </div>
          <div id="right-two">
            <div class="right-two-title">常见农作物生物产量(单位:万吨)</div>
            <div id="right-two-chart">
              <table border="0" cellspacing="0">
                <tbody>
                  <tr>
                    <th></th>
                    <th>蔬菜</th>
                    <th>水稻</th>
                    <th>小麦</th>
                    <th>玉米</th>
                    <th>薯类</th>
                    <th>大豆</th>
                    <th>花生</th>
                    <th>油菜</th>
                  </tr>
                  <tr>
                    <th>重庆</th>
                    <td>3347.9</td>
                    <td>1082.2</td>
                    <td>17.3</td>
                    <td>624.0</td>
                    <td>405.2</td>
                    <td>58.7</td>
                    <td>31.8</td>
                    <td>199.6</td>
                  </tr>
                  <tr>
                    <th>四川</th>
                    <td>7731.9</td>
                    <td>3266.3</td>
                    <td>615.5</td>
                    <td>2655.4</td>
                    <td>776.0</td>
                    <td>278.4</td>
                    <td>159.0</td>
                    <td>1185.8</td>
                  </tr>
                  <tr>
                    <th>贵州</th>
                    <td>4558.1</td>
                    <td>941.8</td>
                    <td>82.5</td>
                    <td>580.8</td>
                    <td>432.6</td>
                    <td>54.3</td>
                    <td>27.0</td>
                    <td>309.0</td>
                  </tr>
                  <tr>
                    <th>云南</th>
                    <td>3840.2</td>
                    <td>1186.6</td>
                    <td>179.8</td>
                    <td>2300.0</td>
                    <td>240.4</td>
                    <td>135.3</td>
                    <td>15.7</td>
                    <td>216.4</td>
                  </tr>
                  <tr>
                    <th>西藏</th>
                    <td>129.1</td>
                    <td>48.0</td>
                    <td>10</td>
                    <td>6.5</td>
                    <td>0.3</td>
                    <td>0.1</td>
                    <td>0.1</td>
                    <td>22.8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="right-three">
            <div class="right-three-title">西南地区碳汇强度(单位:千克/公顷)</div>
            <div id="right-three-chart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'screen',

  data () {
    return {
      currentTime: '',
      timer: null,
    }
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        const dt = new Date();
        const y = dt.getFullYear();
        const mt = dt.getMonth() + 1;
        const day = dt.getDate();
        const h = dt.getHours();
        const m = dt.getMinutes();
        const s = dt.getSeconds();

        this.currentTime = `${y}/${this.appendZero(mt)}/${this.appendZero(
          day
        )} ${this.appendZero(h)}:${this.appendZero(m)}:${this.appendZero(s)}`;
      }, 1000);
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    appendZero(obj) {
      if (obj < 10) return "0" + "" + obj;
      else return obj;
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
    },

    echarts_1 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$myecharts.init(document.getElementById("left-one-chart"));
      let myColor = [
        "#eb2100",
        "#eb3600",
        "#d0570e",
        "#d0a00e",
        "#34da62",
        "#00e9db",
        "#00c0e9",
        "#0096f3",
      ];
    const option = {
      grid: {
        left: "2%",
        top: "1%",
        right: "5%",
        bottom: "0%",
        containLabel: true,
      },
      xAxis: [
        {
          show: false,
        },
      ],
      yAxis: [
        {
          axisTick: "none",
          axisLine: "none",
          offset: "7",
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "14",
            },
          },

          data: [
            "蔬菜",
            "水稻",
            "小麦",
            "玉米",
            "薯类",
            "大豆",
            "花生",
            "油菜",
          ],
        },
        {
          axisTick: "none",
          axisLine: "none",
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "14",
            },
          },
          data: [0.45, 0.414, 0.485, 0.471, 0.423, 0.45, 0.45, 0.45],
        },
        {
          name: "单位：件",
          nameGap: "50",
          nameTextStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "16",
          },
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)",
            },
          },
          data: [],
        },
      ],
      series: [
        {
          name: "条",
          type: "bar",
          yAxisIndex: 0,
          data: [45, 41.4, 48.5, 47.1, 42.3, 45, 45, 45],
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: function (param) {
                return param.value + "%";
              },
              textStyle: {
                color: "rgba(255,255,255,.8)",
                fontSize: "12",
              },
            },
          },
          barWidth: 15,
          itemStyle: {
            normal: {
              color: new this.$myecharts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: "#03c893",
                },
                {
                  offset: 1,
                  color: "#0091ff",
                },
              ]),
              barBorderRadius: 15,
            },
          },
          z: 2,
        },
        {
          name: "白框",
          type: "bar",
          yAxisIndex: 1,
          barGap: "-100%",
          data: [99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
          barWidth: 15,
          itemStyle: {
            normal: {
              color: "rgba(0,0,0,.2)",
              barBorderRadius: 15,
            },
          },
          z: 1,
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    },
    echarts_2 () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$myecharts.init(document.getElementById('left-two-chart'))
      const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ["重庆", "四川", "贵州", "云南", "西藏"],
        right: "center",
        top: 0,
        textStyle: {
          color: "#fff",
        },
        itemWidth: 12,
        itemHeight: 10,
        // itemGap: 35
      },
      grid: {
        left: "0",
        right: "20",
        bottom: "0",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["蔬菜", "水稻", "小麦", "玉米", "薯类", "大豆", "花生", "油菜"],
        axisLine: {
          lineStyle: {
            color: "white",
          },
        },
        axisLabel: {
          //rotate:-90,
          formatter: function (value) {
            return value.split("").join("\n");
          },
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 14,
          },
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.3)",
          },
        },
      },

      yAxis: {
        type: "value",
        splitNumber: 4,
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.1)",
          },
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 14,
          },
        },
        axisLine: { show: false },
      },

      series: [
        {
          name: "重庆",
          type: "bar",
          stack: "a",
          barWidth: "30",
          barGap: 0,
          itemStyle: {
            normal: {
              color: "#8bd46e",
            },
          },
          data: [2008.76, 487, 6.91, 249.59, 283.64, 19.97, 13.68, 49.89],
        },
        {
          name: "四川",
          type: "bar",
          stack: "a",
          barWidth: "30",
          barGap: 0,
          itemStyle: {
            normal: {
              color: "#f5804d",
              barBorderRadius: 0,
            },
          },
          data: [
            4639.13, 1469.82, 246.18, 1062.14, 543.23, 94.67, 68.37, 296.45,
          ],
        },
        {
          name: "贵州",
          type: "bar",
          stack: "a",
          barWidth: "30",
          barGap: 0,
          itemStyle: {
            normal: {
              color: "#248ff7",
              barBorderRadius: 0,
            },
          },
          data: [2734.84, 423.83, 32.98, 232.3, 302.87, 18.46, 11.62, 77.25],
        },
        {
          name: "云南",
          type: "bar",
          stack: "a",
          barWidth: "30",
          barGap: 0,
          itemStyle: {
            normal: {
              color: "#248ff7",
              barBorderRadius: 0,
            },
          },
          data: [2304.14, 534, 71.9, 920, 168.3, 46, 6.76, 54.1],
        },
        {
          name: "西藏",
          type: "bar",
          stack: "a",
          barWidth: "30",
          barGap: 0,
          itemStyle: {
            normal: {
              color: "#248ff7",
              barBorderRadius: 0,
            },
          },
          data: [77.49, 0.43, 19.19, 2.59, 0.19, 0.01, 0.02, 5.69],
        },
      ],
    };
      myChart.setOption(option)
    },
    pie_charts_one () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$myecharts.init(document.getElementById('pie-one'))

      const datas = {
        value: 63.5,
        text: "重庆碳汇占比"
      }
      const option = {
        // backgroundColor: "#000",
        title: {
          text: '重庆碳汇占比',
          bottom: '14%',
          left: 'center',
          textStyle: {
            color: 'white',
            fontSize: '12'
          }
        },
        series: [
          /*仪表盘图，做中间刻度线*/
          {
            type: 'gauge',
            name: 'gauge',
            radius: '25%',
            startAngle: '0',
            endAngle: '-359.99',
            center: ['50%', '45%'],
            splitNumber: '120',
            pointer: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 20,
                opacity: 0
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 7,
              lineStyle: {
                color: {
                  type: 'linear',
                  colorStops: [{
                    offset: 0, color: 'rgba(0, 141, 255, 0.32)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(0, 141, 255, 0.32)' // 100% 处的颜色
                  }],
                },
                width: 1,
                type: 'solid',
              },
            },
            axisLabel: {
              show: false
            }
          },
          /*内心原型图，展示整体数据概览*/
          {
            name: 'pie',
            type: 'pie',
            roundCap: true,
            clockWise: true,
            startAngle: 260,
            labelLine: {
              show: false
            },
            radius: ['20%', '23%'],
            hoverAnimation: false,
            center: ['50%', '45%'],
            data: [
              {
                value: datas.value,
                label: {
                  normal: {
                    // formatter: datas.text +'\n'+'{d}{cell|%}\n{text|'+  '}',
                    formatter: '\n' + '{d}{cell|%}\n{text|}',
                    position: 'center',
                    // offset:[0,-30],
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'normal',
                      color: '#FBC00F',
                      lineHeight: 20,
                      rich: {
                        cell: {
                          fontSize: '14',
                          fontWeight: 'normal',
                          color: '#FBC00F',
                          padding: [0, 0, 0, 5]
                        },
                      }
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: new this.$myecharts.graphic.LinearGradient(0, 1, 1, 0, [{
                      offset: 0,
                      color: '#8124FF'
                    }, {
                      offset: 1,
                      color: '#01FFFF'
                    }]),
                    shadowColor: 'rgba(1,1,1,0.5)',
                    shadowBlur: 1
                  }
                }
              },
              {
                value: 100 - datas.value,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'RGBA(5, 44, 78, 1)', // 未完成的圆环的颜色
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: 'RGBA(5, 44, 78, 1)' // 未完成的圆环的颜色
                  }
                }
              }]
          }
        ]
      }
      myChart.setOption(option)
    },
    pie_charts_two () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$myecharts.init(document.getElementById('pie-two'))

      const datas = {
        value: 33.5,
        text: "重庆碳汇占比"
      }
      const option = {
        // backgroundColor: "#000",
        title: {
          text: '四川碳汇占比',
          bottom: '14%',
          left: 'center',
          textStyle: {
            color: 'white',
            fontSize: '12'
          }
        },
        series: [
          /*仪表盘图，做中间刻度线*/
          {
            type: 'gauge',
            name: 'gauge',
            radius: '25%',
            startAngle: '0',
            endAngle: '-359.99',
            center: ['50%', '45%'],
            splitNumber: '120',
            pointer: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 20,
                opacity: 0
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 7,
              lineStyle: {
                color: {
                  type: 'linear',
                  colorStops: [{
                    offset: 0, color: 'rgba(0, 141, 255, 0.32)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(0, 141, 255, 0.32)' // 100% 处的颜色
                  }],
                },
                width: 1,
                type: 'solid',
              },
            },
            axisLabel: {
              show: false
            }
          },
          /*内心原型图，展示整体数据概览*/
          {
            name: 'pie',
            type: 'pie',
            roundCap: true,
            clockWise: true,
            startAngle: 260,
            labelLine: {
              show: false
            },
            radius: ['20%', '23%'],
            hoverAnimation: false,
            center: ['50%', '45%'],
            data: [
              {
                value: datas.value,
                label: {
                  normal: {
                    // formatter: datas.text +'\n'+'{d}{cell|%}\n{text|'+  '}',
                    formatter: '\n' + '{d}{cell|%}\n{text|}',
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'normal',
                      color: '#FBC00F',
                      lineHeight: 20,
                      rich: {
                        cell: {
                          fontSize: '14',
                          fontWeight: 'normal',
                          color: '#FBC00F',
                          padding: [0, 0, 0, 5]
                        },
                        text: {
                          fontSize: 12,
                          fontFamily: 'FZLanTingHeiS-L-GB',
                          color: '#BDDCEE',
                          padding: [5, 35, 0, 10]
                        }
                      }
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: new this.$myecharts.graphic.LinearGradient(0, 1, 1, 0, [{
                      offset: 0,
                      color: '#8124FF'
                    }, {
                      offset: 1,
                      color: '#01FFFF'
                    }]),
                    shadowColor: 'rgba(1,1,1,0.5)',
                    shadowBlur: 1
                  }
                }
              },
              {
                value: 100 - datas.value,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'RGBA(5, 44, 78, 1)', // 未完成的圆环的颜色
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: 'RGBA(5, 44, 78, 1)' // 未完成的圆环的颜色
                  }
                }
              }]
          }
        ]
      }
      myChart.setOption(option)
    },
    pie_charts_three () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$myecharts.init(document.getElementById('pie-three'))

      const datas = {
        value: 17.5,
        text: "重庆碳汇占比"
      }
      const option = {
        // backgroundColor: "#000",
        title: {
          text: '贵州碳汇占比',
          bottom: '14%',
          left: 'center',
          textStyle: {
            color: 'white',
            fontSize: '12'
          }
        },
        series: [
          /*仪表盘图，做中间刻度线*/
          {
            type: 'gauge',
            name: 'gauge',
            radius: '25%',
            startAngle: '0',
            endAngle: '-359.99',
            center: ['50%', '45%'],
            splitNumber: '120',
            pointer: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 20,
                opacity: 0
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              length: 7,
              lineStyle: {
                color: {
                  type: 'linear',
                  colorStops: [{
                    offset: 0, color: 'rgba(0, 141, 255, 0.32)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(0, 141, 255, 0.32)' // 100% 处的颜色
                  }],
                },
                width: 1,
                type: 'solid',
              },
            },
            axisLabel: {
              show: false
            }
          },
          /*内心原型图，展示整体数据概览*/
          {
            name: 'pie',
            type: 'pie',
            roundCap: true,
            clockWise: true,
            startAngle: 260,
            labelLine: {
              show: false
            },
            radius: ['20%', '23%'],
            hoverAnimation: false,
            center: ['50%', '45%'],
            data: [
              {
                value: datas.value,
                label: {
                  normal: {
                    // formatter: datas.text +'\n'+'{d}{cell|%}\n{text|'+  '}',
                    formatter: '\n' + '{d}{cell|%}\n{text|}',
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '12',
                      fontWeight: 'normal',
                      color: '#FBC00F',
                      lineHeight: 20,
                      rich: {
                        cell: {
                          fontSize: '14',
                          fontWeight: 'normal',
                          color: '#FBC00F',
                          padding: [0, 0, 0, 5]
                        },
                        text: {
                          fontSize: 12,
                          fontFamily: 'FZLanTingHeiS-L-GB',
                          color: '#BDDCEE',
                          padding: [5, 35, 0, 10]
                        }
                      }
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: new this.$myecharts.graphic.LinearGradient(0, 1, 1, 0, [{
                      offset: 0,
                      color: '#8124FF'
                    }, {
                      offset: 1,
                      color: '#01FFFF'
                    }]),
                    shadowColor: 'rgba(1,1,1,0.5)',
                    shadowBlur: 1
                  }
                }
              },
              {
                value: 100 - datas.value,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'RGBA(5, 44, 78, 1)', // 未完成的圆环的颜色
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: 'RGBA(5, 44, 78, 1)' // 未完成的圆环的颜色
                  }
                }
              }]
          }
        ]
      }
      myChart.setOption(option)
    },
    echarts_3 () {
      let myChart = this.$myecharts.init(document.getElementById("center-two-chart"))

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        grid: {
          top: "20%",
          right: "70",
          bottom: "20",
          left: "50",
        },
        legend: {
          data: ["碳吸收量", "碳汇量"],
          right: "center",
          width: "100%",
          textStyle: {
            color: "#fff",
          },
          itemWidth: 12,
          itemHeight: 10,
        },

        xAxis: [
          {
            type: "category",
            data: ["重庆", "四川", "贵州", "云南", "西藏"],
            axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } },
            axisLabel: {
              textStyle: { color: "rgba(255,255,255,.7)", fontSize: "14" },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位万",
            nameTextStyle:{
              color:'rgba(255,255,255,.6)'
            },
            axisTick: { show: false },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              fontSize: 12,
              color: "rgba(255,255,255,.6)",
            },
            axisLine: {
              min: 0,
              max: 10,
              lineStyle: { color: "rgba(255,255,255,.1)" },
            }, //左线色
          },
          {
            type: "value",
            name: "增速",
            nameTextStyle:{
              color:'rgba(255,255,255,.6)'
            },
            show: true,
            axisLabel: {
              show: true,
              fontSize: 12,
              formatter: "{value}",
              color: "rgba(255,255,255,.6)",
            },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } }, //右线色
            splitLine: {
              show: true,
              lineStyle: { color: "rgba(255,255,255,.1)" },
            }, //x轴线
          },
        ],
        series: [
          {
            name: "碳吸收量",
            type: "bar",
            data: [2558.8, 7439.4, 2974.1, 3656.9, 95.2],
            barWidth: "15%",
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new this.$myecharts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#8bd46e",
                  },
                  {
                    offset: 1,
                    color: "#09bcb7",
                  },
                ]),
              },
            },
            barGap: "0.2",
          },
          {
            name: "碳汇量",
            type: "line",
            yAxisIndex: 1,
            data: [2410.1, 7029.9, 2825.3, 3308.8, 79.8],
            lineStyle: {
              normal: {
                width: 2,
              },
            },
            itemStyle: {
              normal: {
                color: "#fbc30d",
              },
            },
            smooth: true,
          },
        ],
      }
      myChart.setOption(option)
    },
    echarts_4 () {
      let myChart = this.$myecharts.init(document.getElementById("center-three-chart"))
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          // formatter:'{c}' ,
        },
        grid: {
          left: "0",
          top: "40",
          right: "10",
          bottom: "0",
          containLabel: true,
        },
        legend: {
          data: ["经济系数"],
          right: "center",
          top: 0,
          textStyle: {
            color: "#fff",
          },
          itemWidth: 12,
          itemHeight: 10,
          // itemGap: 35
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              // rotate: -90,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 14,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },

            data: ["重庆", "四川", "贵州", "云南", "西藏"],
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            // offset: 20,
          },
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            // splitNumber: 6,
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              formatter: "{value} %",
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
            name: "经济系数",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "rgba(228, 228, 126, 1)",
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
                      color: "rgba(228, 228, 126, .2)",
                    },
                    {
                      offset: 1,
                      color: "rgba(228, 228, 126, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "rgba(228, 228, 126, 1)",
                borderColor: "rgba(228, 228, 126, .1)",
                borderWidth: 12,
              },
            },
            data: [60, 45, 40, 40, 70, 34, 43, 25],
          },
        ],
      }
      myChart.setOption(option)
    },
    echarts_5() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$myecharts.init(document.getElementById("right-one-chart"));

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      grid: {
        top: "18%",
        right: "11%",
        bottom: "20",
        left: "10%",
      },
      legend: {
        data: ["碳排放强度", "碳吸收强度"],
        top: 0,
        textStyle: {
          color: "#fff",
        },
        itemWidth: 12,
        itemHeight: 10,
      },
      xAxis: [
        {
          type: "category",

          data: ["重庆", "四川", "贵州", "云南", "西藏"],
          axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } },
          axisLabel: {
            textStyle: { color: "rgba(255,255,255,.7)", fontSize: "13" },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "单位1",
          nameTextStyle:{
            color:'rgba(255,255,255,.6)'
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: true,
            color: "rgba(255,255,255,.6)",
          },
          axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } }, //左线色
        },
        {
          type: "value",
          name: "单位2",
          nameTextStyle:{
            color:'rgba(255,255,255,.6)'
          },
          show: true,
          axisTick: { show: false },
          axisLabel: {
            show: true,
            formatter: "{value}",
            color: "rgba(255,255,255,.6)",
          },
          axisLine: { lineStyle: { color: "rgba(255,255,255,.1)" } }, //右线色
          splitLine: {
            show: true,
            lineStyle: { color: "rgba(255,255,255,.1)" },
          }, //x轴线
        },
      ],
      series: [
        {
          name: "碳排放强度",
          type: "bar",
          data: [444.4, 422.4, 271.4, 501.6, 564.6],
          barWidth: "20%",

          itemStyle: {
            normal: {
              barBorderRadius: 15,
              color: new this.$myecharts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fccb05",
                },
                {
                  offset: 1,
                  color: "#f5804d",
                },
              ]),
            },
          },
          barGap: "0",
        },
        {
          name: "碳吸收强度",
          type: "line",
          yAxisIndex: 1,
          data: [7648.0, 7675.1, 5425.8, 5270.1, 3506.8],
          lineStyle: {
            normal: {
              width: 2,
            },
          },
          itemStyle: {
            normal: {
              color: "#ff3300",
            },
          },
          smooth: true,
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    },
    echarts_6() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$myecharts.init(document.getElementById("right-three-chart"));

    const option = {
      title: {
        text: "5132",
        subtext: "总共",
        x: "center",
        y: "40%",
        textStyle: {
          color: "#fff",
          fontSize: 20,
          lineHeight: 10,
        },
        subtextStyle: {
          color: "#90979c",
          fontSize: 14,
          lineHeight: 10,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)",
      },

      visualMap: {
        show: false,
        min: 500,
        max: 600,
        inRange: {
          //colorLightness: [0, 1]
        },
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          center: ["50%", "50%"],
          color: ["rgb(131,249,103)", "#FBFE27", "#FE5050", "#1DB7E5"], //'#FBFE27','rgb(11,228,96)','#FE5050'
          data: [
            {
              value: 7203.6,
              name: "重庆",
            },
            {
              value: 7252.6,
              name: "四川",
            },
            {
              value: 5154.3,
              name: "贵州",
            },
            {
              value: 4768.5,
              name: "云南",
            },
            {
              value: 2942.2,
              name: "西藏",
            },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",

          label: {
            normal: {
              formatter: ["{c|{c}}", "{b|{b}}"].join("\n"),
              rich: {
                c: {
                  color: "rgb(241,246,104)",
                  fontSize: 16,
                  fontWeight: "bold",
                  lineHeight: 16,
                },
                b: {
                  color: "rgb(98,137,169)",
                  fontSize: 14,
                  height: 18,
                },
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: "rgb(98,137,169)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
          },
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  returnToHome(){
      this.$router.push('/')
    }

  },

  mounted () {
    this.startTimer();

    this.autoScale(1280, 720)
    window.addEventListener('resize', this.onResize)

    this.echarts_1()
    this.echarts_2()
    this.pie_charts_one()
    this.pie_charts_two()
    this.pie_charts_three()
    this.echarts_3()
    this.echarts_4()
    this.echarts_5()
    this.echarts_6()
  },
  beforeDestroy () {
    this.clearTimer();
    window.removeEventListener('resize', this.onResize)
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

      }
      .contents-center {
        flex: 3;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin:0 5px 5px 5px;

        #center-one{
          flex: 2;
          box-sizing: border-box;
          padding:0 5px 5px 5px;
          .center-one-box{
            display: flex;
            border: 1px solid rgba(25, 186, 139, 0.17);
            height: 100%;
            .center-one-left{
              flex: 2;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              height: 100%;
              padding: 5px;
              div{
                border-bottom: 1px solid rgb(17, 104, 216);
                text-align: center;
                padding: 8px 0;
                position: relative;
              }
              .left-number{
                color: rgb(250, 217, 30);
                font-size: 32px;
                font-weight: bold;
              }
              .left-text{
                color: rgb(241, 211, 39);
                font-size: 20px;
              }
            }
            .center-one-right{
              flex: 3;
              display: flex;
              #pie-one{
                flex: 1;
              }
              #pie-two{
                flex: 1;
              }
              #pie-three{
                flex: 1;
              }
            }  
          }
        }
          
        #center-two{
          flex: 4;
          padding: 5px;
          #center-two-chart{
            border: 1px solid rgba(25, 186, 139, 0.17);
            width: 100%;
            height: 100%;
          }
        }
        #center-three{
          flex: 4;
          
          padding: 5px;
          #center-three-chart{
            border: 1px solid rgba(25, 186, 139, 0.17);
            width: 100%;
            height: 100%;
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
            table {
              width: 100%;
              text-align: center;
              th {
                font-size: 13px;
                background: rgba(0, 0, 0, 0.1);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding: 2px 2px;
              }
              td {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.6);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding: 2px 0;
              }
            }
          }
        }
        #right-three {
          flex: 1;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          margin: 10px 0;
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
