<script setup lang="ts">
defineProps<{ items: Array<{ id: string; title: string; viewers: string }> }>()
</script>

<template>
  <section class="story-rail">
    <article v-for="item in items" :key="item.id">
      <strong>{{ item.title }}</strong>
      <span>{{ item.viewers }} live viewers</span>
    </article>
  </section>
</template>

<style scoped>
.story-rail {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
}
article {
  display: grid;
  gap: 0.35rem;
  padding: 0.9rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--line);
}
</style>
