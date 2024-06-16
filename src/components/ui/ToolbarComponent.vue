<script setup lang="ts">
import { ref } from 'vue';

import ToolbarItemComponent from '@/components/ui/ToolbarItemComponent.vue';

import { EToolbarElType, IToolbarBar } from '@/components/ui/models';

import { toolbarBars } from '@/components/ui/data';

const emit = defineEmits<{
  (e: 'bar-clicked', bar: EToolbarElType | null): void;
}>();

const bars = ref<IToolbarBar[]>(toolbarBars);

const settingsBar = ref<IToolbarBar>({
  icon: 'tune',
  placeholder: 'Editor settings',
  type: EToolbarElType.NONE
});

const barClicked = ref<EToolbarElType | null>(null);
const emitClick = (bar: EToolbarElType): void => {
  emit('bar-clicked', bar);

  if (barClicked.value === bar) {
    barClicked.value = null;
  } else {
    barClicked.value = bar;
  }
};
</script>

<template>
  <section class="toolbar-wrapper">
    <div class="toolbar-bars">
      <template v-for="bar in bars">
        <ToolbarItemComponent :active="barClicked === bar.type" :bar="bar" @click="emitClick(bar.type)" />
      </template>
    </div>
    <div class="settings-bar">
      <ToolbarItemComponent :bar="settingsBar" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.toolbar-wrapper {
  width: 36px;
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
