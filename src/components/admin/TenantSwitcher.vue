<script setup lang="ts">
import type { TenantMembership } from '../../types/saas'

defineProps<{
  modelValue: string
  tenants: TenantMembership[]
}>()

const emit = defineEmits<{ 'update:modelValue': [tenantId: string] }>()
</script>

<template>
  <label class="tenant-picker">
    <span>Tenant</span>
    <select :value="modelValue" aria-label="Tenant" @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
      <option v-for="tenant in tenants" :key="tenant.tenantId" :value="tenant.tenantId">
        {{ tenant.name }} / {{ tenant.role }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.tenant-picker {
  display: grid;
  gap: 0.35rem;
}
select {
  min-width: 16rem;
}
</style>
