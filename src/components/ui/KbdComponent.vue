<script setup lang="ts">
export interface KbdComponentProps {
  shortcut: string;
}

withDefaults(defineProps<KbdComponentProps>(), {});
</script>

<template>
  <kbd class="kbd">{{ shortcut }}</kbd>
</template>

<style scoped lang="scss">
.kbd {
  padding: 4px 6px;
  font-size: 10px;
  font-weight: 500;
  color: rgb(31 41 55);
  background-color: rgb(243, 244, 246);
  border-radius: 4px;
  border-color: rgb(229 231 235);
  text-wrap: nowrap;
}

@media (prefers-color-scheme: dark) {
  .kbd {
    color: rgb(243 244 246);
    background-color: rgb(75 85 99);
    border-color: rgb(107 114 128);
  }
}
</style>
