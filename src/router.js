import { createRouter, createWebHashHistory } from 'vue-router'
import OverviewView from './views/OverviewView.vue'
import AppDetailView from './views/AppDetailView.vue'
import AboutView from './views/AboutView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: OverviewView,
    },
    {
      path: '/apps/:packageName',
      component: AppDetailView,
    },
    {
      path: '/about',
      component: AboutView,
    },
  ],
})
