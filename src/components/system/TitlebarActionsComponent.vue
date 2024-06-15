<script setup lang="ts">
import { ref } from 'vue';

import type { TTitlebarIconType } from '@/components/system/models';

import TitlebarIconComponent from '@/components/system/TitlebarIconComponent.vue';

const actions = ref<TTitlebarIconType[]>(['minimize', 'maximize', 'close']);
</script>

<template>
  <section class="titlebar-actions">
    <template v-for="action in actions">
      <TitlebarIconComponent :type="action" />
    </template>
  </section>
</template>

<style scoped lang="scss">
.titlebar-actions {
  display: block;
  height: 32px;
}
</style>
