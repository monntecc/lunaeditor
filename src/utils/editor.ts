import {decodeFile, encodeFile, openFile, readFile, saveDialog, writeFile} from "@/utils/file-system.ts";
import { getStorageValue, setStorageValue } from "@/utils/storage.ts";
import { FileState, StorageState } from "@/model/StorageState.ts";
import { v4 as uuidv4 } from 'uuid';
import {SuccessResult} from "@/model/SuccessResult.ts";

// Constants
const STORAGE_STATE_NAME: string = 'luna.state.opened';

// Local functions
const updateStorageState = async (path: string, directory: boolean = false): Promise<void> => {
    const state: StorageState = getStorageState();
    if (directory) {
        state.opened = [];
        state.directory = path;
    } else {
        state.opened = state.opened.map((v: FileState): FileState => ({ ...v, active: false}));
        const id: string = uuidv4();
        const title: string = path.split('\\').pop() || 'Untitled';
        let content: string = '';
        if (path) content = await decodeFile(await readFile((path)));
        state.opened.push({ id, path, title, active: true, content });
    }
    setStorageValue<StorageState>(STORAGE_STATE_NAME, state);
}

const removeFromState = (id: string, directory: boolean = false): void => {
    const state: StorageState = getStorageState();
    if (directory) {
        state.opened = [];
        state.directory = undefined;
    } else {
        const file: FileState | undefined = state.opened.find((v: FileState): boolean => v.id === id);
        if (!file) return;
        const index: number = state.opened.findIndex((v: FileState): boolean => v.id === id);
        if (index === -1) return;
        state.opened.splice(index, 1);
        if (file.active && state.opened.length - 1 > 0) state.opened[state.opened.length - 1].active = true; // Make previous tab as active
    }
    setStorageValue<StorageState>(STORAGE_STATE_NAME, state);
}

export const getStorageState = (): StorageState => {
    return getStorageValue<StorageState>(STORAGE_STATE_NAME, { opened: [], directory: undefined }) as StorageState;
}

export const openAndSaveToStorage = async (directory: boolean = false): Promise<void> => {
    // Open a file or folder
    const path = await openFile({
        directory,
        multiple: false,
        recursive: directory,
    });
    if (!path) return;
    updateStorageState(path, directory).catch();
}

export const openEmptyAndSave = (): void => {
    updateStorageState('', false).catch();
};

export const updateOpenedState = (fileState: FileState[]): void => {
    const state: StorageState = getStorageState();
    state.opened = fileState;
    setStorageValue<StorageState>(STORAGE_STATE_NAME, state);
}

export const saveFileAs = async (): Promise<boolean> => {
    const state: StorageState = getStorageState();
    // Get active file
    const active: FileState | undefined = state.opened.find((v: FileState): boolean => v.active);
    if (!active) return false;
    // Save active file
    const buffer: Uint8Array = await encodeFile(active.content);
    if (!active.path) {
        const path: string | null = await saveDialog({
            title: 'Save file as',
            canCreateDirectories: true,
        });
        if (!path) return false;
        active.path = path;
    }
    const result: SuccessResult = await writeFile(active.path, buffer);
    if (result.code === 200) {
        // Update current state
        active.title = active.path.split('\\').pop()!;
        updateOpenedState(state.opened);
        return true;
    }
    else return false;
};

export const closeAndSaveToStorage = async (id: string, directory: boolean = false): Promise<void> => {
    removeFromState(id, directory);
}