import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './SliceTodo';
import formReducer from './SliceForm';

export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export const store = configureStore({
  reducer: {
    arrayTodo: todoReducer,
    formData: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;