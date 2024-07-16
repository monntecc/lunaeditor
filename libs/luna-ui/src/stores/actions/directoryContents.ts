import { createAction, props } from '@ngrx/store';
import { TreeNode } from '../../shared/interfaces/TreeNode';

export const DIRECTORY_CONTENTS = createAction(
  '[FileSystem] Directory Contents',
  props<{ nodes: TreeNode[] }>()
);
