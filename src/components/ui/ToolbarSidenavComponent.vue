<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const isResizing = ref<boolean>(false);
const sidenav = ref<HTMLDivElement | null>(null);

const resize = (event: MouseEvent): void => {
  if (!isResizing.value || !sidenav.value) return;
  const offset = event.clientX - sidenav.value.offsetLeft + 40;
  const minWidth = 120; // minimum width for sidenav
  const maxWidth = 720; // maximum width for sidenav
  const newWidth = Math.max(minWidth, Math.min(maxWidth, offset));
  console.log('old width', sidenav.value.offsetLeft);
  console.log('newWidth', newWidth);
  sidenav.value.style.width = newWidth + 'px';
};

const startResizing = (): void => {
  isResizing.value = true;
  document.addEventListener('mousemove', resize, false);
  document.addEventListener('mouseup', stopResizing, false);
};

const stopResizing = (): void => {
  isResizing.value = false;
  document.removeEventListener('mousemove', resize, false);
  document.removeEventListener('mouseup', stopResizing, false);
};

onBeforeUnmount(() => {
  if (sidenav.value) {
    sidenav.value.removeEventListener('mousedown', startResizing, false);
  }
});
</script>

<template>
  <section class="toolbar-sidenav" ref="sidenav">
    <slot></slot>
    <div class="drag-area" @mousedown="startResizing"></div>
  </section>
</template>

<style scoped lang="scss">
.toolbar-sidenav {
  position: relative;
  width: 240px;
  padding: 12px;
  background-color: #ececec;
  color: #0f0f0f;

  .drag-area {
    background-color: #dedede;
    position: absolute;
    right: 0;
    top: 0;
    width: 4px;
    height: 100%;
    cursor: ew-resize;
  }
}

@media (prefers-color-scheme: dark) {
  .toolbar-sidenav {
    background-color: #1b1b1b;
    color: #ececec;

    .drag-area {
      background-color: #3f3f3f;
    }
  }
}
</style>
