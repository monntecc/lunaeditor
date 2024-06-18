<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';

import CodeStatusbarComponent from '@/components/editor/CodeStatusbarComponent.vue';

import { Codemirror } from 'vue-codemirror';
import type { EditorState } from '@codemirror/state';

import { useCodeStore } from '@/stores/code.store';
import { useFileStore } from '@/stores/file.store';
import EditorTabView from '@/components/editor/EditorTabView.vue';

import { ECodeLang, ICodeData } from '@/components/editor/models';

export interface CodePayload {
  view: any; // eslint-disable-line
  state: any; // eslint-disable-line
  container: any; // eslint-disable-line
}

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload: CodePayload) => {
  view.value = payload.view;
  console.log(payload);
};

const codeStore = useCodeStore();
const fileStore = useFileStore();

const content = ref<string>('');
const codeData = ref<ICodeData>({
  tabSize: 2,
  column: 1,
  line: 1,
  lang: ECodeLang.PLAIN,
  selectedChars: 0,
  selectedColumns: 0
});

const saveActiveUsingKeyboard = async (event: KeyboardEvent): Promise<void> => {
  if (!fileStore.active) return;

  console.log(event.key);
  if (event.ctrlKey && event.key === 's') {
    await fileStore.saveActive();
  }
};

onMounted(() => {
  watch([fileStore.$state], () => {
    if (!fileStore.active) return;
    content.value = fileStore.active.text;
  });

  // Trigger active file save using CTRL + S
  document.addEventListener('keydown', saveActiveUsingKeyboard, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', saveActiveUsingKeyboard, false);
});

const onChange = (content: string) => {
  if (!content || !fileStore.active || !fileStore.active.tabId) return;
  fileStore.updateContent(fileStore.active.tabId, content);
};

const onUpdate = (event: unknown) => {
  const state: EditorState = (event as any).state; // eslint-disable-line
  const cursorLine = state.doc.lineAt(state.selection.main.head);
  const cursorPos = state.selection.ranges[0].from;
  const selection = state.selection.main;
  const selectedText = state.doc.sliceString(selection.from, selection.to);
  const selectedColumns = selectedText.split('\n').length;

  codeData.value = {
    line: cursorLine.number,
    tabSize: state.tabSize,
    column: cursorPos - cursorLine.from,
    lang: codeStore.lang,
    selectedChars: selectedText.replace(/\n/g, '').length,
    selectedColumns
  };
};
</script>

<template>
  <EditorTabView />
  <Codemirror
    v-if="fileStore.opened.length > 0 && fileStore.active"
    v-model="content"
    placeholder="Code goes here..."
    :style="{ height: 'calc(100% - 66px)' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="codeData.tabSize"
    :extensions="codeStore.extensions"
    @ready="handleReady"
    @update:model-value="onChange"
    @update="onUpdate"
  />
  <CodeStatusbarComponent v-if="fileStore.opened.length > 0 && fileStore.active" :data="codeData" />
</template>

<style scoped lang="scss">
.v-codemirror {
  height: 100%;
}
</style>
