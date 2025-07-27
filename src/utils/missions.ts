import { GameTitle } from '../types';

export const MISSIONS: Record<GameTitle, string[]> = {
  'CE': [
    'The Pillar of Autumn',
    'Halo',
    'The Truth and Reconciliation', 
    'The Silent Cartographer',
    'Assault on the Control Room',
    '343 Guilty Spark',
    'The Library',
    'Two Betrayals',
    'Keyes',
    'The Maw'
  ],
  '2': [
    'The Heretic',
    'The Armory', 
    'Cairo Station',
    'Outskirts',
    'Metropolis',
    'The Arbiter',
    'The Oracle',
    'Delta Halo',
    'Regret',
    'Sacred Icon',
    'Quarantine Zone',
    'Gravemind',
    'Uprising',
    'High Charity',
    'The Great Journey'
  ],
  '3': [
    'Arrival',
    'Sierra 117',
    'Crow\'s Nest',
    'Tsavo Highway',
    'The Storm',
    'Floodgate',
    'The Ark',
    'The Covenant',
    'Cortana',
    'Halo'
  ],
  'ODST': [
    'Prepare To Drop',
    'Mombasa Streets',
    'Tayari Plaza',
    'Uplift Reserve',
    'Kizingo Boulevard',
    'ONI Alpha Site',
    'NMPD HQ',
    'Kikowani Station',
    'Data Hive',
    'Coastal Highway'
  ],
  'Reach': [
    'Noble Actual',
    'Winter Contingency',
    'ONI: Sword Base',
    'Nightfall',
    'Tip of the Spear',
    'Long Night of Solace',
    'Exodus',
    'New Alexandria',
    'The Package',
    'The Pillar of Autumn'
  ],
  '4': [
    'Dawn',
    'Requiem',
    'Forerunner',
    'Infinity',
    'Reclaimer',
    'Shutdown',
    'Composer',
    'Midnight'
  ],
  '5': [
    'Osiris',
    'Blue Team',
    'Glassed',
    'Unconfirmed',
    'Evacuation',
    'Reunion',
    'Swords of Sanghelios',
    'Enemy Lines',
    'Battle of Sunaion',
    'Genesis',
    'The Breaking',
    'Guardians'
  ],
  'Infinite': [
    'Warship Gbraakon',
    'Foundation',
    'The Tower',
    'Excavation Site',
    'Conservatory',
    'Spire',
    'Pelican Down',
    'The Sequence',
    'Nexus',
    'The Command Spire',
    'Repository',
    'The Road',
    'House of Reckoning',
    'Silent Auditorium'
  ]
} as const;