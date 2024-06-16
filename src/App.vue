<script setup lang="ts">
import { onMounted } from 'vue';

import EditorView from '@/views/EditorView.vue';
import TitlebarComponent from '@/components/system/TitlebarComponent.vue';
import ToolbarComponent from '@/components/ui/ToolbarComponent.vue';
import NotificationPanelComponent from '@/components/ui/NotificationPanelComponent.vue';

import { settingsLoadedEvent } from '@/actions';

onMounted(async () => {
  await settingsLoadedEvent();
});
</script>

<template>
  <TitlebarComponent />
  <main class="wrapper">
    <ToolbarComponent />
    <EditorView />
  </main>
  <NotificationPanelComponent />
</template>

<style scoped lang="scss">
.wrapper {
  min-height: calc(100vh - 32px);
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}
</style>
