<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import {onBeforeMount, ref, shallowRef, watch} from "vue";
import { javascript } from "@codemirror/lang-javascript";
import { rust } from "@codemirror/lang-rust";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { vue } from "@codemirror/lang-vue";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { css } from "@codemirror/lang-css";
import { sass } from "@codemirror/lang-sass";
import { less } from "@codemirror/lang-less";
import { go } from "@codemirror/lang-go";
import { java } from "@codemirror/lang-java";
import { liquid } from "@codemirror/lang-liquid";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { wast } from "@codemirror/lang-wast";
import { xml } from "@codemirror/lang-xml";
import { yaml } from "@codemirror/lang-yaml";
import { angular } from "@codemirror/lang-angular";
import { Extension } from "@codemirror/state";
import StatusbarPanel from "@/components/panels/StatusbarPanel.vue";
import { CodeData } from "@/model/CodeData.ts";
import { ViewUpdate } from "@codemirror/view";

interface CodeEditorPanelProps {
  filePath: string;
  buffer: string;
}

const props = withDefaults(defineProps<CodeEditorPanelProps>(), {});
const emit = defineEmits<{
  (e: 'change', content: string): void
}>();

const code = ref<string>('');
const fileExtension = ref<string>('');
const extensions: Extension[] = [];
const editorData = ref<CodeData>({
  column: 0,
  line: 0,
  selectedChars: 0,
  selectedColumns: 0,
  tabSize: 0,
})

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload: any): void => {
  view.value = payload.view;
}

const handleChange = (value: string, viewUpdate: ViewUpdate): void => {
  if (value) {
    // Change value of code
    code.value = value;
    emit('change', value);
  }

  const selection = viewUpdate.state.selection.main;
  const cursor = viewUpdate.state.doc.lineAt(selection.head);
  const selectedData = viewUpdate.state.sliceDoc(selection.from, selection.to);

  // Update code data
  editorData.value = {
    line: cursor.number,
    column: selection.head - cursor.from,
    tabSize: viewUpdate.state.tabSize,
    selectedChars: selectedData.length,
    selectedColumns: selectedData.split('\n').length,
  };
}

const handleBlurFocus = (viewUpdate: ViewUpdate): void => handleChange(code.value, viewUpdate);

const prepareExtensions = (): void => {
  const fileName: string = props.filePath.split("/\\").pop() || '';
  fileExtension.value = fileName.split(".").pop() || '';

  // Select file extension
  switch (fileExtension.value) {
    case 'rs': extensions.push(rust()); break;
    case 'html': case 'htm': extensions.push(html()); break;
    case 'json': extensions.push(json()); break;
    case 'js': case 'mjs': case 'ts': extensions.push(javascript()); break;
    case 'vue': case 'vuex': extensions.push(vue()); break;
    case 'py': case 'py3': extensions.push(python()); break;
    case 'cpp': case 'cxx': case 'c': extensions.push(cpp()); break;
    case 'css': extensions.push(css()); break;
    case 'sass': case 'scss': extensions.push(sass()); break;
    case 'less': extensions.push(less()); break;
    case 'go': extensions.push(go()); break;
    case 'java': extensions.push(java()); break;
    case 'liquid': extensions.push(liquid()); break;
    case 'md': extensions.push(markdown()); break;
    case 'php': extensions.push(php()); break;
    case 'sql': extensions.push(sql()); break;
    case 'wasm': extensions.push(wast()); break;
    case 'xml': case 'xaml': extensions.push(xml()); break;
    case 'yml': case 'yaml': extensions.push(yaml()); break;
    case '': default: break;
  }
  if (props.buffer.includes('@angular') && fileExtension.value.includes('html')) extensions.push(angular());

  // Add theme
  extensions.push(xcodeDark);
};

onBeforeMount(() => {
  code.value = props.buffer;
  prepareExtensions();
});

watch(props, () => {
  code.value = props.buffer;
});
</script>

<template>
  <div class="code-panel-wrapper">
    <codemirror
        v-model="code"
        style="height: calc(100vh - 100px)"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
        @change="handleChange"
        @focus="handleBlurFocus"
        @blur="handleBlurFocus"
        @update="handleBlurFocus"
    />
    <StatusbarPanel
        :extension="fileExtension"
        :tab-size="editorData.tabSize"
        :line="editorData.line"
        :column="editorData.column"
        :selected-chars="editorData.selectedChars"
        :selected-columns="editorData.selectedColumns"
    />
  </div>
</template>

<style lang="scss">
* {
  outline: none!important;
}
</style>