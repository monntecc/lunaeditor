<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';

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
  lang: ECodeLang.PLAIN
});

onMounted(() => {
  watch([fileStore.$state], () => {
    // TODO: Implement normally
    const file = fileStore.opened[0];
    content.value = file ? file.text : '';
  });
});

const onChange = (content: string) => {
  console.log('new code content', content);
};

const onUpdate = (event: unknown) => {
  const state: EditorState = (event as any).state; // eslint-disable-line
  const cursorLine = state.doc.lineAt(state.selection.main.head);
  const cursorPos = state.selection.ranges[0].from;
  codeData.value = {
    line: cursorLine.number,
    tabSize: state.tabSize,
    column: cursorPos - cursorLine.from,
    lang: codeStore.lang
  };
  // console.log('code update event', event);
};
</script>

<template>
  <EditorTabView />
  <Codemirror
    v-model="content"
    placeholder="Code goes here..."
    :style="{ height: 'calc(100% - 32px)' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="codeData.tabSize"
    :extensions="codeStore.extensions"
    @ready="handleReady"
    @change="onChange"
    @update="onUpdate"
  />
  <CodeStatusbarComponent :data="codeData" />
</template>

<style scoped lang="scss">
.v-codemirror {
  height: 100%;
}
</style>
