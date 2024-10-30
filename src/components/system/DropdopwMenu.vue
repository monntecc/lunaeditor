<script setup lang="ts">
import DropdownMenuItem from "@/components/system/DropdownMenuItem.vue";
import { DropdownMenuParent } from "@/model/DropdownMenuParent.ts";
import { ref, Ref } from "vue";
import { closeWindow } from "@/utils/window.ts";
import {openAndSaveToStorage, saveFileAs} from "@/utils/editor.ts";

const menus: Ref<DropdownMenuParent[]> = ref([
  {
    span: 'File',
    children: [
      {
        span: 'Open file',
        shortcut: ['Ctrl', 'O'],
        func: () => openAndSaveToStorage(),
      },
      {
        span: 'Open folder',
        shortcut: ['Ctrl', 'K'],
        func: () => openAndSaveToStorage(true),
      },
      {
        span: 'Save as',
        shortcut: ['Ctrl', 'L'],
        func: () => saveFileAs(),
      },
      {
        span: 'Exit',
        shortcut: ['Alt', 'F4'],
        func: () => closeWindow(),
      }
    ]
  },
  {
    span: 'About',
    children: [
      {
        span: 'Github',
        func: () => window.open('https://github.com/monntecc/lunaeditor'),
      }
    ]
  }
]);
</script>

<template>
  <div class="titlebar-menu">
    <template v-for="menu in menus">
      <DropdownMenuItem :parent="menu" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.titlebar-menu {
  position: relative;
  display: flex;
  z-index: 9999;
}
</style>