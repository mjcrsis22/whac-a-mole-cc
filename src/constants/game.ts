export enum GAME_LEVEL {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface GameSetting {
  id: GAME_LEVEL;
  spotRate: number;
  points: number;
}

export const GAME_SETTINGS_BY_LEVEL: {
  [key in keyof typeof GAME_LEVEL]: GameSetting;
} = {
  [GAME_LEVEL.LOW]: {
    id: GAME_LEVEL.LOW,
    spotRate: 1000,
    points: 10,
  },
  [GAME_LEVEL.MEDIUM]: {
    id: GAME_LEVEL.MEDIUM,
    spotRate: 750,
    points: 20,
  },
  [GAME_LEVEL.HARD]: {
    id: GAME_LEVEL.HARD,
    spotRate: 500,
    points: 30,
  },
};
