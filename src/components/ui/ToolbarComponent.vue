<script setup lang="ts">
import { ref } from 'vue';

import ToolbarItemComponent from '@/components/ui/ToolbarItemComponent.vue';

import type { IToolbarBar } from '@/components/ui/models';

import { toolbarBars } from '@/components/ui/data';

const bars = ref<IToolbarBar[]>(toolbarBars);
const settingsBar = ref<IToolbarBar>({
  icon: 'tune',
  placeholder: 'Editor settings'
});
</script>

<template>
  <section class="toolbar-wrapper">
    <div class="toolbar-bars">
      <template v-for="bar in bars">
        <ToolbarItemComponent :bar="bar" />
      </template>
    </div>
    <div class="settings-bar">
      <ToolbarItemComponent :bar="settingsBar" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.toolbar-wrapper {
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ececec;
  color: #0f0f0f;
  border-right: 1px solid #1b1b1b;
  padding: 10px 0;
}

.toolbar-bars {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

@media (prefers-color-scheme: dark) {
  .toolbar-wrapper {
    background-color: #1b1b1b;
    color: #ececec;
    border-color: #3d3d3d;
  }
}
</style>
