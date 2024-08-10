export interface Yoyo {
  url?: string;
  handle?: string;
  id: string;
  name: string;
  diameter: number;
  width: number;
  gapWidth: number;
  color: string;
}

export enum YoyoActionType {
  ADD = 'ADD',
  DELETE = 'DELETE',
  CHANGE = 'CHANGE',
}

// An interface for our actions
export interface YoyoAction {
  type: YoyoActionType;
  yoyo: Yoyo;
}
