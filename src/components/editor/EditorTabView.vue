<script setup lang="ts">
import EditorTabComponent from './EditorTabComponent.vue';

import { useFileStore } from '@/stores/file.store';

const fileStore = useFileStore();
</script>

<template>
  <div class="editor-tabs">
    <div class="tabs-container">
      <div class="tab-wrapper">
        <template v-for="tab in fileStore.getAsTabs">
          <EditorTabComponent
            :tab="tab"
            :active="tab.id === fileStore.active?.tabId"
            @close="fileStore.closeFile(tab.id)"
            @set-active="fileStore.setActive(tab.id)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.editor-tabs {
  width: 100%;
}

.tabs-container {
  width: 100%;
  display: flex;
  overflow-x: auto;
}

.tab-wrapper {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: 34px;
  padding: 0 4px;
  border-radius: 4px;
  min-width: 0;
  transition: 0.5s;
}

.add-tab {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  align-self: center;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #ccc;
    color: black;
  }
}
</style>
