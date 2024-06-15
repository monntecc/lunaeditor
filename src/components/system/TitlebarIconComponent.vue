<script setup lang="ts">
import type { TTitlebarIconType } from '@/components/system/models';

import { closeApp, maximizeApp, minimizeApp } from '@/components/system/actions';

export interface TitlebarIconComponentProps {
  type: TTitlebarIconType;
}

const props = withDefaults(defineProps<TitlebarIconComponentProps>(), {});

const icon = (): string => {
  const iconsDir = '/assets/icons';
  return `${iconsDir}/ui/${props.type}.png`;
};

const onInteract = (): void => {
  switch (props.type) {
    case 'minimize':
      minimizeApp();
      break;
    case 'close':
      closeApp();
      break;
    case 'maximize':
      maximizeApp();
      break;
  }
};
</script>

<template>
  <div class="titlebar-icon" @click="onInteract()">
    <img :src="icon()" :alt="type" />
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/themes/luna';

.titlebar-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;

  img {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background: $accent;
  }
}

@media (prefers-color-scheme: dark) {
  .titlebar-icon img {
    filter: invert(100%);
  }
}
</style>
