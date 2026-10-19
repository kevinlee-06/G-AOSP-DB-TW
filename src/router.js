import OverviewView from './views/OverviewView.vue'
import AppDetailView from './views/AppDetailView.vue'
import AboutView from './views/AboutView.vue'

export const routes = [
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
]

export const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  return { top: 0 }
}
