import { defineStore } from 'pinia';
import { INotification } from '@/components/ui/models';

export interface NotificationStoreState {
  // Active notifications (opened ones)
  active: INotification[];
}

export const useNotificationStore = defineStore('notification', {
  state(): NotificationStoreState {
    return {
      active: []
    };
  },
  actions: {
    show(n: INotification): void {
      this.active.push(n);
    },
    close(id: string): void {
      const index: number = this.active.findIndex((n: INotification): boolean => n.id === id);
      if (index == -1) return;
      this.active.splice(index, 1);
    }
  }
});
