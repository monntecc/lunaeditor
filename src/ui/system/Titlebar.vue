<script setup lang="ts">
import { getCurrentWindow } from "@tauri-apps/api/window";
import { TitlebarAction } from "@/model/TitlebarAction.ts";
import { Ref, ref } from "vue";
import { version } from '../../../package.json';
import DropdopwMenu from "@/ui/system/DropdopwMenu.vue";

const baseImageUrl: string = '/assets/window';
const appVersion: string = version;

const actions: Ref<TitlebarAction[]> = ref([
  // Minimize button action
  {
    name: 'minimize',
    imageUrl: baseImageUrl + '/minimize.png',
    description: 'Minimize button action',
    func: () => getCurrentWindow().minimize(),
  },
  // Maximize button action
  {
    name: 'maximize',
    imageUrl: baseImageUrl + '/maximize.png',
    description: 'Maximize button action',
    func: () => getCurrentWindow().toggleMaximize(),
  },
  // Close button action
  {
    name: 'close',
    imageUrl: baseImageUrl + '/close.png',
    description: 'Close button action',
    func: () => getCurrentWindow().close(),
  },
]);
</script>

<template>
  <nav class="titlebar" data-tauri-drag-region>
    <DropdopwMenu />
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: rgba(51, 51, 51, 0.62);
  }

  &.warn:hover {
    background-color: rgba(255, 63, 63, 0.62);
  }
}
</style>