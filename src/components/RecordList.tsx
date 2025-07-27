import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { GAME_TITLES, DIFFICULTIES } from '../utils/constants';
import { Record, GameTitle, Difficulty } from '../types';
import { Trash2, Edit } from 'lucide-react';

interface RecordListProps {
  records: Record[];
  onEdit: (record: Record) => void;
  onDelete: (id: number) => void;
}

export function RecordList({ records, onEdit, onDelete }: RecordListProps) {
  const [filterGame, setFilterGame] = useState<GameTitle | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'time'>('date');

  const filteredAndSortedRecords = useMemo(() => {
    let filtered = records.filter(record => {
      if (filterGame !== 'all' && record.game_title !== filterGame) return false;
      if (filterDifficulty !== 'all' && record.difficulty !== filterDifficulty) return false;
      if (searchTerm && !record.mission_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.play_date).getTime() - new Date(a.play_date).getTime();
        case 'score':
          return (b.score || 0) - (a.score || 0);
        case 'time':
          if (!a.clear_time) return 1;
          if (!b.clear_time) return -1;
          return a.clear_time.localeCompare(b.clear_time);
        default:
          return 0;
      }
    });
  }, [records, filterGame, filterDifficulty, searchTerm, sortBy]);

  const handleDelete = (id: number) => {
    if (window.confirm('この記録を削除してもよろしいですか？')) {
      onDelete(id);
    }
  };

  const getGameLabel = (value: GameTitle) => {
    return GAME_TITLES.find(g => g.value === value)?.label || value;
  };

  return (
    <div className="halo-card">
      <div className="halo-card-header p-6">
        <h2 className="text-2xl font-bold text-white">Mission Archive</h2>
        <p className="text-gray-300 mt-2">Complete combat record database</p>
      </div>
      <div className="p-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <select
              className="halo-select"
              value={filterGame}
              onChange={(e) => setFilterGame(e.target.value as GameTitle | 'all')}
            >
              <option value="all">All Games</option>
              {GAME_TITLES.map((game) => (
                <option key={game.value} value={game.value}>
                  {game.label}
                </option>
              ))}
            </select>

            <select
              className="halo-select"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value as Difficulty | 'all')}
            >
              <option value="all">All Difficulties</option>
              {DIFFICULTIES.map((difficulty) => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>

            <input
              className="halo-input"
              type="text"
              placeholder="Search missions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="halo-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'score' | 'time')}
            >
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
              <option value="time">Sort by Time</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="halo-table w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Game</th>
                  <th>Mission</th>
                  <th>Difficulty</th>
                  <th>Time</th>
                  <th>Score</th>
                  <th>Deaths</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-8 text-gray-400">
                      No mission records found
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{new Date(record.play_date).toLocaleDateString('en-US')}</td>
                      <td className="font-medium text-white">{getGameLabel(record.game_title)}</td>
                      <td>{record.mission_name}</td>
                      <td>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          record.difficulty === 'Legendary' ? 'bg-red-600 text-white' :
                          record.difficulty === 'Heroic' ? 'bg-orange-600 text-white' :
                          record.difficulty === 'Normal' ? 'bg-blue-600 text-white' :
                          'bg-green-600 text-white'
                        }`}>
                          {record.difficulty}
                        </span>
                      </td>
                      <td>{record.clear_time || '-'}</td>
                      <td>{record.score?.toLocaleString() || '-'}</td>
                      <td>{record.deaths || '-'}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="halo-button ghost p-2"
                            onClick={() => onEdit(record)}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="halo-button danger p-2"
                            onClick={() => handleDelete(record.id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}