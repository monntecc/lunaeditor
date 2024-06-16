import type { ITitlebarMenu } from '@/components/system/models';
import { closeApp } from '@/components/system/actions';
import { useFileStore } from '@/stores/file.store.ts';

export const titlebarMenus: ITitlebarMenu[] = [
  {
    title: 'File',
    options: [
      {
        title: 'Open',
        onInteract: async (): Promise<void> => {
          const fileStore = useFileStore();
          await fileStore.openFile();
        },
        shortcut: 'ctrl + o'
      },
      {
        title: 'New',
        onInteract: (): void => {
          const fileStore = useFileStore();
          fileStore.newFile();
        },
        shortcut: 'ctrl + n'
      },
      {
        title: 'Save',
        onInteract: async (): Promise<void> => {
          const fileStore = useFileStore();
          await fileStore.saveActive();
        },
        shortcut: 'ctrl + s'
      },
      {
        title: 'Close active',
        onInteract: (): void => {
          const fileStore = useFileStore();
          if (!fileStore.active || !fileStore.active.tabId) return;
          fileStore.closeFile(fileStore.active.tabId);
        },
        shortcut: 'ctrl + w'
      },
      {
        title: 'Exit',
        onInteract: closeApp,
        shortcut: 'alt + f4'
      }
    ]
  },
  {
    title: 'Edit',
    options: [
      {
        title: 'Cut',
        onInteract: () => console.log('Cut option selected'),
        shortcut: 'ctrl + x'
      },
      {
        title: 'Copy',
        onInteract: () => console.log('Copy option selected'),
        shortcut: 'ctrl + c'
      },
      {
        title: 'Paste',
        onInteract: () => console.log('Paste option selected'),
        shortcut: 'ctrl + v'
      }
    ]
  }
];
