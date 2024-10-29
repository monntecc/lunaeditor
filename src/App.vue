<script setup lang="ts">
import Titlebar from "@/components/system/Titlebar.vue";
import EditorLayout from "@/components/EditorLayout.vue";
</script>

<template>
  <Titlebar />
  <main class="container">
    <EditorLayout />
  </main>
</template>

<style lang="scss">
@import './styles/globals.css';
</style>