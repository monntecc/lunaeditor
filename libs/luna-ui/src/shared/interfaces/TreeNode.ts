export interface TreeNode {
  // Tree node is directory?
  is_dir: boolean,
  // Name of folder/file
  name: string,
  // Folder/file path
  path: string,
  // File extension (folder will get empty string)
  extension: string,
  // File content in bytes (folder will get empty vec)
  bytes: number[],
  // File content in string (folder will get empty string)
  text: string,
  // Files under folder (file will get empty vec)
  nodes: TreeNode[]
}
