use tauri::ipc::{InvokeResponseBody, Response};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

struct Result {
    code: u32,
    message: String,
}

impl From<Result> for InvokeResponseBody {
    fn from(value: Result) -> Self {
        InvokeResponseBody::Json(format!("{{\"code\":{},\"message\":\"{}\"}}", value.code, value.message))
    }
}

#[tauri::command]
fn read_file(path: String) -> Response {
    match std::fs::read(path) {
        Ok(buffer) => Response::new(buffer),
        Err(_) => Response::new(Result {
            code: 404,
            message: String::from("File not found."),
        }),
    }
}

#[tauri::command]
fn write_file(path: String, data: Vec<u8>) -> Response {
    match std::fs::write(path, data) {
        Ok(_) => Response::new(Result {
            code: 200,
            message: String::from("File updated successfully"),
        }),
        Err(_) => Response::new(Result {
            code: 409,
            message: String::from("Cannot update a file"),
        }),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![read_file, write_file])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
