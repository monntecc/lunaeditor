<script setup lang="ts">
import type { INotification } from '@/components/ui/models';
import { closeNotification } from '@/components/ui/actions/notification.action';

export interface NotificationComponentProps {
  notification: INotification;
}

withDefaults(defineProps<NotificationComponentProps>(), {});

const close = (id: string) => closeNotification(id);
</script>

<template>
  <div class="notification" :class="notification.type">
    <div class="icon">
      <span class="material-icons">{{ notification.icon }}</span>
    </div>
    <p class="text">{{ notification.text }}</p>
    <div class="close-btn" @click="close(notification.id)">
      <img src="/assets/icons/ui/close.png" alt="close button" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  color: #1a1a1a;
  background-color: #e7e7e7;
  padding: 4px 8px;
  border-radius: 8px;
  transition: 0.3s ease-in-out;

  &.info {
    .icon span {
      color: #aeff99;
    }
  }

  &.warn {
    .icon span {
      color: #ffea5e;
    }
  }

  &.error {
    .icon span {
      color: #ff7575;
    }
  }

  .close-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
      opacity: 0.75;
    }

    img {
      width: 16px;
      height: 16px;
    }
  }
}

@media (prefers-color-scheme: dark) {
  .notification {
    color: #eeeeee;
    background-color: #1b1b1b;

    .close-btn {
      filter: invert(100%);
    }
  }
}
</style>
