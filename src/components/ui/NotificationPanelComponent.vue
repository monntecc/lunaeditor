<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import NotificationComponent from '@/components/ui/NotificationComponent.vue';

import type { INotification } from '@/components/ui/models';
import { useNotificationStore } from '@/stores/notification.store';

const notificationsStore = useNotificationStore();

const notifications = ref<INotification[]>(notificationsStore.active);

onMounted(() => {
  watch([notificationsStore.$state], () => {
    notifications.value = notificationsStore.active;
  });
});
</script>

<template>
  <section class="notifications-wrapper">
    <template v-for="n in notifications">
      <NotificationComponent :notification="n" />
    </template>
  </section>
</template>

<style scoped lang="scss">
.notifications-wrapper {
  position: fixed;
  bottom: 10px;
  right: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 10000;
}
</style>
