<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import NewTabIcon from "@/components/icons/NewTabIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CubeIcon from "@/components/icons/CubeIcon.vue";
import CodeEditorPanel from "@/components/panels/CodeEditorPanel.vue";
import {closeAndSaveToStorage, getStorageState, openEmptyAndSave, updateOpenedState} from "@/utils/editor.ts";
import {FileState, StorageState} from "@/model/StorageState.ts";

const tabState = ref<FileState[]>([]);
const activeTabPanel = ref<string | null>();

const closeIndicated = (id: string) => {
  closeAndSaveToStorage(id, false);
};

const activateSelected = (id: string) => {
  activeTabPanel.value = id;
  tabState.value = tabState.value.map((v: FileState) => ({ ...v, active: false })); // Make all inactive
  const index: number = tabState.value.findIndex((v: FileState) => v.id === id);
  tabState.value[index].active = true;
  updateOpenedState(tabState.value);
};

const currentTabContent = computed(() => {
  return tabState.value.find(tab => tab.id === activeTabPanel.value);
});

const updateStorageState = (state: StorageState): void => {
  tabState.value = state.opened;
  const active: FileState | undefined = state.opened.find((v: FileState) => v.active);
  if (active) activateSelected(active.id);
}

const updateTabContent = (content: string): void => {
  if (!currentTabContent.value) return;
  if (currentTabContent.value.content === content) return;
  currentTabContent.value.content = content;
  updateOpenedState(tabState.value);
}

onMounted(async () => {
  // Called every time, when event dispatched
  // @ts-ignore
  window.addEventListener('storage-state', (event: CustomEvent) => updateStorageState(event.detail.state));
  // Called only once, when component is loaded
  updateStorageState(getStorageState());
});
</script>

<template>
  <div class="tabs-container">
    <div class="tabs-roller">
      <div
          class="tab"
          v-for="tab in tabState"
          :key="tab.id"
          :class="{ active: activeTabPanel === tab.id }"
          @click="activateSelected(tab.id)"
      >
        <div>{{ tab.title }}</div>
        <button class="close-btn" @click.stop="closeIndicated(tab.id)">
          <span><CloseIcon /></span>
        </button>
      </div>
      <button class="add-tab" @click="openEmptyAndSave()">
        <NewTabIcon />
      </button>
    </div>
    <div class="tab-content">
      <div v-if="currentTabContent && currentTabContent.content !== undefined">
        <CodeEditorPanel @change="updateTabContent" :file-path="currentTabContent.path" :buffer="currentTabContent.content" />
      </div>
      <div v-else class="no-content-available">
        <div class="icon">
          <CubeIcon />
        </div>
        <div class="text">Currently solution is empty. Please open a specific file or folder.</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: calc(100vw - 40px);
}

.no-content-available {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(90vh - 40px);

  .text {
    font-weight: 500;
    font-size: calc(100vw / 60);
    max-width: calc(100vw / 2.5);
    line-height: calc(100vw / 50);
    text-align: center;
  }

  .icon {
    width: calc(100vw / 5);
    height: calc(100vw / 5);

    svg {
      fill: #646eb6;
      width: calc(100vw / 5);
      height: calc(100vw / 5);
    }
  }
}

.tabs-roller {
  position: relative;
  display: flex;
  max-width: calc(100% - 40px);

  &:has(.tab) {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
}

.tab {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 4px 12px;
  cursor: pointer;
  background-color: #1e1e1e;
  border-top: 1px solid transparent;
  border-right: 1px solid #2c2c2c;


  &.active {
    border-top-color: #4652b0;
    background-color: #151515;
  }
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  padding: 8px;
  background-color: rgba(15, 15, 15, 0.19);

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 12px;
    height: 12px;
    fill: #bbb;
  }
}

.add-tab {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  padding: 0;
  cursor: pointer;
  position: fixed;
  right: 8px;
  top: 44px;

  svg {
    stroke: #bbb;
  }

  &:has(.tab) {
    &:before {
      position: absolute;
      content: '';
      bottom: -7px;
      width: 40px;
      height: 1px;
      left: -10px;
      background-color: #a6a6a6;
    }
  }
}
</style>