import Vue from 'vue'
import Router from 'vue-router'
import Home from './views'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '_home',
      component: Home
    },
    {
      path: '/article',
      component: Home,
      children: [
        {
          path: '/',
          name: 'article',
          component: () => import('./views/article')
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.getItem('token')
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
