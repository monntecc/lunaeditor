<script setup lang="ts">
interface LNumberInput {
  title: string;
}

withDefaults(defineProps<LNumberInput>(), {});
</script>

<template>
  <div class="inputHolder">
    <span class="titleHolder">{{ title }}</span>
    <input type="number" />
  </div>
</template>

<style scoped lang="scss">
.inputHolder {
  border: 1px solid black;

  & .titleHolder {
    font-size: larger;
  }

  & input[type='number'] {
    width: 3rem;
    height: 1rem;
    padding: 3px;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
