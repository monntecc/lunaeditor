<script setup lang="ts">
interface LButton {
  title: string;
  action(): void;
}

withDefaults(defineProps<LButton>(), {});
</script>

<template>
  <button class="btn" @click="action">{{ title }}</button>
</template>

<style scoped lang="scss">
.btn {
  border: none;
  padding: 0.5 rem 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: #110f17;
  transition: 0.3s;
  color: azure;

  &:hover {
    text-decoration: none;
    outline: none;
    background-color: #123;
    color: azure;
  }
}
</style>
