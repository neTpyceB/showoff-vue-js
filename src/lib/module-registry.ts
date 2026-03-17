import type { Component } from 'vue'
import AnalyticsModule from '../components/admin/modules/AnalyticsModule.vue'
import BillingModule from '../components/admin/modules/BillingModule.vue'
import CrmModule from '../components/admin/modules/CrmModule.vue'
import SettingsModule from '../components/admin/modules/SettingsModule.vue'
import UnsupportedModule from '../components/admin/modules/UnsupportedModule.vue'

const registry: Record<string, Component> = {
  analytics: AnalyticsModule,
  billing: BillingModule,
  crm: CrmModule,
  settings: SettingsModule,
}

export function getModuleComponent(key: string) {
  return registry[key] ?? UnsupportedModule
}

export function getRegisteredModuleKeys() {
  return Object.keys(registry)
}
