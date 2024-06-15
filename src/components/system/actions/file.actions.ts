import { dialog, invoke } from '@tauri-apps/api';
import { useFileStore } from '@/stores/file.store';
import { IFileInformation } from '@/components/system/models';

export const openFile = async (): Promise<void> => {
  const path = await dialog.open({
    directory: false,
    multiple: false,
    title: 'Pick file to open in Luna Editor'
  });

  const file: IFileInformation = await invoke('read_file', { path });
  const { openFile } = useFileStore();
  openFile(file);
};

export const closeFile = async (): Promise<void> => {
  // TODO: Implement
  const { closeFile } = useFileStore();
  closeFile();
};
