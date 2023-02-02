import * as React from 'react';

function useReducer(_cardsReducer: (state: CardsState, action: CardAction) => CardsState | { cards: { _id: any; }; }, arg1: { cards: any[]; }): [any, any] {
  throw new Error('Function not implemented.');
}

export interface CardsState {
  cards: any[];
}

export interface CardAction {
  type: any;
  payload: { _id: any };
}

export const CardsContext = React.createContext<{
  state: CardsState;
  dispatch: React.Dispatch<CardAction>;
}>({
  state: { cards: [] },
  dispatch: () => null,
});

export const cardsReducer = (state: CardsState, action: CardAction) => {
  switch (action.type) {
    case 'SET_CARDS':
      return {
        cards: action.payload,
      };
    case 'CREATE_CARDS':
      return {
        cards: [action.payload, ...state.cards],
      };
    case 'DELETE_CARD':
      return {
        cards: state.cards.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

interface CardsContextProviderProps {
  children: React.ReactNode;
}

export const CardsContextProvider = ({ children }: CardsContextProviderProps) => {
  const [state, dispatch] = useReducer(cardsReducer, {
    cards: [] as any[]
  })

  return (
    <CardsContext.Provider value={{ state, dispatch }}>
      {children}
    </CardsContext.Provider>
  );
};



