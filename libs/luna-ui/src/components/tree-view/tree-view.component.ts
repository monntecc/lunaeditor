import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../../shared/interfaces/TreeNode';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllNodes } from '../../stores/fs.selector';
import { LIST_DIRECTORY_CONTENTS } from '../../stores/actions/listDirectoryContents';
import { FsState } from '../../stores/fs.reducer';
import { ButtonComponent } from '../button/button.component';
import { NodeAction } from '../../shared/interfaces/NodeAction';

@Component({
  selector: 'luna-tree-view',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent, ButtonComponent],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss',
})
export class TreeViewComponent {
  public nodes$: Observable<TreeNode[]> = of([]);

  @Output() action: EventEmitter<NodeAction> = new EventEmitter();

  constructor(private readonly store: Store<{ fs: FsState }>) {
  }

  openFolder(): void {
    this.nodes$ = this.store.pipe(select(selectAllNodes));
    this.store.dispatch(LIST_DIRECTORY_CONTENTS());
  }
}
