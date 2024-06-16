import { ENotificationType, INotification } from '@/components/ui/models';
import { useNotificationStore } from '@/stores/notification.store';
import { v4 as uuidv4 } from 'uuid';

export const infoNotification = (text: string): void => {
  const notification: INotification = {
    id: uuidv4(),
    text,
    type: ENotificationType.INFO,
    icon: 'task_alt'
  };

  const notificationStore = useNotificationStore();
  notificationStore.show(notification);
};

export const warnNotification = (text: string): void => {
  const notification: INotification = {
    id: uuidv4(),
    text,
    type: ENotificationType.WARN,
    icon: 'warning'
  };

  const notificationStore = useNotificationStore();
  notificationStore.show(notification);
};

export const errorNotification = (text: string): void => {
  const notification: INotification = {
    id: uuidv4(),
    text,
    type: ENotificationType.ERROR,
    icon: 'error'
  };

  const notificationStore = useNotificationStore();
  notificationStore.show(notification);
};

export const closeNotification = (id: string): void => {
  const notificationStore = useNotificationStore();
  notificationStore.close(id);
};
