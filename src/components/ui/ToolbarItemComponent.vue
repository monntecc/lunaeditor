<script setup lang="ts">
import { IToolbarBar } from '@/components/ui/models';
import { ref } from 'vue';

export interface ToolbarItemComponentProps {
  bar: IToolbarBar;
  active?: boolean;
}

withDefaults(defineProps<ToolbarItemComponentProps>(), {});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const hovered = ref<boolean>(false);

const setHovered = (): void => {
  hovered.value = !hovered.value;
};

const click = (): void => emit('click');
</script>

<template>
  <div class="toolbar-bar" :class="active ? 'active' : ''" @click="click()">
    <span class="material-icons" @mouseenter="setHovered()" @mouseleave="setHovered()">{{ bar.icon }}</span>
    <div class="placeholder" :class="hovered ? 'show' : ''">{{ bar.placeholder }}</div>
  </div>
</template>

<style scoped lang="scss">
.toolbar-bar {
  position: relative;
  display: flex;
  padding: 4px 6px;
  cursor: pointer;

  &:hover {
    background-color: #d3d3d3;
  }

  &.active {
    background-color: #d3d3d3;
  }

  .placeholder {
    position: absolute;
    left: 40px;
    top: 6px;
    opacity: 0;
    width: 0;
    height: 0;
    transition: 0.2s ease-in-out;
    z-index: 10000;
    text-wrap: nowrap;
    background-color: #e3e3e3;
    color: #0f0f0f;
    padding: 4px 8px;
    font-size: 12px;
    box-shadow:
      rgba(201, 201, 201, 0.4) 0 10px 36px 0,
      rgba(203, 203, 203, 0.2) 0 0 0 1px;
    pointer-events: none;

    &.show {
      opacity: unset;
      width: unset;
      height: unset;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .toolbar-bar {
    .placeholder {
      background-color: #1b1b1b;
      color: #eeeeee;
    }

    &:hover {
      background-color: #2a2a2a;
    }

    &.active {
      background-color: #343434;
    }
  }
}
</style>
