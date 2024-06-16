<template>
  <div class="editor-tabs">
    <div class="tabs-container">
      <div class="tab-wrapper">
        <Tab
          v-for="tab in tabs"
          :key="tab.id"
          :id="tab.id"
          :name="tab.name"
          :is-active="tab.id === activeTabId"
          @close="closeTab(tab.id)"
          @set-active="setActiveTab(tab.id)"
        />
      </div>
      <!-- <span class="add-tab" @click="addTab">+</span> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Tab from './EditorTabComponent.vue';

interface TabData {
  id: string;
  name: string;
}

const tabs = ref<TabData[]>([
  { id: '1', name: 'First Tab with a Very Long Name That Should Be Truncated' },
  { id: '2', name: 'Second Tab with Another Long Name' }
]);

const activeTabId = ref<string>('1');

function closeTab(id: string) {
  tabs.value = tabs.value.filter((tab) => tab.id !== id);
  if (activeTabId.value === id && tabs.value.length > 0) {
    activeTabId.value = tabs.value[0].id;
  }
}

// function addTab() {
//   const newId = (tabs.value.length ? parseInt(tabs.value[tabs.value.length - 1].id) + 1 : 1).toString();
//   tabs.value.push({ id: newId, name: 'New Tab' });
//   activeTabId.value = newId;
// }

function setActiveTab(id: string) {
  activeTabId.value = id;
}
</script>

<style lang="scss">
.editor-tabs {
  width: 100%;
}

.tabs-container {
  display: flex;
  overflow-x: auto; /* Allow horizontal scrolling if tabs overflow */
}

.tab-wrapper {
  display: flex;
  gap: 5px; /* Optional: Adds space between tabs */
  padding: 5px 8px;
  border-radius: 4px;
  min-width: 0; /* Ensure flex items can shrink beyond their intrinsic width */
  transition: 0.5s;
}

.add-tab {
  flex-shrink: 0; /* Prevents the add-tab button from shrinking */
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  align-self: center; /* Aligns the button vertically centered with tabs */

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #ccc;
    color: black;
  }
}
</style>
