import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { apps } from './data'
import { routes, scrollBehavior } from './router'
import './style.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior,
  },
)

export function includedRoutes(paths) {
  return [
    ...paths.filter((path) => !path.includes(':')),
    ...apps.map((app) => `/apps/${app.packageName}`),
  ]
}
