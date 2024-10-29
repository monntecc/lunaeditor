<script setup lang="ts">
import {h, onBeforeUnmount, ref} from "vue";
import { PrimarySidebarPanel } from "@/model/PrimarySidebarPanel.ts";
import FileExplorerIcon from "@/components/icons/FileExplorerIcon.vue";
import FileExplorerPanel from "@/components/panels/FileExplorerPanel.vue";

// Panel staff
const panels = ref<PrimarySidebarPanel[]>([
  {
    name: 'explorer',
    title: 'Explorer',
    component: () => h(FileExplorerPanel),
    iconComponent: () => h(FileExplorerIcon)
  }
]);
const selectedPanel = ref<PrimarySidebarPanel>();

// Resize staff
const width = ref(300);  // Initial width
const isResizing = ref(false);
let startX = 0;

const onMouseDown = (event: MouseEvent) => {
  startX = event.clientX;
  isResizing.value = true;

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
  if (isResizing.value) {
    const dx = event.clientX - startX;

    width.value = Math.max(width.value + dx, 150); // Minimum width

    startX = event.clientX;
  }
};

const onMouseUp = () => {
  isResizing.value = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

const onResizeMouseDown = (event: MouseEvent) => {
  event.stopPropagation();
  onMouseDown(event);
};

// Cleanup listeners when the component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});


const isActive = (name: string): boolean => {
  if (!selectedPanel.value) return false;
  return selectedPanel.value.name === name;
};

const triggerSelect = (panel: PrimarySidebarPanel): void => {
  if (!selectedPanel.value) selectedPanel.value = panel;
  else if (selectedPanel.value.name === panel.name) selectedPanel.value = undefined;
  else selectedPanel.value = panel;
}
</script>

<template>
  <div class="primary-sidebar-wrapper">
    <div class="panel-wrapper">
      <div
          class="panel-wrapper-item"
          :class="{ active: isActive(panel.name) }"
          v-for="panel in panels"
          @click="triggerSelect(panel)"
      >
        <component :is="panel.iconComponent"></component>
      </div>
    </div>
    <div
        v-if="selectedPanel"
        class="content-panel"
        :style="{ width: width + 'px' }"
    >
      <component :is="selectedPanel.component"></component>
      <div class="resize-handle"
           data-target="aside"
           @mousedown.stop="onResizeMouseDown"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.primary-sidebar-wrapper {
  position: relative;
  display: flex;
  height: 100%;
}

.panel-wrapper {
  width: 40px;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #181818;
  color: #0f0f0f;
}

.panel-wrapper-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:first-child {
    margin-top: 8px;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: #bbb;
    transition: 0.12s all ease-in-out;
  }

  &:hover {
    svg { stroke: #646eb6!important; }
  }

  &.active {
    svg { stroke: #4652b0; }
  }
}

.content-panel {
  position: relative;
  max-width: 600px;
  background-color: #1e1e1e;
}

.resize-handle {
  height: 100%;
  background-color: #464646;
  width: 1px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: ew-resize;

  // these prevent text selection while dragging
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  transition: background-color 0.2s ease-out, width 0.2s ease-out;

  &:hover {
    background-color: #4652b0;
  }

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 24px;
    position: absolute;
    right: -12px;
    z-index: 1;
  }

  &.resizing::after {
    width: 100px;
    right: calc(-100px / 2);
  }
}
</style>