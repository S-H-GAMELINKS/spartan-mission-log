import { useMemo } from 'react';
import { Record } from '../types';
import { GAME_TITLES } from '../utils/constants';

interface StatisticsProps {
  records: Record[];
}

export function Statistics({ records }: StatisticsProps) {
  const stats = useMemo(() => {
    const gameStats = new Map<string, {
      count: number;
      bestTime?: string;
      bestScore?: number;
      totalDeaths: number;
    }>();

    const difficultyStats = {
      Easy: 0,
      Normal: 0,
      Heroic: 0,
      Legendary: 0,
    };

    records.forEach(record => {
      // ゲーム別統計
      const gameKey = record.game_title;
      const existing = gameStats.get(gameKey) || {
        count: 0,
        bestTime: undefined,
        bestScore: undefined,
        totalDeaths: 0,
      };

      existing.count++;
      
      if (record.clear_time && (!existing.bestTime || record.clear_time < existing.bestTime)) {
        existing.bestTime = record.clear_time;
      }
      
      if (record.score && (!existing.bestScore || record.score > existing.bestScore)) {
        existing.bestScore = record.score;
      }
      
      if (record.deaths) {
        existing.totalDeaths += record.deaths;
      }

      gameStats.set(gameKey, existing);

      // 難易度別統計
      difficultyStats[record.difficulty]++;
    });

    // 最近のプレイ統計
    const recentRecords = [...records]
      .sort((a, b) => new Date(b.play_date).getTime() - new Date(a.play_date).getTime())
      .slice(0, 7);

    const totalPlayTime = records.reduce((total, record) => {
      if (record.clear_time) {
        const [hours, minutes, seconds] = record.clear_time.split(':').map(Number);
        return total + hours * 3600 + minutes * 60 + seconds;
      }
      return total;
    }, 0);

    return {
      totalRecords: records.length,
      gameStats,
      difficultyStats,
      recentRecords,
      totalPlayTime,
      averageScore: records.filter(r => r.score).reduce((sum, r) => sum + (r.score || 0), 0) / records.filter(r => r.score).length || 0,
    };
  }, [records]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}時間${minutes}分`;
  };

  const getGameLabel = (value: string) => {
    return GAME_TITLES.find(g => g.value === value)?.label || value;
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="stat-card p-8">
        <div className="text-sm text-gray-400 uppercase tracking-wider">Total Missions</div>
        <div className="stat-number text-4xl mt-3">{stats.totalRecords}</div>
        <div className="text-sm text-gray-400 mt-2">Combat Operations Logged</div>
      </div>

      <div className="stat-card p-8">
        <div className="text-sm text-gray-400 uppercase tracking-wider">Total Combat Time</div>
        <div className="stat-number text-4xl mt-3">{formatTime(stats.totalPlayTime)}</div>
        <div className="text-sm text-gray-400 mt-2">Mission Duration</div>
      </div>

      <div className="stat-card p-8">
        <div className="text-sm text-gray-400 uppercase tracking-wider">Average Score</div>
        <div className="stat-number text-4xl mt-3">{stats.averageScore.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
        <div className="text-sm text-gray-400 mt-2">Combat Effectiveness</div>
      </div>

      <div className="halo-card md:col-span-2 lg:col-span-3">
        <div className="halo-card-header p-8">
          <h3 className="text-xl font-bold text-white">Campaign Statistics</h3>
          <p className="text-gray-300 mt-2">Performance breakdown by game title</p>
        </div>
        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="halo-table w-full">
              <thead>
                <tr>
                  <th>Game Title</th>
                  <th>Missions</th>
                  <th>Best Time</th>
                  <th>Best Score</th>
                  <th>Total Deaths</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(stats.gameStats.entries()).map(([game, data]) => (
                  <tr key={game}>
                    <td className="font-medium text-white">{getGameLabel(game)}</td>
                    <td>{data.count}</td>
                    <td>{data.bestTime || '-'}</td>
                    <td>{data.bestScore?.toLocaleString() || '-'}</td>
                    <td>{data.totalDeaths || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="halo-card">
        <div className="halo-card-header p-8">
          <h3 className="text-xl font-bold text-white">Difficulty Analysis</h3>
          <p className="text-gray-300 mt-2">Mission attempts by difficulty</p>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Easy</span>
              <span className="stat-number text-2xl">{stats.difficultyStats.Easy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Normal</span>
              <span className="stat-number text-2xl">{stats.difficultyStats.Normal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Heroic</span>
              <span className="stat-number text-2xl">{stats.difficultyStats.Heroic}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Legendary</span>
              <span className="stat-number text-2xl">{stats.difficultyStats.Legendary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}