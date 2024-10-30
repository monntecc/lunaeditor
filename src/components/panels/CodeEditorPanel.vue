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
const codeLanguage = ref<string>('');
const codeMirrorExtensions: Extension[] = [];
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
  const fileExtension = fileName.split(".").pop() || '';

  // Select file extension
  switch (fileExtension) {
    case 'rs': {
      codeMirrorExtensions.push(rust());
      codeLanguage.value = 'Rust';
      break;
    }
    case 'html': case 'htm': {
      codeMirrorExtensions.push(html());
      codeLanguage.value = 'HTML';
      break;
    }
    case 'json': {
      codeMirrorExtensions.push(json());
      codeLanguage.value = 'JSON';
      break;
    }
    case 'js': case 'mjs': case 'ts': {
      codeMirrorExtensions.push(javascript());
      codeLanguage.value = 'JavaScript';
      break;
    }
    case 'vue': case 'vuex': {
      codeMirrorExtensions.push(vue());
      codeLanguage.value = 'Vue / JS';
      break;
    }
    case 'py': case 'py3': {
      codeMirrorExtensions.push(python());
      codeLanguage.value = 'Python';
      break;
    }
    case 'cpp': case 'cxx': case 'c': {
      codeMirrorExtensions.push(cpp());
      codeLanguage.value = 'C/C++';
      break;
    }
    case 'css': {
      codeMirrorExtensions.push(css());
      codeLanguage.value = 'CSS';
      break;
    }
    case 'sass': case 'scss': {
      codeMirrorExtensions.push(sass());
      codeLanguage.value = 'SASS';
      break;
    }
    case 'less': {
      codeMirrorExtensions.push(less());
      codeLanguage.value = 'Less';
      break;
    }
    case 'go': {
      codeMirrorExtensions.push(go());
      codeLanguage.value = 'Golang';
      break;
    }
    case 'java': {
      codeMirrorExtensions.push(java());
      codeLanguage.value = 'Java';
      break;
    }
    case 'liquid': {
      codeMirrorExtensions.push(liquid());
      codeLanguage.value = 'Liquid';
      break;
    }
    case 'md': {
      codeMirrorExtensions.push(markdown());
      codeLanguage.value = 'Markdown';
      break;
    }
    case 'php': {
      codeMirrorExtensions.push(php());
      codeLanguage.value = 'PHP';
      break;
    }
    case 'sql': {
      codeMirrorExtensions.push(sql());
      codeLanguage.value = 'SQL';
      break;
    }
    case 'wasm': case 'wast': {
      codeMirrorExtensions.push(wast());
      codeLanguage.value = 'WebAssembly';
      break;
    }
    case 'xml': case 'xaml': {
      codeMirrorExtensions.push(xml());
      codeLanguage.value = 'XAML';
      break;
    }
    case 'yml': case 'yaml': {
      codeMirrorExtensions.push(yaml());
      codeLanguage.value = 'YAML';
      break;
    }
    case '': default: {
      codeLanguage.value = 'Plain';
      break;
    }
  }
  if (props.buffer.includes('@angular') && fileExtension.includes('html')) codeMirrorExtensions.push(angular());

  // Add theme
  codeMirrorExtensions.push(xcodeDark);
};

onBeforeMount(() => {
  code.value = props.buffer;
  prepareExtensions();
});

watch(props, () => {
  code.value = props.buffer;
  prepareExtensions();
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
        :extensions="codeMirrorExtensions"
        @ready="handleReady"
        @change="handleChange"
        @focus="handleBlurFocus"
        @blur="handleBlurFocus"
        @update="handleBlurFocus"
    />
    <StatusbarPanel
        :code-language="codeLanguage"
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