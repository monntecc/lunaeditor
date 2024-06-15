export interface ITitlebarMenuOption {
  /// Title of option
  title: string;
  /// Keyboard shortcut (optional)
  shortcut?: string;
  /// Mouse click event (will be called on click)
  onInteract: (event: MouseEvent) => void;
}
