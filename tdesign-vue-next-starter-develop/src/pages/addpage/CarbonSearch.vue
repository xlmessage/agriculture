<script setup>
import neoD3view from '../addpage/D3views/neoD3view.vue'
import { ref } from 'vue'
let infoChart = ref({
  results: [
    {
      columns: ['user', 'entity'],
      data: [
        {
          graph: {
            nodes: [
              {
                id: '1',
                labels: ['User'],
                properties: {
                  userId: 'eisman',
                },
              },
              {
                id: '2',
                labels: ['Phone'],
                properties: {
                  value: '555-555-5555',
                },
              },
              {
                id: '3',
                labels: ['Address'],
                properties: {
                  zipCode: '90210',
                  country: 'US',
                  city: 'Beverly Hills',
                  state: 'CA',
                },
              },
              {
                id: '4',
                labels: ['BirthDate'],
                properties: {
                  value: 1326322800000,
                },
              },
              {
                id: '5',
                labels: ['Password'],
                properties: {
                  value: '123456',
                },
              },
              {
                id: '6',
                labels: ['Device'],
                properties: {
                  value: 'eisman',
                },
              },
              {
                id: '7',
                labels: ['SecurityChallengeAnswer'],
                properties: {
                  value: 'hCxh',
                },
              },
              {
                id: '8',
                labels: ['Project'],
                properties: {
                  name: 'neo4jd3',
                  title: 'neo4jd3.js',
                  description: 'Neo4j graph visualization using D3.js.',
                  url: 'https://eisman.github.io/neo4jd3',
                },
              },
              {
                id: '9',
                labels: ['Git'],
                properties: {
                  url: 'https://github.com/eisman/neo4jd3',
                },
              },
              {
                id: '10',
                labels: ['Issues'],
                properties: {
                  url: 'https://github.com/eisman/neo4jd3/issues',
                },
              },
              {
                id: '11',
                labels: ['Github'],
                properties: {
                  url: 'https://github.com',
                },
              },
              {
                id: '12',
                labels: ['Project'],
                properties: {
                  name: 'neo4j',
                  title: 'Neo4j',
                  description: 'Graphs for Everyone',
                  url: 'http://neo4j.com',
                },
              },
              {
                id: '13',
                labels: ['Project'],
                properties: {
                  name: 'd3',
                  title: 'D3.js',
                  description: 'Bring data to life with SVG, Canvas and HTML.',
                  url: 'https://d3js.org/',
                },
              },
              {
                id: '14',
                labels: ['Email'],
                properties: {
                  email: 'eeisman@gmail.com',
                },
              },
              {
                id: '15',
                labels: ['CreditCard'],
                properties: {
                  number: '4916928406205705',
                  type: 'visa',
                },
              },
              {
                id: '16',
                labels: ['Options'],
                properties: {},
              },
              {
                id: '17',
                labels: ['Language'],
                properties: {
                  lang: 'en_us',
                },
              },
              {
                id: '18',
                labels: ['Cookie'],
                properties: {
                  value: 'itgnxe0xmvb1tazaqmkpmfzg8m3ma62qskfwcexc',
                },
              },
              {
                id: '19',
                labels: ['Ip'],
                properties: {
                  address: '127.0.0.1',
                },
              },
              {
                id: '20',
                labels: ['icons'],
                properties: {
                  description: 'Map node labels to Font Awesome icons',
                  type: 'object',
                  example: {
                    Address: 'home',
                    BirthDate: 'birthday-cake',
                    Password: 'asterisk',
                    Phone: 'phone',
                    User: 'user',
                  },
                  deafult: '{}',
                },
              },
              {
                id: '21',
                labels: ['zoomIn'],
                properties: {
                  description: 'Scroll up to zoom in.',
                  type: 'function',
                },
              },
              {
                id: '22',
                labels: ['zoomOut'],
                properties: {
                  description: 'Scroll down to zoom out.',
                  type: 'function',
                },
              },
              {
                id: '23',
                labels: ['zoomFit'],
                properties: {
                  description: 'Adjust the graph to the container once it has been loaded.',
                  type: 'boolean',
                  values: [true, false],
                  default: false,
                },
              },
              {
                id: '24',
                labels: ['Api'],
                properties: {},
              },
              {
                id: '25',
                labels: ['Google'],
                properties: {
                  url: 'https://www.google.com/#q="neo4jd3"',
                },
              },
            ],
            relationships: [
              {
                id: '1',
                type: 'HAS_PHONE_NUMBER',
                startNode: '1',
                endNode: '2',
                properties: {
                  from: 1473581532586,
                },
              },
              {
                id: '2',
                type: 'HAS_ADDRESS',
                startNode: '1',
                endNode: '3',
                properties: {
                  from: 1473581532586,
                },
              },
              {
                id: '3',
                type: 'HAS_BIRTH_DATE',
                startNode: '1',
                endNode: '4',
                properties: {
                  from: 1473581532586,
                },
              },
              {
                id: '4',
                type: 'HAS_PASSWORD',
                startNode: '1',
                endNode: '5',
                properties: {
                  from: 1473581532586,
                },
              },
              {
                id: '5',
                type: 'USED_DEVICE',
                startNode: '1',
                endNode: '6',
                properties: {
                  from: 1473581532586,
                },
              },
              {
                id: '6',
                type: 'HAS_SECURITY_ANSWER',
                startNode: '1',
                endNode: '7',
                properties: {
                  from: 1473581532586,
                },
              },
              {
                id: '7',
                type: 'DEVELOPES',
                startNode: '1',
                endNode: '8',
                properties: {
                  from: 1470002400000,
                },
              },
              {
                id: '8',
                type: 'REPOSITORY',
                startNode: '8',
                endNode: '9',
                properties: {},
              },
              {
                id: '9',
                type: 'ISSUES',
                startNode: '8',
                endNode: '10',
                properties: {},
              },
              {
                id: '10',
                type: 'HOSTED_ON',
                startNode: '8',
                endNode: '11',
                properties: {},
              },
              {
                id: '11',
                type: 'HOSTED_ON',
                startNode: '12',
                endNode: '11',
                properties: {},
              },
              {
                id: '12',
                type: 'HOSTED_ON',
                startNode: '13',
                endNode: '11',
                properties: {},
              },
              {
                id: '13',
                type: 'HAS_EMAIL',
                startNode: '1',
                endNode: '14',
                properties: {},
              },
              {
                id: '14',
                type: 'USED_CREDIT_CARD',
                startNode: '1',
                endNode: '15',
                properties: {},
              },
              {
                id: '15',
                type: 'DEPENDS_ON',
                startNode: '8',
                endNode: '12',
                properties: {},
              },
              {
                id: '16',
                type: 'DEPENDS_ON',
                startNode: '8',
                endNode: '13',
                properties: {},
              },
              {
                id: '17',
                type: 'OPTIONS',
                startNode: '8',
                endNode: '16',
                properties: {},
              },
              {
                id: '18',
                type: 'HAS_LANGUAGE',
                startNode: '6',
                endNode: '17',
                properties: {},
              },
              {
                id: '19',
                type: 'HAS_COOKIE',
                startNode: '6',
                endNode: '18',
                properties: {},
              },
              {
                id: '20',
                type: 'HAS_IP',
                startNode: '6',
                endNode: '19',
                properties: {},
              },
              {
                id: '21',
                type: 'ICONS',
                startNode: '16',
                endNode: '20',
                properties: {},
              },
              {
                id: '22',
                type: 'ZOOM_IN',
                startNode: '24',
                endNode: '21',
                properties: {},
              },
              {
                id: '23',
                type: 'ZOOM_OUT',
                startNode: '24',
                endNode: '22',
                properties: {},
              },
              {
                id: '24',
                type: 'ZOOM_FIT',
                startNode: '16',
                endNode: '23',
                properties: {},
              },
              {
                id: '25',
                type: 'API',
                startNode: '8',
                endNode: '24',
                properties: {},
              },
              {
                id: '26',
                type: 'GOOGLE_SEARCH',
                startNode: '8',
                endNode: '25',
                properties: {},
              },
            ],
          },
        },
      ],
    },
  ],
  errors: [],
})

import axios from 'axios'

axios.get('https://console-mock.apipost.cn/mock/ae917e39-3c39-4608-9f6a-1004f17a2c38/calculate/selectCount?apipost_id=a4f39b').then( res => {
  console.log(res);
})


</script>
<template>
  <div class="relationChat">
    
    <div class="rela-left">
      <div class="thistitle">@碳汇查询</div>
      <div class="search">
        <t-input :style="{ width: '100%' }" />
        <t-button variant="outline"> 查询 </t-button>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">实体1</th>
            <th scope="col">关系</th>
            <th scope="col">实体2</th>
            <th scope="col">说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">碳排放</th>
            <td>instart of</td>
            <td>重庆</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">碳排放</th>
            <td>instart of</td>
            <td>重庆</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">碳排放</th>
            <td>instart of</td>
            <td>重庆</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rela-right">
      <neoD3view :chart="infoChart" />
    </div>
  </div>
</template>

<style scoped>
.relationChat {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
}
.rela-left {
  flex: 2;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
}
.thistitle{
  width: 100%;
  text-align: left;
  color: rgb(19, 122, 182);
  font-weight: bold;
  font-size: 13px;
  padding: 10% 0 5%;
  border-bottom: 1px solid rgba(19, 122, 182, .2);
}
.search {
  display: flex;
  width: 100%;
  margin: 4% 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

thead,
tfoot {
  background-color: rgb(228 240 245);
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

.rela-right {
  flex: 3;
  /* border-bottom: 1px solid rgba(19, 122, 182, .2); */
  border: 1px solid rgb(204, 198, 198);
  box-sizing: border-box;
  margin-left: 10px;
}
</style>
