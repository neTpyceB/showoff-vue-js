import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'
import TasksView from '../views/TasksView.vue'

describe('smoke', () => {
  it('renders app shell and task page', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: TasksView }],
    })
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    expect(wrapper.text()).toContain('Interactive Task Manager')
  })
})
