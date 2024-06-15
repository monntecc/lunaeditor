import type { ITitlebarMenuOption } from '@/components/system/models';

export interface ITitlebarMenu {
  /// Title of menu
  title: string;
  /// Menu options
  options: ITitlebarMenuOption[];
}
