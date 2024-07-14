import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../../shared/interfaces/TreeNode';

@Component({
  selector: 'luna-tree-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss'
})
export class TreeNodeComponent {
  @Input() public node: TreeNode | undefined = undefined;
}
