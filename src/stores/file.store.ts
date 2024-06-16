import { defineStore } from 'pinia';

import { IFileInformation } from '@/components/system/models';
import { ITabInfo } from '@/components/editor/models';
import { v4 as uuidv4 } from 'uuid';
import { dialog, invoke } from '@tauri-apps/api';
import { errorNotification, infoNotification, warnNotification } from '@/components/ui/actions/notification.action.ts';

export interface IFileStoreState {
  // Opened files in editor
  opened: IFileInformation[];
  // Active opened file in editor
  active: IFileInformation | null;
}

export const useFileStore = defineStore('file', {
  state(): IFileStoreState {
    return {
      opened: [],
      active: null
    };
  },
  getters: {
    getAsTabs(): ITabInfo[] {
      return this.opened.map(
        (file: IFileInformation): ITabInfo => ({
          id: file.tabId ?? '',
          name: file.name
        })
      );
    }
  },
  actions: {
    getFilePath(file: IFileInformation): string {
      return file.dir + file.name;
    },
    newFile(): void {
      const tabId: string = uuidv4();
      const file: IFileInformation = {
        tabId,
        name: 'Untitled.txt',
        dir: 'C:/Users/Default/Documents/Untitled.txt',
        bytes: [],
        extension: 'txt',
        text: ''
      };
      this.opened.push(file);
      this.setActive(tabId);
    },
    async openFile(): Promise<void> {
      const path: string | string[] | null = await dialog.open({
        directory: false,
        multiple: false,
        title: 'Pick file to open in Luna Editor'
      });

      const file: IFileInformation = await invoke('read_file', { path });
      const tabId: string = uuidv4();
      this.opened.push({
        tabId,
        ...file
      });
      this.setActive(tabId);
    },
    closeFile(tabID: string): void {
      const index: number = this.opened.findIndex((file: IFileInformation): boolean => file.tabId === tabID);
      if (index == -1) return;
      this.opened.splice(index, 1);
      if (this.active?.tabId === tabID) this.active = null;
    },
    setActive(tabID: string): void {
      const file: IFileInformation | undefined = this.opened.find(
        (file: IFileInformation): boolean => file.tabId === tabID
      );
      if (!file) return;
      this.active = file;
    },
    async saveFile(path: string, content: string): Promise<void> {
      console.log(path);
      console.log(content);
      const success: boolean = await invoke('write_file', { path, content });
      if (success) {
        infoNotification('File saved successfully.');
      } else {
        errorNotification('Cannot save selected file!');
      }
    },
    async saveActiveAs(): Promise<void> {
      if (!this.active) return;
      const path: string | string[] | null = await dialog.save({ title: 'Save file as' });
      const content: string = this.active.text;
      await this.saveFile(path as string, content);
      // Replace active with new name
      const splitPath: string[] = (path as string).split('\\');
      const name: string = splitPath.pop() ?? '';
      this.active.name = name;
      // Replace also in opened tabs
      const index: number = this.opened.findIndex(
        (file: IFileInformation): boolean => file.tabId === this.active?.tabId
      );
      this.opened[index].name = name;
    },
    async saveActive(): Promise<void> {
      if (!this.active) {
        warnNotification('No active file found.');
        return;
      }

      if (this.active.name === 'Untitled.txt') {
        await this.saveActiveAs();
        return;
      }

      const path: string = this.getFilePath(this.active);
      const content: string = this.active.text;
      await this.saveFile(path, content);
    },
    updateContent(tabID: string, content: string): void {
      const index: number = this.opened.findIndex((file: IFileInformation): boolean => file.tabId === tabID);
      if (index == -1) return;
      this.opened[index].text = content;
      // Also update active tab, if it now opened
      if (this.active && this.active.tabId === tabID) {
        this.active.text = content;
      }
    }
  }
});
