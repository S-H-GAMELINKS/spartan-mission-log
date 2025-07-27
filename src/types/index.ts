export type GameTitle = 'CE' | '2' | '3' | 'ODST' | 'Reach' | '4' | '5' | 'Infinite';
export type Difficulty = 'Easy' | 'Normal' | 'Heroic' | 'Legendary';

export interface Record {
    id?: number;
    game_title: GameTitle;
    mission_name: string;
    difficulty: Difficulty;
    play_date: string;
    clear_time?: string;
    score?: number;
    deaths?: number;
    memo?: string;
    created_at?: string;
}

export interface NewRecord {
    game_title: GameTitle;
    mission_name: string;
    difficulty: Difficulty;
    play_date: string;
    clear_time?: string;
    score?: number;
    deaths?: number;
    memo?: string;
}