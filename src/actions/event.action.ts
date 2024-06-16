import { invoke } from '@tauri-apps/api';
import { infoNotification, warnNotification } from '@/components/ui/actions/notification.action.ts';

export const settingsLoadedEvent = async (): Promise<void> => {
  // await event.listen('settings_loaded', (data: event.Event<unknown>): void => {
  //   console.log('data from event', data);
  // });
  const loaded: boolean = await invoke('settings_availability', {});
  if (loaded) {
    infoNotification('Editor settings was successfully loaded!');
  } else {
    warnNotification('Editor settings not found. Created new file!');
  }
};
