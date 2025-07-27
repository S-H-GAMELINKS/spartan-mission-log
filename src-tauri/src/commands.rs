use crate::models::{Record, NewRecord};
use crate::database;

#[tauri::command]
pub async fn create_record(
    app_handle: tauri::AppHandle,
    record: NewRecord,
) -> Result<i32, String> {
    database::insert_record(&app_handle, record)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_records(
    app_handle: tauri::AppHandle,
) -> Result<Vec<Record>, String> {
    database::get_all_records(&app_handle)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_record(
    app_handle: tauri::AppHandle,
    id: i32,
    record: NewRecord,
) -> Result<(), String> {
    database::update_record(&app_handle, id, record)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_record(
    app_handle: tauri::AppHandle,
    id: i32,
) -> Result<(), String> {
    database::delete_record(&app_handle, id)
        .map_err(|e| e.to_string())
}