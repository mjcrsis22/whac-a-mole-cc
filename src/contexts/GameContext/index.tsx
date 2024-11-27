import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { State, INITIAL_STATE, Actions, reducer } from './reducer';

export interface GameContextType {
  state: State;
  dispatch: Dispatch<Actions>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext<GameContextType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

interface GameContextProviderProps {
  children: ReactNode;
}

export default function GameContextProvider({
  children,
}: GameContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
