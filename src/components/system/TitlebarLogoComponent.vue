<script setup lang="ts"></script>

<template>
  <div class="titlebar-logo">
    <img src="/assets/icons/logo.png" alt="luna logo" />
  </div>
</template>

<style scoped lang="scss">
.titlebar-logo {
  position: relative;
  margin-right: 40px;

  img {
    position: absolute;
    width: 64px;
    height: 64px;
    left: -10px;
    top: -10px;
    transform: rotate(20deg);
  }
}
</style>
