# Architecture

## Overview
- `src/composables/useTasks.ts`: task domain state and CRUD operations.
- `src/components/tasks/TaskForm.vue`: controlled create form.
- `src/components/tasks/TaskList.vue`: presentational list and action events.
- `src/views/TasksView.vue`: page composition and feature orchestration.
- `src/router/index.ts`: route definitions (`/`, `/about`).

## State model
- Single source of truth: `tasks: Ref<Task[]>`.
- Persistence: deep `watch` into `localStorage` key `task-manager:v1`.
- Derived state: `activeCount` computed value.
