<script setup lang="ts">
import TaskForm from '../components/tasks/TaskForm.vue'
import TaskList from '../components/tasks/TaskList.vue'
import { useTasks } from '../composables/useTasks'

const { tasks, activeCount, createTask, toggleTask, removeTask } = useTasks()
</script>

<template>
  <section>
    <h1>Interactive Task Manager</h1>
    <p>{{ activeCount }} active / {{ tasks.length }} total</p>
    <TaskForm @submit="createTask" />
    <TaskList :tasks="tasks" @remove="removeTask" @toggle="toggleTask" />
    <p v-if="!tasks.length">No tasks yet.</p>
  </section>
</template>
