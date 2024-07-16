import { NodeActionType } from './NodeActionType';

export interface NodeAction {
  action: NodeActionType;
  path: string;
}
