import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/carbon-four',
    name: 'carbon-four',
    component: Layout,
    redirect: '/carbon-four/catalogue',
    meta: {
      title: {
        zh_CN: '碳汇目录',
        en_US: 'carboncatalogue',
      },
      icon: 'list',
    },
    children: [
      {
        path: 'catalogue',
        name: 'catalogue',
        component: () => import('@/pages/addpage/CarbonCatalogue.vue'),
        meta: {
          title: {
            zh_CN: '目录',
            en_US: 'catalogue',
          },
        },
      },
    ],
  },
];