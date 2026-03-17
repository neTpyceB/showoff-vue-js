import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/login', component: { template: '<h1>Real-time Collaboration Dashboard</h1>' } },
    { path: '/', component: { template: '<h1>Dashboard</h1>' } },
  ],
})

describe('smoke', () => {
  it('renders login shell', async () => {
    router.push('/login')
    await router.isReady()
    const wrapper = mount(App, { global: { plugins: [router] } })

    expect(wrapper.text()).toContain('Real-time Collaboration Dashboard')
  })
})
