import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'luna-editor-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor-tab.component.html',
  styleUrl: './editor-tab.component.scss',
})
export class EditorTabComponent {
  @Input() tabTitle = '';

  @Input() fileId = '';

  @Input() active: WritableSignal<boolean> = signal(false);

  constructor(protected readonly fileService: FileService) {
  }

  public close(): void {
    this.fileService.close(this.fileId);
  }
}
