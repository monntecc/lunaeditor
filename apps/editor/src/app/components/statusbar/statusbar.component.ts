import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeData } from '../../shared/interfaces/CodeData';

@Component({
  selector: 'luna-statusbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statusbar.component.html',
  styleUrl: './statusbar.component.scss',
})
export class StatusbarComponent {
  @Input() data: CodeData | undefined;
}
