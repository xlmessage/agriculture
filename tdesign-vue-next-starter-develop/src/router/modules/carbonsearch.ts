import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/carbon-two',
    name: 'carbon-two',
    component: Layout,
    redirect: '/carbon-two/search',
    meta: {
      title: {
        zh_CN: '碳汇搜索',
        en_US: 'carbonsearch',
      },
      icon: 'search',
    },
    children: [
      {
        path: 'search',
        name: 'search',
        component: () => import('@/pages/addpage/CarbonSearch.vue'),
        meta: {
          title: {
            zh_CN: '搜索',
            en_US: 'search',
          },
        },
      },
      
    ],
  },
];
