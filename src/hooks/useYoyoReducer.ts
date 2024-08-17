import { Reducer, useReducer } from 'react';
import { Yoyo, YoyoAction, YoyoActionType } from '../types/Yoyo';

const yoyoReducer = (state: Yoyo[], action: YoyoAction) => {
  const yoyos = state;
  const yoyo = action.yoyo;
  let result = [];
  switch (action.type) {
    case YoyoActionType.ADD: {
      result = [...yoyos, yoyo];
      break;
    }
    case YoyoActionType.CHANGE: {
      result = yoyos.map((t) => {
        if (t.id === yoyo.id) {
          return yoyo;
        } else {
          return t;
        }
      });
      break;
    }
    case YoyoActionType.DELETE: {
      result = yoyos.filter((t) => t.id !== yoyo.id);
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }

  localStorage.setItem('yoyos', JSON.stringify(result));
  return result;
};

const useYoyoReducer = () => {
  const yoyos = JSON.parse(localStorage.getItem('yoyos') || '[]');

  return useReducer<Reducer<Yoyo[], YoyoAction>>(yoyoReducer, yoyos);
};

export default useYoyoReducer;
