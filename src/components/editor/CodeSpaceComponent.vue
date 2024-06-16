<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { useCodeStore } from '@/stores/code.store';
import { useFileStore } from '@/stores/file.store';
import EditorTabView from '@/components/editor/EditorTabView.vue';

export interface CodePayload {
  view: any; // eslint-disable-line
  state: any; // eslint-disable-line
  container: any; // eslint-disable-line
}

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload: CodePayload) => {
  console.log(payload);
  view.value = payload.view;
};

const codeStore = useCodeStore();
const fileStore = useFileStore();
const content = ref<string>('');

onMounted(() => {
  watch([fileStore.$state], () => {
    // TODO: Implement normally
    const file = fileStore.opened[0];
    content.value = file ? file.text : '';
  });
});

const onChange = (event: unknown) => {
  console.log('code change event', event);
};

const onFocus = (event: unknown) => {
  console.log('code focus event', event);
};
const onBlur = (event: unknown) => {
  console.log('code blur event', event);
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
    :tab-size="2"
    :extensions="codeStore.extensions"
    @ready="handleReady"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<style scoped lang="scss">
.v-codemirror {
  height: 100%;
}
</style>
