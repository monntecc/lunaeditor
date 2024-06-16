<script setup lang="ts">
import { onMounted } from 'vue';

import EditorView from '@/views/EditorView.vue';
import TitlebarComponent from '@/components/system/TitlebarComponent.vue';
import NotificationPanelComponent from '@/components/ui/NotificationPanelComponent.vue';

import { settingsLoadedEvent } from '@/actions';

onMounted(async () => {
  await settingsLoadedEvent();
});
</script>

<template>
  <TitlebarComponent />
  <main class="wrapper">
    <EditorView />
  </main>
  <NotificationPanelComponent />
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
  margin-top: 32px;
  padding: 2px 8px;
}
</style>
