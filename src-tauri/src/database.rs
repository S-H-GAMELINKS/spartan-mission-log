use rusqlite::{Connection, Result, params};
use std::path::PathBuf;
use tauri::{AppHandle, Manager};
use crate::models::{Record, NewRecord};

pub fn get_db_path(app_handle: &AppHandle) -> PathBuf {
    app_handle.path()
        .app_data_dir()
        .expect("Could not find app data directory")
        .join("spartan_mission_log.db")
}

pub fn initialize_database(app_handle: &AppHandle) -> Result<()> {
    let db_path = get_db_path(app_handle);
    let conn = Connection::open(&db_path)?;
    
    conn.execute(
        "CREATE TABLE IF NOT EXISTS records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            game_title TEXT NOT NULL,
            mission_name TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            play_date TEXT NOT NULL,
            clear_time TEXT,
            score INTEGER,
            deaths INTEGER,
            memo TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )",
        [],
    )?;
    
    Ok(())
}

pub fn insert_record(app_handle: &AppHandle, record: NewRecord) -> Result<i32> {
    let db_path = get_db_path(app_handle);
    let conn = Connection::open(&db_path)?;
    
    conn.execute(
        "INSERT INTO records (game_title, mission_name, difficulty, play_date, clear_time, score, deaths, memo)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        params![
            record.game_title,
            record.mission_name,
            record.difficulty,
            record.play_date,
            record.clear_time,
            record.score,
            record.deaths,
            record.memo,
        ],
    )?;
    
    Ok(conn.last_insert_rowid() as i32)
}

pub fn get_all_records(app_handle: &AppHandle) -> Result<Vec<Record>> {
    let db_path = get_db_path(app_handle);
    let conn = Connection::open(&db_path)?;
    
    let mut stmt = conn.prepare(
        "SELECT id, game_title, mission_name, difficulty, play_date, clear_time, score, deaths, memo, created_at
         FROM records
         ORDER BY play_date DESC"
    )?;
    
    let records_iter = stmt.query_map([], |row| {
        Ok(Record {
            id: row.get(0)?,
            game_title: row.get(1)?,
            mission_name: row.get(2)?,
            difficulty: row.get(3)?,
            play_date: row.get(4)?,
            clear_time: row.get(5)?,
            score: row.get(6)?,
            deaths: row.get(7)?,
            memo: row.get(8)?,
            created_at: row.get(9)?,
        })
    })?;
    
    let mut records = Vec::new();
    for record in records_iter {
        records.push(record?);
    }
    
    Ok(records)
}

pub fn update_record(app_handle: &AppHandle, id: i32, record: NewRecord) -> Result<()> {
    let db_path = get_db_path(app_handle);
    let conn = Connection::open(&db_path)?;
    
    conn.execute(
        "UPDATE records SET game_title = ?1, mission_name = ?2, difficulty = ?3, play_date = ?4,
         clear_time = ?5, score = ?6, deaths = ?7, memo = ?8
         WHERE id = ?9",
        params![
            record.game_title,
            record.mission_name,
            record.difficulty,
            record.play_date,
            record.clear_time,
            record.score,
            record.deaths,
            record.memo,
            id,
        ],
    )?;
    
    Ok(())
}

pub fn delete_record(app_handle: &AppHandle, id: i32) -> Result<()> {
    let db_path = get_db_path(app_handle);
    let conn = Connection::open(&db_path)?;
    
    conn.execute("DELETE FROM records WHERE id = ?1", params![id])?;
    
    Ok(())
}