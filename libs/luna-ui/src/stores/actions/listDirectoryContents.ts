import { createAction, props } from '@ngrx/store';

export const LIST_DIRECTORY_CONTENTS = createAction(
  '[FileSystem] List Directory Contents',
  props<{ path: string }>()
);
