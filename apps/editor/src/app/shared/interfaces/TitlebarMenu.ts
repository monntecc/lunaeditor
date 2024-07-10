import { TitlebarMenuOption } from './TitlebarMenuOption';

export interface TitlebarMenu {
  /// Title of menu
  title: string;
  /// Menu options
  options: TitlebarMenuOption[];
}
