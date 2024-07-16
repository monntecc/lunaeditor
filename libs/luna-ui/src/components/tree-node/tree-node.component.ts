import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../../shared/interfaces/TreeNode';
import { MatIcon } from '@angular/material/icon';
import { NodeAction } from '../../shared/interfaces/NodeAction';

@Component({
  selector: 'luna-tree-node',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss'
})
export class TreeNodeComponent {
  @Input() public node: TreeNode | undefined = undefined;

  @Output() action: EventEmitter<NodeAction> = new EventEmitter();

  public opened: WritableSignal<boolean> = signal(false);

  public hovered: WritableSignal<boolean> = signal(false);

  open(path: string, isFolder = false): void {
    if (isFolder) {
      this.opened.set(!this.opened());
      return;
    }
    this.action.next({ action: 'open', path });
  }

  delete(path: string): void {
    this.action.next({ action: 'delete', path });
  }

  rename(path: string): void {
    this.action.next({ action: 'rename', path });
  }

  childrenAction(action: NodeAction):void {
    switch (action.action) {
      case 'open': {
        this.open(action.path);
        break;
      }
      case 'rename': {
        this.rename(action.path);
        break;
      }
      case 'delete': {
        this.delete(action.path);
        break;
      }
    }
  }
}
