
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/sounding',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Sounding.vue') }
    ]
  },
  {
    path: '/stforecast',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/StationForecast.vue') }
    ]
  },
  {
    path: '/observation',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Observation.vue') }
    ]
  },
  {
    path: '/ringanalysis',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RingAnalysis.vue') }
    ]
  },
  {
    path: '/typhoonsim',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TyphoonSim.vue') }
    ]
  },
  {
    path: '/fengyuobs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FengyuObs.vue') }
    ]
  },
  {
    path: '/ureg',
    component: () => import('pages/UserReg.vue')
  },
  {
    path: '/ulogin',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/soundingp',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/protected/Sounding.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
