import { useState } from 'react';
import { Layout } from './components/Layout';
import { RecordForm } from './components/RecordForm';
import { RecordList } from './components/RecordList';
import { Statistics } from './components/Statistics';
import { useRecords } from './hooks/useRecords';
import { Record, NewRecord } from './types';

type View = 'form' | 'list' | 'stats';

function App() {
  const [currentView, setCurrentView] = useState<View>('form');
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const { records, isLoading, error, createRecord, updateRecord, deleteRecord } = useRecords();

  const handleSubmit = async (record: NewRecord) => {
    if (editingRecord && editingRecord.id) {
      await updateRecord(editingRecord.id, record);
      setEditingRecord(null);
      setCurrentView('list');
    } else {
      await createRecord(record);
      alert('記録を保存しました');
    }
  };

  const handleEdit = (record: Record) => {
    setEditingRecord(record);
    setCurrentView('form');
  };

  const handleDelete = async (id: number) => {
    await deleteRecord(id);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">読み込み中...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-destructive">エラー: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex gap-2 mb-10">
          <button
            className={`nav-tab ${currentView === 'form' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('form');
              setEditingRecord(null);
            }}
          >
            Mission Entry
          </button>
          <button
            className={`nav-tab ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            Mission Archive
          </button>
          <button
            className={`nav-tab ${currentView === 'stats' ? 'active' : ''}`}
            onClick={() => setCurrentView('stats')}
          >
            Combat Statistics
          </button>
        </div>

        {currentView === 'form' && (
          <RecordForm
            onSubmit={handleSubmit}
            initialData={editingRecord ? {
              game_title: editingRecord.game_title,
              mission_name: editingRecord.mission_name,
              difficulty: editingRecord.difficulty,
              play_date: editingRecord.play_date,
              clear_time: editingRecord.clear_time,
              score: editingRecord.score,
              deaths: editingRecord.deaths,
              memo: editingRecord.memo,
            } : undefined}
            isEditing={!!editingRecord}
          />
        )}

        {currentView === 'list' && (
          <RecordList
            records={records}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {currentView === 'stats' && (
          <Statistics records={records} />
        )}
      </div>
    </Layout>
  );
}

export default App;