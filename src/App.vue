<script setup lang="ts">
import { Ref, ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { open } from '@tauri-apps/plugin-dialog';
import Titlebar from "@/ui/system/Titlebar.vue";

const path: Ref<string> = ref("");
const content: Ref<string> = ref("");
const writeResult: Ref<string> = ref("");

interface SuccessResult {
  code: number;
  message: string;
}

async function readFile() {
  const selected: string | null = await open({
    multiple: false,
    directory: false,
    title: 'Open a file'
  });
  if (selected !== null) {
    path.value = selected;
    const contents: ArrayBuffer = await invoke('read_file', { path: path.value });
    const encoder = new TextDecoder('utf-8');
    content.value = encoder.decode(new Uint8Array(contents as ArrayBuffer));
  }
}

async function writeFile() {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(content.value);
  const result: SuccessResult = await invoke('write_file', { path: path.value, data: buffer });
  console.log(result);
  writeResult.value = `Result: [Code - ${result.code}] [Message - ${result.message}]`;
}
</script>

<template>
  <Titlebar />
  <main class="container">
    <h1>Luna Editor</h1>

    <form class="row" @submit.prevent="readFile">
      <button type="submit">Open a file</button>
    </form>

    <p>{{ path }}</p>
    <textarea v-model="content"></textarea>

    <form class="row" @submit.prevent="writeFile">
      <button type="submit">Write new version</button>
    </form>

    {{ writeResult }}
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

:root {
  font-family: "Montserrat", Inter, Avenir, Helvetica, Arial, sans-serif;
  font-optical-sizing: auto;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #f6f6f6;
  background-color: #2f2f2f;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

}

.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.row {
  display: flex;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

input,
button,
textarea {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #ffffff;
  background-color: #0f0f0f98;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

textarea {
  resize: none;
  height: 50vh;
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}
button:active {
  border-color: #396cd8;
  background-color: #0f0f0f69;
}

input,
button {
  outline: none;
}
</style>