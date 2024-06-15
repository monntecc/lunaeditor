<script setup lang="ts">
import TitlebarActionsComponent from '@/components/system/TitlebarActionsComponent.vue';
import TitlebarMenusComponent from '@/components/system/TitlebarMenusComponent.vue';
</script>

<template>
  <nav data-tauri-drag-region class="titlebar-wrapper">
    <TitlebarMenusComponent />
    <TitlebarActionsComponent />
  </nav>
</template>

<style scoped lang="scss">
.titlebar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  user-select: none;
  z-index: 10000;
  background: rgb(226, 226, 226);
  background: linear-gradient(
    90deg,
    rgba(226, 226, 226, 1) 0%,
    rgba(232, 232, 232, 0.9332107843137255) 65%,
    rgba(231, 231, 231, 1) 90%
  );
}

@media (prefers-color-scheme: dark) {
  .titlebar-wrapper {
    background: rgb(27, 27, 27);
    background: linear-gradient(
      90deg,
      rgba(27, 27, 27, 1) 0%,
      rgba(84, 84, 84, 0.9332107843137255) 65%,
      rgba(68, 68, 68, 1) 90%
    );
  }
}
</style>
