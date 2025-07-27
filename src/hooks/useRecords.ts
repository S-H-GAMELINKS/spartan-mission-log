import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Record, NewRecord } from '../types';

export function useRecords() {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await invoke<Record[]>('get_all_records');
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '記録の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const createRecord = async (record: NewRecord) => {
    setError(null);
    try {
      const id = await invoke<number>('create_record', { record });
      await fetchRecords();
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : '記録の作成に失敗しました');
      throw err;
    }
  };

  const updateRecord = async (id: number, record: NewRecord) => {
    setError(null);
    try {
      await invoke('update_record', { id, record });
      await fetchRecords();
    } catch (err) {
      setError(err instanceof Error ? err.message : '記録の更新に失敗しました');
      throw err;
    }
  };

  const deleteRecord = async (id: number) => {
    setError(null);
    try {
      await invoke('delete_record', { id });
      await fetchRecords();
    } catch (err) {
      setError(err instanceof Error ? err.message : '記録の削除に失敗しました');
      throw err;
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return {
    records,
    isLoading,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
    refetch: fetchRecords,
  };
}