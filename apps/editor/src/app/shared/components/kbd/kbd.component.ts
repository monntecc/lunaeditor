import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'luna-kbd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kbd.component.html',
  styleUrl: './kbd.component.scss',
})
export class KbdComponent {
  @Input() simple = false;

  @Input() shortcut = '';
}
