<script setup lang="ts">
import PrimarySidebar from "@/components/panels/PrimarySidebar.vue";
import TabPanel from "@/components/panels/TabPanel.vue";
</script>

<template>
  <div class="editor-wrapper">
    <PrimarySidebar />
    <TabPanel />
  </div>
</template>

<style scoped lang="scss">
.editor-wrapper {
  position: relative;
  display: flex;
}
</style>