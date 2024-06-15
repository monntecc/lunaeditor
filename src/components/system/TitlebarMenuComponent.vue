<script setup lang="ts">
import { ITitlebarMenu } from '@/components/system/models';
import { ref } from 'vue';
import TitlebarMenuOptionComponent from '@/components/system/TitlebarMenuOptionComponent.vue';

export interface TitlebarMenuComponentProps {
  menu: ITitlebarMenu;
}

withDefaults(defineProps<TitlebarMenuComponentProps>(), {});

const hovered = ref<boolean>(false);

const toggleHovered = (): void => {
  hovered.value = !hovered.value;
};
</script>

<template>
  <div class="titlebar-menu" @mouseenter="toggleHovered" @mouseleave="toggleHovered">
    <div class="titlebar-menu-title">{{ menu.title }}</div>
    <div v-if="hovered" class="titlebar-menu-options">
      <template v-for="option in menu.options">
        <TitlebarMenuOptionComponent :option="option" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/themes/luna';

.titlebar-menu {
  position: relative;
  padding: 5px 8px;
  text-align: center;

  &:hover {
    color: #ffffff;
    background-color: $accent;
  }
}

.titlebar-menu-title {
  &::first-letter {
    text-decoration: underline;
  }
}

.titlebar-menu-options {
  position: absolute;
  width: auto;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 4px;
  background-color: #ececec;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0 0 0 1px,
    rgb(209, 213, 219) 0 0 0 1px inset;
}

@media (prefers-color-scheme: dark) {
  .titlebar-menu-options {
    background-color: #1a1a1a;
  }
}
</style>
