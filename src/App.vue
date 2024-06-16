<script setup lang="ts">
import { onMounted, ref } from 'vue';

import EditorView from '@/views/EditorView.vue';
import TitlebarComponent from '@/components/system/TitlebarComponent.vue';
import ToolbarComponent from '@/components/ui/ToolbarComponent.vue';
import NotificationPanelComponent from '@/components/ui/NotificationPanelComponent.vue';
import ToolbarSidenavComponent from '@/components/ui/ToolbarSidenavComponent.vue';

import { EToolbarElType } from '@/components/ui/models';

import { settingsLoadedEvent } from '@/actions';

const openedBar = ref<EToolbarElType | null>(null);

onMounted(async () => {
  await settingsLoadedEvent();
});

const onBarClick = (bar: EToolbarElType | null) => {
  if (openedBar.value === bar) {
    // Closes sidenav if the same bar was clicked
    openedBar.value = null;
  } else {
    openedBar.value = bar;
  }
};

const isTreeOpened = (): boolean => openedBar.value === EToolbarElType.FILE_TREE;
const isGitOpened = (): boolean => openedBar.value === EToolbarElType.GIT_TOOL_BOX;
const isLogsOpened = (): boolean => openedBar.value === EToolbarElType.EDITOR_LOGS;
</script>

<template>
  <TitlebarComponent />
  <main class="wrapper">
    <ToolbarComponent @bar-clicked="onBarClick" />

    <ToolbarSidenavComponent v-if="openedBar">
      <!-- TODO: Implement separated components for tree, git and logs -->
      <span v-if="isTreeOpened()">File tree</span>
      <span v-if="isGitOpened()">GitToolBox</span>
      <span v-if="isLogsOpened()">Editor logs</span>
    </ToolbarSidenavComponent>

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
