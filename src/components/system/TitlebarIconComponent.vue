<script setup lang="ts">
import type { TSystemTheme, TTitlebarIconType } from '@/components/system/models';

import { closeApp, maximizeApp, minimizeApp, systemTheme } from '@/components/system/actions';

export interface TitlebarIconComponentProps {
  type: TTitlebarIconType;
}

const props = withDefaults(defineProps<TitlebarIconComponentProps>(), {});

const icon = (): string => {
  const iconsDir = '/assets/icons';
  const theme: TSystemTheme = systemTheme();
  return `${iconsDir}/${theme}/${props.type}.png`;
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
    width: 32px;
    height: 32px;
  }

  &:hover {
    background: $accent;
  }
}
</style>
