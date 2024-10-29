<script setup lang="ts">
import { TitlebarAction } from "@/model/TitlebarAction.ts";
import { Ref, ref } from "vue";
import { version } from '../../../package.json';
import DropdownMenu from "@/components/system/DropdopwMenu.vue";
import { closeWindow, maximizeWindow, minimizeWindow } from "@/utils/window.ts";

const baseImageUrl: string = '/assets/window';
const appVersion: string = version;

const actions: Ref<TitlebarAction[]> = ref([
  // Minimize button action
  {
    name: 'minimize',
    imageUrl: baseImageUrl + '/minimize.png',
    description: 'Minimize button action',
    func: () => minimizeWindow(),
  },
  // Maximize button action
  {
    name: 'maximize',
    imageUrl: baseImageUrl + '/maximize.png',
    description: 'Maximize button action',
    func: () => maximizeWindow(),
  },
  // Close button action
  {
    name: 'close',
    imageUrl: baseImageUrl + '/close.png',
    description: 'Close button action',
    func: () => closeWindow(),
  },
]);
</script>

<template>
  <nav class="titlebar" data-tauri-drag-region>
    <DropdownMenu />
    <div class="title" data-tauri-drag-region>Luna Editor [{{ appVersion }}]</div>
    <div><div
        :class="{ 'titlebar-button': action, 'warn': action.name === 'close' }"
        v-for="action in actions"
        @click="action.func()"
    >
      <img :src="action.imageUrl" :alt="action.description">
    </div></div>
  </nav>
</template>

<style scoped lang="scss">
.titlebar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #181818;
  user-select: none;
}

.title {
  font-weight: 500;
  opacity: 0.75;
}

.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  user-select: none;
  -webkit-user-select: none;
  transition: background-color 0.2s;

  img {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: rgba(51, 51, 51, 0.62);
  }

  &.warn:hover {
    background-color: rgba(255, 63, 63, 0.62);
  }
}
</style>