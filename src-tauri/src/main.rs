// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{env, fs};
use std::collections::HashMap;
use std::fs::File;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::Command;
use serde::{Deserialize, Serialize};
use log::{error, info};
use tauri::App;

#[derive(Hash, Eq, PartialEq, Debug, Serialize, Deserialize, Default)]
struct FileInformation {
    // File name
    name: String,
    // File location
    dir: String,
    // File extension
    extension: String,
    // File content in string
    text: String,
    // File content in bytes
    bytes: Vec<u8>
}

#[tauri::command]
fn open_in_explorer(path: &str) {
    // https://doc.rust-lang.org/std/env/consts/constant.OS.html
    if env::consts::OS == "windows" {
        Command::new("explorer")
            .args(["/select,", path])
            .spawn()
            .unwrap();
    }
    // TODO: Add support for linux and macos
}

#[tauri::command]
fn open_in_default_app(path: &str) {
    // https://doc.rust-lang.org/std/env/consts/constant.OS.html
    if env::consts::OS == "windows" {
        Command::new("powershell")
            .args(["&", path])
            .spawn()
            .unwrap();
    }
    // TODO: Add support for linux and macos
}

#[tauri::command]
fn is_file(path: &str) -> bool {
    match fs::metadata(path) {
        Ok(r) => r.is_file(),
        Err(e) => {
            error!("{}", e);
            false
        }
    }
}

#[tauri::command]
fn is_directory(path: &str) -> bool {
    match fs::metadata(path) {
        Ok(r) => r.is_dir(),
        Err(e) => {
            error!("{}", e);
            false
        }
    }
}

#[tauri::command]
fn delete_file(path: &str) {
    if is_file(path) {
        // Remove only file
        match fs::remove_file(path) {
            Ok(_) => info!("File '{:?}' was removed.", PathBuf::from(path).file_name()),
            Err(e) =>  error!("Cannot remove '{}' file. Error: {}", path, e),
        }
    } else {
        // Remove directory with all files
        match fs::remove_dir_all(path) {
            Ok(_) => info!("Directory '{}' was removed.", path),
            Err(e) =>  error!("Cannot remove '{}' directory. Error: {}", path, e),
        }
    }
}

#[tauri::command]
fn read_file(path: &str) -> FileInformation {
    info!("Trying to read '{}' file!", path);

    // Get file content in bytes
    let mut bytes: Vec<u8> = Vec::new();
    match fs::read(path) {
        Ok(b) => bytes = b,
        Err(e) => error!("Cannot read '{}' file! Error: {}", path, e),
    }

    // Get file content in string
    let mut text: String = String::new();
    match fs::read_to_string(path) {
        Ok(content) => text = content,
        Err(e) => error!("Cannot read '{}' file! Error: {}", path, e),
    }

    // Get file extension
    let extension = match Path::new(path).extension() {
        Some(ext) => ext.to_str().unwrap(),
        None => {
            error!("File '{}' has no extension!", path);
            ""
        },
    };

    // Get file name
    let name = match Path::new(path).file_name() {
        Some(name) => name.to_str().unwrap(),
        None => {
            error!("File '{}' has no extension!", path);
            ""
        },
    };

    // Get file location directory (without file name)
    let dir = path.replace(name, "");

    FileInformation {
        name: String::from(name),
        extension: String::from(extension),
        text,
        bytes,
        dir
    }
}

#[tauri::command]
fn write_file(path: &str, content: &str) {
    // Convert string content to bytes
    let bytes = content.as_bytes();

    // Create new file, if not exists
    if !PathBuf::from(path).exists() {
        info!("File '{}' not found, creating new...", path);

        match File::create(path) {
            Ok(mut f) => f.write_all(bytes).unwrap(),
            Err(e) => error!("Cannot write to '{}' file! Error: {}", path, e),
        };
        return;
    }

    // Write to existing file
    match fs::write(path, bytes) {
        Ok(_) => (),
        Err(e) => error!("Cannot write to '{}' file! Error: {}", path, e),
    }
}

fn load_settings(app: &mut App) {
    info!("Load default editor settings...");

    let settings = serde_json::json!(
        {
            "editor.theme": "Dark",
            "editor.fontSize": 14,
            "editor.fontFamily": "Arial, serif, monospace",
            "editor.lineHeight": 1.45,
        }
    );
    let appdata_dir = tauri::api::path::app_local_data_dir(&app.config()).unwrap();
    let settings_path = appdata_dir.join("settings.json");

    // If settings file does not exist, create new one
    if !settings_path.try_exists().unwrap() {
        fs::write(&settings_path, settings.to_string()).unwrap();
        info!("Settings does not present. Created a new one configuration file. Path: {:?}", &settings_path);
    } else {
        info!("Settings found in path: '{:?}'", &settings_path);
    }

    // Save settings data to tauri store
    let mut defaults = HashMap::new();
    for setting in settings.as_object().unwrap() {
        defaults.entry(setting.0.clone()).or_insert_with(|| setting.1.clone());
    }

    let mut settings_store = tauri_plugin_store::StoreBuilder::new(app.handle(), settings_path)
        .defaults(defaults)
        .build();
    // Update the store
    settings_store.load().unwrap();
}

fn main() {
    let original = std::panic::take_hook();
    std::panic::set_hook(Box::new(move |info| {
        // Log tauri errors/panics
        original(info);
        error!("[FATAL]: {:?}", info.to_string());
    }));

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            open_in_explorer,
            open_in_default_app,
            is_file,
            is_directory,
            delete_file,
            read_file,
            write_file
        ])
        .plugin(tauri_plugin_fs_watch::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            load_settings(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
