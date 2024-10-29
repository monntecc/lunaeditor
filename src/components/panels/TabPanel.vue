<script setup lang="ts">
import {ref, computed} from "vue";
import {TabPanelItem} from "@/model/TabPanelItem.ts";
import NewTabIcon from "@/components/icons/NewTabIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CubeIcon from "@/components/icons/CubeIcon.vue";

const tabs = ref<TabPanelItem[]>([]);
const currentTab = ref<number | null>();

const addTab = () => {
  const newTab: TabPanelItem = {
    id: Date.now(), // Unique ID based on timestamp
    title: `Tab ${tabs.value.length + 1}`,
    content: `Content for Tab ${tabs.value.length + 1}`,
  };
  tabs.value.push(newTab);
  selectTab(newTab.id); // Automatically select the new tab
};

const removeTab = (tabId: number) => {
  const index = tabs.value.findIndex(tab => tab.id === tabId);
  if (index !== -1) {
    tabs.value.splice(index, 1);
    if (currentTab.value === tabId) {
      // Select the first tab if the current one is removed
      currentTab.value = tabs.value.length ? tabs.value[0].id : null;
    }
  }
};

const selectTab = (tabId: number) => {
  currentTab.value = tabId;
};

const currentTabContent = computed(() => {
  return tabs.value.find(tab => tab.id === currentTab.value);
});
</script>

<template>
  <div class="tabs-container">
    <div class="tabs-roller">
      <div
          class="tab"
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ active: currentTab === tab.id }"
          @click="selectTab(tab.id)"
      >
        <div>{{ tab.title }}</div>
        <button class="close-btn" @click.stop="removeTab(tab.id)">
          <span><CloseIcon /></span>
        </button>
      </div>
      <button class="add-tab" @click="addTab">
        <NewTabIcon />
      </button>
    </div>
    <div class="tab-content">
      <div v-if="currentTabContent">{{ currentTabContent.content }}</div>
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

.tab-content {
  padding: 10px;
}
</style>