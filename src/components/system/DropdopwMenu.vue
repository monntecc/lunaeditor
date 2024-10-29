<script setup lang="ts">
import DropdownMenuItem from "@/components/system/DropdownMenuItem.vue";
import { DropdownMenuParent } from "@/model/DropdownMenuParent.ts";
import { ref, Ref } from "vue";
import { openFile } from "@/utils/file-system.ts";
import { closeWindow } from "@/utils/window.ts";

const menus: Ref<DropdownMenuParent[]> = ref([
  {
    span: 'File',
    children: [
      {
        span: 'Open file',
        shortcut: ['Ctrl', 'O'],
        func: () => openFile({ multiple: false, directory: false }),
      },
      {
        span: 'Open folder',
        shortcut: ['Ctrl', 'K'],
        func: () => openFile({ multiple: false, directory: true }),
      },
      {
        span: 'Exit',
        shortcut: ['Alt', 'F4'],
        func: () => closeWindow(),
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
  gap: 12px;
  z-index: 9999;
}
</style>