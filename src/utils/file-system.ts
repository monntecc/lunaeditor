import { open, OpenDialogOptions, save, SaveDialogOptions } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { SuccessResult } from "@/model/SuccessResult.ts";

export async function openFile(options: OpenDialogOptions): Promise<string | null> {
    return await open(options);
}

export async function saveDialog(options: SaveDialogOptions): Promise<string | null> {
    return await save(options);
}

export async function readFile(path: string): Promise<Uint8Array> {
    const buffer: ArrayBuffer = await invoke('read_file', { path });
    return new Uint8Array(buffer);
}

export async function decodeFile(buffer: Uint8Array): Promise<string> {
    const decoder: TextDecoder = new TextDecoder('utf-8');
    return decoder.decode(buffer);
}

export async function encodeFile(contents: string): Promise<Uint8Array> {
    const encoder: TextEncoder = new TextEncoder();
    return encoder.encode(contents);
}

export async function writeFile(path: string, contents: string | Uint8Array): Promise<SuccessResult> {
    if (typeof contents === 'string') {
        const buffer: Uint8Array = await encodeFile(contents);
        return await invoke<SuccessResult>('write_file', { path, data: buffer });
    } else {
        return await invoke<SuccessResult>('write_file', { path, data: contents });
    }
}