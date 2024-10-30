<script setup lang="ts">
import { CodeData } from "@/model/CodeData.ts";
import {onBeforeMount, ref, watch} from "vue";

interface StatusbarPanelProps extends CodeData {
  codeLanguage: string;
}

const data = ref<CodeData>({
  column: 0,
  line: 0,
  selectedChars: 0,
  selectedColumns: 0,
  tabSize: 0,
});

const props = withDefaults(defineProps<StatusbarPanelProps>(), {});

onBeforeMount(() => {
  data.value = { ...props };
});

watch(props, () => {
  data.value = { ...props };
});
</script>

<template>
  <footer class="editor-statusbar">
    <div class="wrapper">
      <template v-if="props.selectedChars">
        <span>Selected Chars: {{ data.selectedChars }}</span>
        <span>Selected Columns: {{ data.selectedColumns }}</span>
      </template>
      <template v-else>
        <span>Line: {{ data.line }}</span>
        <span>Column: {{ data.column }}</span>
      </template>
    </div>
    <div class="wrapper">
      <span>Tab Size: {{ data.tabSize }}</span>
      <span>Language:
        <span class="lang">{{ codeLanguage }}</span>
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
  font-size: 14px;
  background-color: #252525;

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