<script setup lang="ts">
import DropdownMenuItem from "@/ui/system/DropdownMenuItem.vue";
import { DropdownMenuParent } from "@/model/DropdownMenuParent.ts";
import { ref, Ref } from "vue";

const menus: Ref<DropdownMenuParent[]> = ref([
  {
    span: 'File',
    children: [
      {
        span: 'Open file',
        shortcut: ['Ctrl', 'O'],
        func: () => console.log('File open'),
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