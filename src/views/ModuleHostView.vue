<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { usePlatform } from '../composables/usePlatform'
import { getModuleComponent } from '../lib/module-registry'
import { canAccess } from '../lib/permissions'

const props = defineProps<{ moduleKey: string }>()

const auth = useAuth()
const platform = usePlatform()
const route = useRoute()

const moduleItem = computed(() => platform.bootstrap.value?.modules.find((item) => item.key === props.moduleKey) ?? null)
const component = computed(() => getModuleComponent(props.moduleKey))
const canManage = computed(() => canAccess(platform.bootstrap.value?.policies ?? [], props.moduleKey, 'manage'))

async function run() {
  if (!moduleItem.value) return
  await platform.runAction(auth.token.value, String(route.params.tenantId), moduleItem.value.key)
}
</script>

<template>
  <component
    :is="component"
    v-if="moduleItem"
    :can-manage="canManage"
    :summary="moduleItem.summary"
    :title="moduleItem.title"
    @run="run"
  />
</template>
