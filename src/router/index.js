import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/peopleSelectTree',
    name: 'peopleSelectTree',
    component: () => import('../views/peopleSelectTree')
  },
  {
    path: '/taskWeekCalendar',
    name: 'taskWeekCalendar',
    component: () => import('../views/taskWeekCalendar')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
