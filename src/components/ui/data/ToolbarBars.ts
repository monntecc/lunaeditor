import { EToolbarElType, IToolbarBar } from '@/components/ui/models';

export const toolbarBars: IToolbarBar[] = [
  {
    icon: 'folder',
    placeholder: 'File tree',
    type: EToolbarElType.FILE_TREE
  },
  {
    icon: 'account_tree',
    placeholder: 'GitToolBox',
    type: EToolbarElType.GIT_TOOL_BOX
  },
  {
    icon: 'terminal',
    placeholder: 'Editor logs',
    type: EToolbarElType.EDITOR_LOGS
  }
];
