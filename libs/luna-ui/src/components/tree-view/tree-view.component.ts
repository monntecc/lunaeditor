import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../../shared/interfaces/TreeNode';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllNodes } from '../../stores/fs.selector';
import { LIST_DIRECTORY_CONTENTS } from '../../stores/actions/listDirectoryContents';
import { FsState } from '../../stores/fs.reducer';

@Component({
  selector: 'luna-tree-view',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss',
})
export class TreeViewComponent implements OnInit {
  public nodes$!: Observable<TreeNode[]>;

  constructor(private readonly store: Store<{ fs: FsState }>) {
  }

  ngOnInit(): void {
    this.nodes$ = this.store.pipe(select(selectAllNodes));
    this.store.dispatch(LIST_DIRECTORY_CONTENTS({ path: './' }));
  }
}
