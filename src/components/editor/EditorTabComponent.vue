<script setup lang="ts">
import type { ITabInfo } from './models/ITabInfo';

export interface EditorTabComponentProps {
  tab: ITabInfo;
  active?: boolean;
}

const props = withDefaults(defineProps<EditorTabComponentProps>(), {});

const emit = defineEmits<{
  (e: 'set-active', id: string): void;
  (e: 'close', id: string): void;
}>();

const handleSetActive = (id: string): void => emit('set-active', id);
const handleClose = (id: string): void => emit('close', id);

const auxClose = (event: MouseEvent): void => {
  event.preventDefault();
  if (event.button === 1) {
    handleClose(props.tab.id);
  }
};
</script>

<template>
  <div
    class="tab"
    :class="{ 'active-tab': active }"
    @click="handleSetActive(tab.id)"
    :title="tab.name"
    @auxclick="auxClose"
  >
    <span class="tab-title"> {{ tab.name }}</span>
    <span class="close-tab material-icons" @click.stop="handleClose(tab.id)">close</span>
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
    font-size: 20px;

    &:hover {
      color: #ff8484;
    }
  }
}
</style>
