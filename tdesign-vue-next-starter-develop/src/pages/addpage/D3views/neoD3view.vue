<script setup>
import './d3.min.js'
import './neo4jd3'
import api from '../until/api'

import {
  ref,
  onMounted,
  nextTick,
  onBeforeUpdate,
  onUpdated,
  onUnmounted,
  watch,
} from 'vue'

let props = defineProps({
  chart: Object,
  entity_id: String,
  entity_name: String,
})

function generateRandomString(length) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomString = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    randomString += charset[randomIndex]
  }

  return randomString
}

// 调用函数生成长度为10的随机字符串
let chart_id = ref()
chart_id.value = 'a' + Math.random().toString(16).slice(2, 6)
function initChart() {
  const nodeData = {
    results: props.chart.results,
    errors: [],
  }
  init(nodeData)

}

// 初始化函数
function init(nodeData1) {
  console.log('初始化触发……')
  let option = {
    highlight: [
      {
        class: '地理单元',
        property: 'EntityName',
        value: 'NAME',
      },
      // {
      // class: '地名',
      // property: '地理实体大类',
      // value: 'Elem_NAME'
      // }
    ],
    icons: {
      // 'e名木古树': '名木古树',
      // "实验区": "abc",
      // "自然保护区范围": "自然保护区范围",
      // "自然遗迹保护区": "自然遗迹保护区",
      // "管理单元": "管理单元",
      Api: 'gear',
      //                        'BirthDate': 'birthday-cake',
      Cookie: 'paw',
      //                        'CreditCard': 'credit-card',
      //                        'Device': 'laptop',
      Email: 'at',
      Git: 'git',
      Github: 'github',
      Google: 'google',
      //                        'icons': 'font-awesome',
      Ip: 'map-marker',
      Issues: 'exclamation-circle',
      Language: 'language',
      Options: 'sliders',
      Password: 'lock',
      Phone: 'phone',
      Project: 'folder-open',
      SecurityChallengeAnswer: 'commenting',
      User: 'user',
      zoomFit: 'arrows-alt',
      zoomIn: 'search-plus',
      zoomOut: 'search-minus',
    },
    minCollision: 60,
    neo4jData: nodeData1,
    nodeRadius: 25,
    zoomFit: true,
  }
  console.log(option.neo4jData)
  for (const iterator of option.neo4jData.results) {
    console.log(iterator.data);
    for (const data of iterator.data) {
      // console.log(data.graph.nodes);
      for (const node of data.graph.nodes) {
        console.log(node.labels[0])
        option.icons[node.labels[0]] = ' ' + node.labels[0]
      }
    }
  }
  if (props.chart.labels_data) {
    for (const iterator of props.chart.labels_data) {
      option.highlight.push({
        class: iterator,
      })
    }
  }
  console.log(option)
  new Neo4jd3('#' + chart_id.value, option)
}

// 在组件挂载后调用初始化函数
onMounted(() => {
  nextTick(() => {
    try {
      setTimeout(() => {
        initChart()
        cleanText()
        // nextTick(() => {
        //   drawColor()
        //   setTimeout(() => {
        //     cleanColor()
        //   }, 500)
        // })
      })
    } catch (error) {
      initChart()
      // cleanText()
      // drawColor()
      // setTimeout(() => {
      //   cleanColor()
      // }, 500)
      // cleanText()
    }
  })
})

onUpdated(() => {
  try {
    nextTick(() => {
      initChart()
      cleanText()
      // drawColor()
    })
  } catch (error) {
    initChart()

    cleanText()
    // drawColor()
    // setTimeout(() => {
    //   cleanColor()
    // }, 500)
  }
})

function cleanText() {
  var elements = document.getElementsByClassName('text icon')
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i]
    var childNodes = element.childNodes
    for (var j = 0; j < childNodes.length; j++) {
      var childNode = childNodes[j]
      if (childNode.nodeType === Node.TEXT_NODE) {
        childNode.nodeValue = childNode.nodeValue.replace(/&#x/g, '')
      }
    }
  }
}

function drawColor() {
  let dom2 = document.querySelectorAll('.node .outline')
  for (const dom of dom2) {
    console.log(dom.style)
    let rgb_str = dom.style.fill.split(',')
    let rgb_1 = dom.style.fill
    r_1 = rgb_str[0].slice(4)
    g_1 = rgb_str[1]
    b_1 = rgb_str[2].slice(0, -1)
    console.log(r_1, g_1, b_1)
    let r_2 = parseInt(r_1) - 30
    let g_2 = parseInt(g_1) - 30
    let b_2 = parseInt(b_1) - 30
    let rgb_2 = `rgb(${r_2},${g_2},${b_2},0.5)`
    console.log(rgb_2)
    let r_3 = parseInt(r_1) - 150
    let g_3 = parseInt(g_1) - 150
    let b_3 = parseInt(b_1) - 150
    let rgb_3 = `rgb(${r_3},${g_3},${b_3},0.5)`
    dom.style = `fill:${rgb_2} !important;color:${rgb_1};stroke: ${rgb_3};`
    // console.log(dom.style);
  }

  let dom1 = document.querySelector('.node.node-highlighted .outline')
  dom1.style = `-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
            filter: alpha(opacity=50);
            opacity: 0.6;
            fill: #49b5ff !important;
            stroke: #49b5ff !important;
            stroke-width: 15px;
            set:2;
            `
}

function cleanColor() {
  let dom2 = document.querySelectorAll('.node .outline')
  for (const dom of dom2) {
    console.log(dom.style.fill)
    let rgb_str = dom.style.color.split(',')
    // let r_1 = rgb_str[0].slice(5)
    // let g_1 = rgb_str[1]
    // let b_1 = rgb_str[2].slice(0, -1)
    // console.log(r_1, g_1, b_1);
    let rgb_3 = dom.style.stroke
    console.log(rgb_3)
    dom.style = `fill:${dom.style.color} !important;color:${dom.style.color};stroke: ${rgb_3};`
  }

  let dom1 = document.querySelector('.node.node-highlighted .outline')
  dom1.style = `-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
            filter: alpha(opacity=50);
            opacity: 0.5;
            fill: #49b5ff !important;
            stroke: #49b5ff !important;
            stroke-width: 15px;
            set:2;
            `
}

// onBeforeUpdate(() => {
//   initChart()
// })
// onUpdated(() => {
//   initChart()
// })
</script>

<template>
  <div class="neo4jd3" :id="chart_id"></div>
</template>

<style scoped>
/* #neo4jd3 {
  height: 100%;
  width: 100%;
} */

.neo4jd3 {
  height: 100%;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
}

.neo4jd3-graph {
  /* background-image: url("./pageBg.png"); */
  background-color: #ffffff00;
  background-size: cover;
  background-position: center center;
  border: 1px solid #ffffff00;
  border-radius: 5px;
  /* height: 100%; */
  text-align-last: left;
}

/* 右侧关联图谱占比30% */
.neo4jd3-info {
  width: 20%;
  font-size: 16px;
  /* padding: 10px; */
  height: 0px;
  width: 150px;
  background-color: #ffffff00;
  /* position: relative; */
  /* position: fixed; */
  left: 0px;
  top: 0px;
  /* display: none; */
}

.neo4jd3-info a {
  border: 1px solid;
  display: inline-block;
  font-size: 16px;
  line-height: 1.428571429;
  margin-left: 5px;
  margin-top: 5px;
  padding: 6px 12px;
}

.neo4jd3-info a.class {
  color: #fff;
}

.neo4jd3-info a.property {
  background-color: #fff;
  border-color: #ccc;
  color: #333;
}

.neo4jd3-info a.btn {
  margin-left: 5px;
  margin-top: 5px;
  opacity: 1;
}

.neo4jd3-info a.info {
  background-color: #a5abb6;
  border: 1px solid #9aa1ac;
  color: #fff;
}

.node.node-highlighted .ring {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)';
  filter: alpha(opacity=50);
  opacity: 0.5;
  stroke: #888;
  stroke-width: 12px;
}

.node .outline {
  cursor: pointer;
  fill: #a5abb6;
  pointer-events: all;
  stroke: #9aa1ac;
  stroke-width: 2px;
}

.node .ring {
  fill: none;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  opacity: 0;
  stroke: #6ac6ff;
  stroke-width: 8px;
}

.node .text.icon {
  font-family: FontAwesome;
}

.node.selected .ring,
.node:hover .ring {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';
  filter: alpha(opacity=30);
  opacity: 0.3;
}

.relationship {
  cursor: default;
}

.relationship line {
  stroke: #aaa;
}

.relationship .outline {
  cursor: default;
}

.relationship .overlay {
  cursor: default;
  fill: #6ac6ff;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  opacity: 0;
}

.relationship text {
  cursor: default;
}

.relationship.selected .overlay,
.relationship:hover .overlay {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';
  filter: alpha(opacity=30);
  opacity: 0.3;
}

svg {
  cursor: move;
}

.nodes text {
  /* width: 1em; */
  /* display: ; */
  font-size: 9px;
  overflow: hidden;
  /* margin-left: 10px; */
  /* display: none; */
  /* content: '地理单元'; */
  /* position: relative; */
  /* left: 10px; */
  /* margin-left: 5px; */
}
</style>
