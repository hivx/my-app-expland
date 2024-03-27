import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './Slice';

export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export const store = configureStore({
  reducer: {
    arrayTodo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;