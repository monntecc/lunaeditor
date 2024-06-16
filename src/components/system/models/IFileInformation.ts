// File interface taken from tauri backend
export interface IFileInformation {
  // File name
  name: string;
  // File location directory
  dir: string;
  // File extension
  extension: string;
  // File content decoded in string
  text: string;
  // File content in bytes
  bytes: number[];
  // Tab ID (optional)
  tabId?: string;
}
