/* eslint-disable simple-import-sort/imports */
import './assets/main.css'

import TDesign from 'tdesign-vue-next';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';
import i18n from './locales';

import 'tdesign-vue-next/es/style/index.css';
import '@/style/index.less';
import './permission';

import myecharts from './myecharts/index'


const app = createApp(App);

app.use(TDesign);
app.use(store);
app.use(router);
app.use(i18n);

// 注册
app.config.globalProperties.$myecharts = myecharts

app.mount('#app');
