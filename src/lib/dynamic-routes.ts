import type { Router } from 'vue-router'
import ModuleHostView from '../views/ModuleHostView.vue'
import type { ModuleManifest } from '../types/saas'

let activeRouteNames: string[] = []

export function syncTenantRoutes(router: Router, tenantId: string, modules: ModuleManifest[]) {
  for (const routeName of activeRouteNames) {
    if (router.hasRoute(routeName)) {
      router.removeRoute(routeName)
    }
  }

  activeRouteNames = modules.map((moduleItem) => routeNameFor(tenantId, moduleItem.key))

  for (const moduleItem of modules) {
    router.addRoute('platform', {
      path: moduleItem.path,
      name: routeNameFor(tenantId, moduleItem.key),
      component: ModuleHostView,
      props: { moduleKey: moduleItem.key },
      meta: { tenantId, moduleKey: moduleItem.key },
    })
  }
}

export function routeNameFor(tenantId: string, moduleKey: string) {
  return `tenant:${tenantId}:${moduleKey}`
}
