import {
  ActionTypes,
  reducer as GameContextReducer,
  INITIAL_STATE,
} from '../../../contexts/GameContext/reducer';
import { GAME_LEVEL, GAME_SETTINGS_BY_LEVEL } from '../../../constants/game';

describe('GameContext reducer', () => {
  test('SET_STARTED action sets started', () => {
    const state = GameContextReducer(INITIAL_STATE, {
      type: ActionTypes.SET_STARTED,
      payload: true,
    });
    expect(state.started).not.toEqual(INITIAL_STATE.started);
  });

  test('SET_LEVEL action sets levelSetting', () => {
    const state = GameContextReducer(INITIAL_STATE, {
      type: ActionTypes.SET_LEVEL,
      payload: GAME_SETTINGS_BY_LEVEL[GAME_LEVEL.MEDIUM],
    });
    expect(state.levelSetting).not.toEqual(INITIAL_STATE.levelSetting);
  });

  test('SET_POINTS action sets points', () => {
    const state = GameContextReducer(INITIAL_STATE, {
      type: ActionTypes.SET_POINTS,
      payload: 50,
    });
    expect(state.points).not.toEqual(INITIAL_STATE.points);
  });

  test('SET_DEFAULT action sets nothing', () => {
    const state = GameContextReducer(INITIAL_STATE, {
      type: ActionTypes.SET_DEFAULT,
    });
    expect(state.started).toEqual(INITIAL_STATE.started);
  });
});
