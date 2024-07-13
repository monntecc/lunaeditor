import { Injectable, signal, WritableSignal } from '@angular/core';
import { FileInformation } from '../shared/interfaces/FileInformation';
import { v4 as uuidv4 } from 'uuid';
import { dialog, invoke } from '@tauri-apps/api';
import { AlertService } from '@luna/luna-ui';
import { FileOperator } from '@angular-devkit/schematics';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  // Opened files in editor
  public opened: WritableSignal<FileInformation[]> = signal([]);

  // Active opened file id
  public activeFileId: WritableSignal<string> = signal('');

  constructor(private readonly alert: AlertService) {
  }

  public path(file: FileInformation): string {
    return file.dir + file.name;
  }

  public pathById(id: string): string {
    const file: FileInformation | undefined = this.opened().find((file: FileInformation): boolean => file.id === id);
    if (!file) return '';
    return `${file.dir}${file.name}`;
  }

  public new(): void {
    const file: FileInformation = {
      id: uuidv4(),
      name: 'Untitled.txt',
      dir: 'C:/Users/Default/Documents/',
      bytes: [],
      extension: 'txt',
      text: ''
    };
    this.opened.set([...this.opened(), file]);
  }

  public async open(): Promise<void> {
    const path: string | string[] | null = await dialog.open({
      directory: false,
      multiple: false,
      title: 'Pick file to open in Luna Editor'
    });

    const file: FileInformation = await invoke('read_file', { path });
    const tab: FileInformation = { ...file, id: uuidv4() };
    this.opened.set([...this.opened(), tab]);
  }

  public close(id: string): void {
    const index: number = this.opened().findIndex((file: FileInformation): boolean => file.id === id);
    if (index == -1) return;
    this.opened().splice(index, 1);
  }

  public async save(path: string, content: string): Promise<void> {
    const success: boolean = await invoke('write_file', { path, content });
    if (success) {
      this.alert.info('File saved successfully.');
    } else {
      this.alert.error('Cannot save selected file!');
    }
  }

  public async saveActive(): Promise<void> {
    if (!this.getActive()) {
      this.alert.error('No active file found.');
      return;
    }

    if (this.getActive()?.name === 'Untitled.txt') {
      await this.saveActiveAs();
      return;
    }

    const path: string = this.path(this.getActive() as FileInformation);
    const content: string = (this.getActive() as FileInformation).text;
    await this.save(path, content);
  }

  public async saveActiveAs(): Promise<void> {
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
    const content: string = this.getActive()?.text ?? '';
    await this.save(path as string, content);
    // Replace active with new name
    const splitPath: string[] = (path as string).split('\\');
    const name: string = splitPath.pop() ?? '';
    // Replace also in opened tabs
    const index: number = this.opened().findIndex(
      (file: FileInformation): boolean => file.id === this.activeFileId()
    );
    this.opened()[index].name = name;
    this.opened()[index].dir = (path as string).replace(name, '');
  }

  private getActive(): FileInformation | undefined {
    return this.opened().find((file: FileInformation): boolean => file.id === this.activeFileId());
  }
}
