// File interface taken from tauri backend
export interface FileInformation {
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
  // uuidv4 (optional)
  id: string;
}
