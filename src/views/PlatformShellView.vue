<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import SidebarNav from '../components/admin/SidebarNav.vue'
import TenantSwitcher from '../components/admin/TenantSwitcher.vue'
import { useAuth } from '../composables/useAuth'
import { usePlatform } from '../composables/usePlatform'
import { routeNameFor, syncTenantRoutes } from '../lib/dynamic-routes'

const auth = useAuth()
const platform = usePlatform()
const route = useRoute()
const router = useRouter()

const currentTenantId = computed(() => String(route.params.tenantId ?? auth.activeTenantId.value))

async function bootstrapTenant(tenantId: string) {
  auth.setActiveTenant(tenantId)
  await platform.load(auth.token.value, tenantId)

  if (!platform.bootstrap.value) return

  syncTenantRoutes(router, tenantId, platform.bootstrap.value.modules)

  const firstModule = platform.bootstrap.value.modules[0]
  if (!firstModule) return

  const currentName = String(route.name ?? '')
  if (!currentName.startsWith(`tenant:${tenantId}:`)) {
    await router.replace({ name: routeNameFor(tenantId, firstModule.key), params: { tenantId } })
  }
}

onMounted(() => {
  if (currentTenantId.value) {
    void bootstrapTenant(currentTenantId.value)
  }
})

watch(
  () => route.params.tenantId,
  (tenantId) => {
    if (typeof tenantId === 'string' && tenantId && tenantId !== auth.activeTenantId.value) {
      void bootstrapTenant(tenantId)
    }
  },
)

async function onTenantChange(tenantId: string) {
  platform.clearMessages()
  await router.push(`/${tenantId}`)
}
</script>

<template>
  <section class="workspace">
    <aside class="sidebar-panel">
      <TenantSwitcher :model-value="currentTenantId" :tenants="auth.tenants.value" @update:model-value="onTenantChange" />
      <div v-if="platform.bootstrap.value" class="tenant-card">
        <p class="tenant-accent">{{ platform.bootstrap.value.membership.role }}</p>
        <h2>{{ platform.bootstrap.value.tenant.name }}</h2>
        <p>Enabled modules resolve from the tenant manifest returned by the gateway.</p>
      </div>
      <SidebarNav
        v-if="platform.bootstrap.value"
        :items="platform.bootstrap.value.navigation"
        :tenant-id="currentTenantId"
      />
    </aside>

    <main class="content-panel">
      <p v-if="platform.loading.value">Loading tenant workspace...</p>
      <p v-if="platform.notice.value" class="notice success">{{ platform.notice.value }}</p>
      <p v-if="platform.error.value" class="notice error">{{ platform.error.value }}</p>
      <RouterView />
    </main>
  </section>
</template>

<style scoped>
.workspace {
  display: grid;
  grid-template-columns: 19rem 1fr;
  gap: 1rem;
}
.sidebar-panel,
.content-panel {
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  background: var(--panel);
  backdrop-filter: blur(14px);
}
.tenant-card {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 1rem;
  background: var(--panel-strong);
}
.tenant-accent {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
}
.notice {
  padding: 0.8rem 1rem;
  border-radius: 0.8rem;
}
.success {
  background: rgba(64, 130, 109, 0.16);
}
.error {
  background: rgba(176, 69, 56, 0.14);
}
@media (max-width: 960px) {
  .workspace {
    grid-template-columns: 1fr;
  }
}
</style>
