import { Injectable, signal, WritableSignal } from '@angular/core';
import { FileInformation } from '../interfaces/FileInformation';
import { TabInfo } from '../interfaces/TabInfo';
import { v4 as uuidv4 } from 'uuid';
import { dialog, invoke } from '@tauri-apps/api';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private readonly alert: AlertService) {
  }

  // Opened files in editor
  public opened: WritableSignal<FileInformation[]> = signal([]);

  // Active opened file in editor
  public active: WritableSignal<FileInformation | undefined> = signal(undefined);

  public get tabs(): TabInfo[] {
    return this.opened().map(
      (file: FileInformation): TabInfo => ({
        id: file.tabId ?? '',
        name: file.name
      })
    );
  }

  public path(file: FileInformation): string {
    return file.dir + file.name;
  }

  public new(): void {
    const tabId: string = uuidv4();
    const file: FileInformation = {
      tabId,
      name: 'Untitled.txt',
      dir: 'C:/Users/Default/Documents/',
      bytes: [],
      extension: 'txt',
      text: ''
    };
    this.opened.set([...this.opened(), file]);
    this.active.set(file);
    console.log(this.opened());
    console.log(this.active());
  }

  public async open(): Promise<void> {
    const path: string | string[] | null = await dialog.open({
      directory: false,
      multiple: false,
      title: 'Pick file to open in Luna Editor'
    });

    const file: FileInformation = await invoke('read_file', { path });
    const tabId: string = uuidv4();
    const tab: FileInformation = { tabId, ...file };
    this.opened.set([...this.opened(), tab]);
    this.active.set(tab);
    console.log(this.opened());
    console.log(this.active());
  }

  public close(id: string): void {
    const index: number = this.opened().findIndex((file: FileInformation): boolean => file.tabId === id);
    if (index == -1) return;
    this.opened().splice(index, 1);
    if (this.active()?.tabId === id) this.active.set(undefined);
  }

  public async save(path: string, content: string): Promise<void> {
    const success: boolean = await invoke('write_file', { path, content });
    if (success) {
      this.alert.info('File saved successfully.');
    } else {
      this.alert.error('Cannot save selected file!');
    }
  }

  public async saveActiveAs(): Promise<void> {
    if (!this.active) return;
    const path: string | string[] | null = await dialog.save({
      // TODO: After adding file type to editor, change default to selected file type
      title: 'Save file as',
      filters: [
        {
          name: 'Plain Text',
          extensions: ['txt']
        },
        {
          name: 'Rust File',
          extensions: ['rs']
        },
        {
          name: 'JavaScript File',
          extensions: ['js', 'mjs']
        },
        {
          name: 'Markdown File',
          extensions: ['md']
        },
        {
          name: 'Cascading Style Sheets File',
          extensions: ['css', 'scss', 'sass']
        },
        {
          name: 'HyperText Markup Language File',
          extensions: ['html', 'hml']
        },
        {
          name: 'JavaScript Object Notation File',
          extensions: ['json']
        },
        {
          name: 'Vue File',
          extensions: ['vue']
        }
      ]
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const content: string = this.active()!.text;
    await this.save(path as string, content);
    // Replace active with new name
    const splitPath: string[] = (path as string).split('\\');
    const name: string = splitPath.pop() ?? '';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.active.set({ ...this.active()!, name: this.active()!.name });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.active.set({ ...this.active()!, dir: (path as string).replace(name, '') });
    // Replace also in opened tabs
    const index: number = this.opened().findIndex(
      (file: FileInformation): boolean => file.tabId === this.active()?.tabId
    );
    this.opened()[index].name = name;
    this.opened()[index].dir = (path as string).replace(name, '');
  }

  public async saveActive(): Promise<void> {
    if (this.active() === undefined) {
      this.alert.error('No active file found.');
      return;
    }

    if (this.active.name === 'Untitled.txt') {
      await this.saveActiveAs();
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const path: string = this.path(this.active());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const content: string = this.active().text;
    await this.save(path, content);
  }

  updateContent(id: string, content: string): void {
    const index: number = this.opened().findIndex((file: FileInformation): boolean => file.tabId === id);
    if (index == -1) return;
    this.opened()[index].text = content;
    // Also update active tab, if it now opened
    if (this.active && this.active()?.tabId === id) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.active.set({ ...this.active()!, text: content });
    }
  }
}
