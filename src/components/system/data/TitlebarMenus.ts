import type { ITitlebarMenu } from '@/components/system/models';
import { closeApp, openFile, closeFile } from '@/components/system/actions';

export const titlebarMenus: ITitlebarMenu[] = [
  {
    title: 'File',
    options: [
      {
        title: 'Open',
        onInteract: openFile,
        shortcut: 'ctrl + o'
      },
      {
        title: 'Close all',
        onInteract: closeFile,
        shortcut: 'ctrl + p + a'
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
