<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { marked } from 'marked'
import { toTagInput } from '../../lib/tags'
import type { Article } from '../../types/kb'

const props = defineProps<{ editing: Article | null }>()
const emit = defineEmits<{
  save: [payload: { title: string; content: string; tagsInput: string }]
  cancel: []
}>()

const title = ref('')
const content = ref('')
const tagsInput = ref('')

watch(
  () => props.editing,
  (value) => {
    title.value = value?.title ?? ''
    content.value = value?.content ?? ''
    tagsInput.value = value ? toTagInput(value.tags) : ''
  },
  { immediate: true },
)

const preview = computed(() => marked.parse(content.value || '_No content_'))

function submit() {
  emit('save', {
    title: title.value,
    content: content.value,
    tagsInput: tagsInput.value,
  })

  if (!props.editing) {
    title.value = ''
    content.value = ''
    tagsInput.value = ''
  }
}
</script>

<template>
  <section class="editor">
    <h2>{{ editing ? 'Edit Article' : 'New Article' }}</h2>
    <form @submit.prevent="submit">
      <input v-model="title" aria-label="Title" placeholder="Article title" required />
      <input v-model="tagsInput" aria-label="Tags" placeholder="tags, comma, separated" />
      <textarea v-model="content" aria-label="Markdown" rows="10" placeholder="# Markdown"></textarea>
      <div class="actions">
        <button type="submit">{{ editing ? 'Update' : 'Publish' }}</button>
        <button v-if="editing" type="button" @click="emit('cancel')">Cancel</button>
      </div>
    </form>
    <article class="preview" v-html="preview" />
  </section>
</template>

<style scoped>
.editor {
  display: grid;
  gap: 1rem;
}
form {
  display: grid;
  gap: 0.5rem;
}
textarea {
  resize: vertical;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.preview {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
}
</style>
