<script setup lang="ts">
import { ref, watch } from 'vue';
import { isModalOpen, closeModal } from './events/settingsEvent';

const isOpen = ref(isModalOpen.value);

watch(isModalOpen, (newVal) => {
  isOpen.value = newVal;
});

const handleWrapperClick = (event: MouseEvent) => {
  const modal = document.querySelector('.settings-modal');
  if (modal && !modal.contains(event.target as Node)) {
    closeModal();
  }
};
</script>

<template>
  <div class="modal-wrapper" v-if="isOpen" @click="handleWrapperClick">
    <div class="modal-backdrop">
      <div class="settings-modal" @click.stop>
        <h1>Settings</h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000; /* Ensure it's above other content */
}

.modal-backdrop {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings-modal {
  background-color: rgb(26, 27, 52);
  border: 2px solid black;
  border-radius: 10px;
  width: 80vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1010;
}
</style>
