import { GameTitle, Difficulty } from '../types';

export const GAME_TITLES: { value: GameTitle; label: string }[] = [
  { value: 'CE', label: 'Halo CE' },
  { value: '2', label: 'Halo 2' },
  { value: '3', label: 'Halo 3' },
  { value: 'ODST', label: 'Halo 3: ODST' },
  { value: 'Reach', label: 'Halo: Reach' },
  { value: '4', label: 'Halo 4' },
  { value: '5', label: 'Halo 5: Guardians' },
  { value: 'Infinite', label: 'Halo Infinite' }
];

export const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Normal', label: 'Normal' },
  { value: 'Heroic', label: 'Heroic' },
  { value: 'Legendary', label: 'Legendary' }
];