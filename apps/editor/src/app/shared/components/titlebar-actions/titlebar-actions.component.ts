import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlebarAction } from '../../interfaces/TitlebarAction';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'luna-titlebar-actions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './titlebar-actions.component.html',
  styleUrl: './titlebar-actions.component.scss',
})
export class TitlebarActionsComponent implements OnInit {
  actions: WritableSignal<TitlebarAction[]> = signal([]);

  constructor(private readonly layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.actions.set([
      {
        name: 'minimize',
        icon: 'minus'
      },
      {
        name: 'maximize',
        icon: 'maximize'
      },
      {
        name: 'close',
        icon: 'close'
      }
    ])
  }

  interact(action: TitlebarAction['name']): void {
    switch (action) {
      case 'minimize':
        this.layoutService.minimizeApp();
        break;
      case 'maximize':
        this.layoutService.maximizeApp();
        break;
      case 'close':
        this.layoutService.closeApp();
        break;
      default:
        break;
    }
  }
}
