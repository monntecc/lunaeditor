<script setup lang="ts">
import EditorView from '@/views/EditorView.vue';
import TitlebarComponent from '@/components/system/TitlebarComponent.vue';
</script>

<template>
  <TitlebarComponent />
  <main class="wrapper">
    <EditorView />
  </main>
</template>

<style scoped>
.wrapper {
  position: relative;
  margin-top: 32px;
  padding: 2px 8px;
}
</style>
