import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/login', component: { template: '<h2>Tenant-aware control plane</h2>' } }],
})

describe('smoke', () => {
  it('renders the app shell for login flow', async () => {
    await router.push('/login')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('Modular SaaS Admin Platform')
  })
})
