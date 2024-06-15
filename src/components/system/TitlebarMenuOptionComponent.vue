<script setup lang="ts">
import KbdComponent from '@/components/ui/KbdComponent.vue';

import type { ITitlebarMenuOption } from '@/components/system/models';

export interface TitlebarMenuOptionComponentProps {
  option: ITitlebarMenuOption;
}

withDefaults(defineProps<TitlebarMenuOptionComponentProps>(), {});
</script>

<template>
  <div class="titlebar-menu-option" @click="option.onInteract">
    <span>{{ option.title }}</span>
    <KbdComponent v-if="option.shortcut" :shortcut="option.shortcut" />
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/themes/luna';

.titlebar-menu-option {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;

  padding: 6px 8px;
  cursor: pointer;
  user-select: none;
  margin: 1px;
  color: #0f0f0f;

  &:hover {
    background-color: $accent;
  }
}

@media (prefers-color-scheme: dark) {
  .titlebar-menu-option {
    color: #ffffff;
  }
}
</style>
