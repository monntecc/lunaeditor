
import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, Observable } from 'rxjs';
import { TreeNode } from '../shared/interfaces/TreeNode';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  public openFolder(): Observable<TreeNode[]> {
    return from(invoke('open_folder')) as Observable<TreeNode[]>;
  }
}
