export interface FileState {
    // Unique file id
    id: string;
    // File title
    title: string;
    // File path in a system
    path: string;
    // Is file active
    active: boolean;
    // File content
    content: string;
}

export interface StorageState {
    // Opened files (from active directory or not)
    opened: Array<FileState>;
    // If directory is opened, store the path to it
    directory: string | undefined;
}