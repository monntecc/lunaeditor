<script setup lang="ts">
import CodeSpaceComponent from '@/components/editor/CodeSpaceComponent.vue';
</script>

<template>
  <section class="editor">
    <CodeSpaceComponent />
  </section>
</template>

<style scoped lang="scss">
.editor {
  width: 100%;
  height: calc(100vh - 32px);
}
</style>
