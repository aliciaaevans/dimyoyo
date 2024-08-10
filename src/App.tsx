import { Reducer, useReducer } from 'react';
import DimensionViews from './components/DimensionViews';
import YoyoTable from './components/YoyoTable';
import { Yoyo, YoyoAction, YoyoActionType } from './types/Yoyo';

const yoyoReducer = (state: Yoyo[], action: YoyoAction) => {
  const yoyos = state;
  const yoyo = action.yoyo;
  switch (action.type) {
    case YoyoActionType.ADD: {
      return [...yoyos, yoyo];
    }
    case YoyoActionType.CHANGE: {
      return yoyos.map((t) => {
        if (t.id === yoyo.id) {
          return yoyo;
        } else {
          return t;
        }
      });
    }
    case YoyoActionType.DELETE: {
      return yoyos.filter((t) => t.id !== yoyo.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

function App() {
  const [yoyos, dispatch] = useReducer<Reducer<Yoyo[], YoyoAction>>(yoyoReducer, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-4">🪀 DimYoyo: Yo-yo Dimension Comparison Tool 🪀</h1>
      <YoyoTable dispatch={dispatch} yoyos={yoyos} />
      <DimensionViews yoyos={yoyos}></DimensionViews>
    </>
  );
}

export default App;
