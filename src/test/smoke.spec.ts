import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/login', component: { template: '<h1>Developer Knowledge Base</h1>' } },
    { path: '/', component: { template: '<h1>KB</h1>' } },
  ],
})

describe('smoke', () => {
  it('renders app shell', async () => {
    router.push('/login')
    await router.isReady()
    const wrapper = mount(App, { global: { plugins: [router] } })

    expect(wrapper.text()).toContain('Developer Knowledge Base')
  })
})
