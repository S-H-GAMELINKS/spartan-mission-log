mod models;
mod database;
mod commands;

use commands::{create_record, get_all_records, update_record, delete_record};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            database::initialize_database(&app.handle())?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            create_record,
            get_all_records,
            update_record,
            delete_record
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
