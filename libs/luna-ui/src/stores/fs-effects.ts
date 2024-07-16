import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { LIST_DIRECTORY_CONTENTS } from './actions/listDirectoryContents';
import { DIRECTORY_CONTENTS } from './actions/directoryContents';
import { FileSystemService } from '../services/file-system.service';
import { TreeNode } from '../shared/interfaces/TreeNode';

@Injectable({
  providedIn: 'root',
})
export class FsEffects {

  listDirectoryContents$ = createEffect(() => this.actions$.pipe(
    ofType(LIST_DIRECTORY_CONTENTS),
    mergeMap(() => this.fileSystem.openFolder().pipe(
      map((res: any) => res as TreeNode[]),
      map(nodes => DIRECTORY_CONTENTS({ nodes }))
    ))
  ));

  constructor(
    private actions$: Actions,
    private fileSystem: FileSystemService
  ) {
  }

}
