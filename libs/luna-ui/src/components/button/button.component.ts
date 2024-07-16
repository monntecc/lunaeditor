import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LunaButtonVariant } from '../../shared/interfaces/LunaButtonVariant';

@Component({
  selector: 'luna-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() public variant: LunaButtonVariant = 'fill';

  isFill(): boolean {
    return this.variant === 'fill';
  }

  isOutlined(): boolean {
    return this.variant === 'outlined';
  }
}
