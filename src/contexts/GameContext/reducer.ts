import {
  GAME_LEVEL,
  GameSetting,
  GAME_SETTINGS_BY_LEVEL,
} from '../../constants/game';

export interface State {
  started: boolean;
  levelSetting: GameSetting;
  points: number;
}

export const INITIAL_STATE: State = {
  started: false,
  levelSetting: GAME_SETTINGS_BY_LEVEL[GAME_LEVEL.LOW],
  points: 0,
};

export enum ActionTypes {
  SET_STARTED = 'SET_STARTED',
  SET_LEVEL = 'SET_LEVEL',
  SET_POINTS = 'SET_POINTS',
  SET_DEFAULT = 'SET_DEFAULT',
}

export type SetStarted = {
  type: ActionTypes.SET_STARTED;
  payload: boolean;
};

export type SetLevel = {
  type: ActionTypes.SET_LEVEL;
  payload: GameSetting;
};

export type SetPoints = {
  type: ActionTypes.SET_POINTS;
  payload: number;
};

export type SetDefault = {
  type: ActionTypes.SET_DEFAULT;
};

export type Actions = SetStarted | SetLevel | SetPoints | SetDefault;

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_STARTED:
      return {
        ...state,
        started: action.payload,
      };
    case ActionTypes.SET_LEVEL:
      return {
        ...state,
        levelSetting: action.payload,
      };
    case ActionTypes.SET_POINTS:
      return {
        ...state,
        points: action.payload,
      };
    default:
      return state;
  }
}
