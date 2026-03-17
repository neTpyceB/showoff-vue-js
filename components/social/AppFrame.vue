<template>
  <div class="frame">
    <header class="frame-header">
      <div>
        <p class="eyebrow">Large-scale Social Frontend</p>
        <h1>PulseLine</h1>
      </div>
      <div class="pill-row">
        <span>Nuxt SSR</span>
        <span>Edge cached</span>
        <span>Realtime stream</span>
      </div>
    </header>
    <slot />
  </div>
</template>

<style scoped>
.frame {
  max-width: 86rem;
  margin: 0 auto;
  padding: 1.1rem;
}
.frame-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
}
.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--coral);
}
.pill-row {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}
.pill-row span {
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--line);
}
@media (max-width: 820px) {
  .frame-header {
    flex-direction: column;
    align-items: start;
  }
}
</style>
