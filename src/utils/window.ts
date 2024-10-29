import { getCurrentWindow } from "@tauri-apps/api/window";

export async function closeWindow(): Promise<void> {
    await getCurrentWindow().close();
}

export async function maximizeWindow(): Promise<void> {
    await getCurrentWindow().toggleMaximize();
}

export async function minimizeWindow(): Promise<void> {
    await getCurrentWindow().minimize();
}