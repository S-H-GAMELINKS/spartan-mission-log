import React, { useState } from 'react';
import { GAME_TITLES, DIFFICULTIES } from '../utils/constants';
import { MISSIONS } from '../utils/missions';
import { GameTitle, Difficulty, NewRecord } from '../types';

interface RecordFormProps {
  onSubmit: (record: NewRecord) => Promise<void>;
  initialData?: NewRecord;
  isEditing?: boolean;
}

export function RecordForm({ onSubmit, initialData, isEditing = false }: RecordFormProps) {
  const [formData, setFormData] = useState<NewRecord>(
    initialData || {
      game_title: 'CE',
      mission_name: '',
      difficulty: 'Normal',
      play_date: new Date().toISOString().split('T')[0],
      clear_time: '',
      score: undefined,
      deaths: undefined,
      memo: '',
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mission_name) {
      alert('ミッションを選択してください');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (!isEditing) {
        setFormData({
          game_title: 'CE',
          mission_name: '',
          difficulty: 'Normal',
          play_date: new Date().toISOString().split('T')[0],
          clear_time: '',
          score: undefined,
          deaths: undefined,
          memo: '',
        });
      }
    } catch (error) {
      console.error('記録の保存に失敗しました:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGameChange = (gameTitle: GameTitle) => {
    setFormData({
      ...formData,
      game_title: gameTitle,
      mission_name: '',
    });
  };

  const availableMissions = MISSIONS[formData.game_title];

  return (
    <div className="halo-card">
      <div className="halo-card-header p-6">
        <h2 className="text-2xl font-bold text-white">
          {isEditing ? 'Mission Data Update' : 'New Mission Entry'}
        </h2>
        <p className="text-gray-300 mt-2">
          Record your combat performance and mission details
        </p>
      </div>
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Game Title</label>
              <select
                className="halo-select w-full"
                value={formData.game_title}
                onChange={(e) => handleGameChange(e.target.value as GameTitle)}
              >
                {GAME_TITLES.map((game) => (
                  <option key={game.value} value={game.value}>
                    {game.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-3">Mission</label>
              <select
                className="halo-select w-full"
                value={formData.mission_name}
                onChange={(e) => setFormData({ ...formData, mission_name: e.target.value })}
                required
              >
                <option value="">Select Mission</option>
                {availableMissions.map((mission) => (
                  <option key={mission} value={mission}>
                    {mission}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Difficulty</label>
              <select
                className="halo-select w-full"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
              >
                {DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-3">Play Date</label>
              <input
                className="halo-input w-full"
                type="date"
                value={formData.play_date}
                onChange={(e) => setFormData({ ...formData, play_date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Clear Time</label>
              <input
                className="halo-input w-full"
                type="text"
                placeholder="HH:MM:SS"
                value={formData.clear_time || ''}
                onChange={(e) => setFormData({ ...formData, clear_time: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-3">Score</label>
              <input
                className="halo-input w-full"
                type="number"
                placeholder="Campaign Score"
                value={formData.score || ''}
                onChange={(e) => setFormData({ ...formData, score: e.target.value ? parseInt(e.target.value) : undefined })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-3">Deaths</label>
              <input
                className="halo-input w-full"
                type="number"
                placeholder="Death Count"
                value={formData.deaths || ''}
                onChange={(e) => setFormData({ ...formData, deaths: e.target.value ? parseInt(e.target.value) : undefined })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-3">Mission Notes</label>
            <textarea
              className="halo-input w-full min-h-[120px] resize-y"
              placeholder="Combat tactics, observations, memorable moments..."
              value={formData.memo || ''}
              onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
              rows={4}
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="halo-button px-8 py-4 text-lg"
            >
              {isSubmitting ? 'Uploading...' : isEditing ? 'Update Record' : 'Log Mission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
