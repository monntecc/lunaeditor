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
    <KbdComponent v-if="option.shortcut" :shortcut="option.shortcut" :simple="true" />
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/themes/luna';

.titlebar-menu-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  text-wrap: nowrap;

  padding: 4px 6px;
  cursor: pointer;
  user-select: none;
  margin: 1px;
  color: #0f0f0f;

  &:hover {
    color: #ffffff;
    background-color: $accent;
  }
}

@media (prefers-color-scheme: dark) {
  .titlebar-menu-option {
    color: #ffffff;
  }
}
</style>
