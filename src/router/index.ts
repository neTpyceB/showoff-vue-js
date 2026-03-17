import { createRouter, createWebHistory } from 'vue-router'
import PlatformShellView from '../views/PlatformShellView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:tenantId',
      name: 'platform',
      component: PlatformShellView,
      meta: { auth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('saas-token')
  const activeTenant = localStorage.getItem('saas-active-tenant')

  if (to.meta.auth && !token) {
    return '/login'
  }

  if (to.path === '/login' && token && activeTenant) {
    return `/${activeTenant}`
  }

  return true
})

export default router
