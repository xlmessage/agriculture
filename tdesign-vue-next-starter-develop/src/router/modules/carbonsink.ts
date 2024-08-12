import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/carbon-one',
    name: 'carbon-one',
    component: Layout,
    redirect: '/carbon-one/calculate',
    meta: {
      title: {
        zh_CN: '碳汇计算',
        en_US: 'carbonsink',
      },
      icon: 'calculator',
    },
    children: [
      {
        path: 'calculate',
        name: 'calculate',
        component: () => import('@/pages/addpage/CarbonSink.vue'),
        meta: {
          title: {
            zh_CN: '计算',
            en_US: 'calculate',
          },
        },
      },
      
    ],
  },
];
