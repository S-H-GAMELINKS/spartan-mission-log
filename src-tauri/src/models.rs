use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Record {
    pub id: Option<i32>,
    pub game_title: String,
    pub mission_name: String,
    pub difficulty: String,
    pub play_date: String,
    pub clear_time: Option<String>,
    pub score: Option<i32>,
    pub deaths: Option<i32>,
    pub memo: Option<String>,
    pub created_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewRecord {
    pub game_title: String,
    pub mission_name: String,
    pub difficulty: String,
    pub play_date: String,
    pub clear_time: Option<String>,
    pub score: Option<i32>,
    pub deaths: Option<i32>,
    pub memo: Option<String>,
}