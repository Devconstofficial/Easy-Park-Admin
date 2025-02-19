import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Login from './views/Login.vue'
import ForgetPassword from './views/ForgetPassword.vue'
import VerifyOTP from './views/VerifyOTP.vue'
import NewPassword from './views/NewPassword.vue'
import Users from './views/Users.vue'
import Bookings from './views/Bookings.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword,
    meta: { layout: 'empty' },
  },
  {
    path: '/verify-otp',
    name: 'VerifyOTP',
    component: VerifyOTP,
    meta: { layout: 'empty' },
  },
  {
    path: '/new-create-password',
    name: 'NEWCreatePassword',
    component: NewPassword,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/bookings',
    name: 'Bookings',
    component: Bookings,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
