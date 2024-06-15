import { defineStore } from 'pinia';
import { IFileInformation } from '@/components/system/models';

export interface IFileStoreState {
  // Opened files in editor
  opened: IFileInformation[];
}

export const useFileStore = defineStore('file', {
  state(): IFileStoreState {
    return {
      opened: []
    };
  },
  actions: {
    openFile(file: IFileInformation): void {
      // TODO: Validate this
      this.opened.push(file);
    },
    closeFile(): void {
      // TODO: Implement
      this.opened = [];
    }
  }
});
