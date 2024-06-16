import type { ENotificationType } from '@/components/ui/models';

export interface INotification {
  // Auto-generated notification id, needed to close it
  id: string;
  // Notification text
  text: string;
  // Notification icon (optional)
  icon?: string;
  // Type of notification
  type: ENotificationType;
}
