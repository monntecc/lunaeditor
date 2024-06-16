<script setup lang="ts">
import type { ICodeData } from '@/components/editor/models';

export interface CodeStatusbarComponentProps {
  data: ICodeData;
}

withDefaults(defineProps<CodeStatusbarComponentProps>(), {});
</script>

<template>
  <footer class="editor-statusbar">
    <div class="wrapper">
      <span>Line: {{ data.line }}</span>
      <span>Column: {{ data.column }}</span>
    </div>
    <div class="wrapper">
      <span>Tab Size: {{ data.tabSize }}</span>
      <span
        >Language:
        <span class="lang">{{ data.lang as string }}</span>
      </span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.editor-statusbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  font-size: 14px;

  .wrapper {
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .lang {
      text-transform: capitalize;
    }
  }
}
</style>
