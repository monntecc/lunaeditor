<script setup lang="ts">
import { ref } from 'vue';

import type { ITitlebarMenu } from '@/components/system/models';

import TitlebarMenuComponent from '@/components/system/TitlebarMenuComponent.vue';
import TitlebarLogoComponent from '@/components/system/TitlebarLogoComponent.vue';

import { titlebarMenus } from '@/components/system/data';

const menus = ref<ITitlebarMenu[]>(titlebarMenus);
</script>

<template>
  <section class="titlebar-menus">
    <TitlebarLogoComponent />
    <template v-for="menu in menus">
      <TitlebarMenuComponent :menu="menu" />
    </template>
  </section>
</template>

<style scoped lang="scss">
.titlebar-menus {
  position: relative;
  display: flex;
  gap: 12px;
  z-index: 10000;
}
</style>
