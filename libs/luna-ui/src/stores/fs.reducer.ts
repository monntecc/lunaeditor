import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { DIRECTORY_CONTENTS } from './actions/directoryContents';
import { TreeNode } from '../shared/interfaces/TreeNode';

export interface FsState {
  nodes: TreeNode[];
}

export const INITIAL_FS_STATE: FsState = {
  nodes: []
}

const fsReducer: ActionReducer<FsState> = createReducer(
  INITIAL_FS_STATE,
  on(DIRECTORY_CONTENTS, (state: FsState, { path, nodes }): FsState => ({ nodes }))
);

export function reducer(state: FsState | undefined, action: Action) {
  return fsReducer(state, action);
}
