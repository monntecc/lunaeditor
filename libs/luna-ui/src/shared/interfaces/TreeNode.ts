export type TreeNodeType =
  "dev" | "dir" | "file" | "socket" | "symlink" | "other";

export interface TreeNode {
  uri: string;
  name: string;
  type: TreeNodeType;
}
