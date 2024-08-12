import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/carbon-three',
    name: 'carbon-three',
    component: Layout,
    redirect: '/carbon-three/details',
    meta: {
      title: {
        zh_CN: '碳汇详情',
        en_US: 'carbondetails',
      },
      icon: 'article',
    },
    children: [
      {
        path: 'details',
        name: 'details',
        component: () => import('@/pages/addpage/CarbonDetails.vue'),
        meta: {
          title: {
            zh_CN: '详情',
            en_US: 'details',
          },
        },
      },
    ],
  },
];
