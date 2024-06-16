<script setup lang="ts">
import { ITabInfo } from './models/ITabInfo';

const props = withDefaults(defineProps<ITabInfo>(), {});
const emit = defineEmits(['close', 'set-active']);

function handleSetActive() {
  emit('set-active', props.id);
}

function handleClose() {
  emit('close', props.id);
}
</script>

<template>
  <div class="tab" :class="{ 'active-tab': props.isActive }" @click="handleSetActive" :title="props.name">
    <span class="tab-title"> {{ props.name }}</span>
    <span class="close-tab" @click.stop="handleClose">✖</span>
  </div>
</template>

<style scoped lang="scss">
.tab {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid black;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-right: 5px;
  max-width: 200px;
  cursor: pointer;

  &.active-tab {
    padding: 5px 10px;
    background-color: #000205;
    border-top: 1px solid #000205;
    z-index: 9999;

    &::before,
    &::after {
      content: '';
      width: 12px;
      height: 2px;
      position: absolute;
      border-radius: 50%;
      background-color: #000205;
    }

    &::before {
      bottom: 0;
      left: -2px;
    }

    &::after {
      bottom: 0;
      right: -2px;
    }
  }

  .tab-title {
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .close-tab {
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      color: red;
    }
  }
}
</style>
