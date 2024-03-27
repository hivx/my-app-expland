import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputFeild from './components/InputFeild';//import inputfeild
import { RootState } from "./redux/Store";
import { addTodo, setTodo, setTodos, setCompletedTodos } from './redux/Slice';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { select } from './redux/Slice';
import { StyledApp, StyleHeading } from './components/Container.styled';

const App: React.FC = () => {
  const todo = useSelector(select);
  const todos = useSelector((state: RootState) => state.arrayTodo.todos);
  const completedTodos = useSelector((state: RootState) => state.arrayTodo.completedTodos);
  const dispatch = useDispatch();

  //tao su kien xu ly form ma khong load trang, khi submit
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    //xu ly tao 1 input moi khi da nhap 1 cong viec
    //neu todo khong phai la null hoac undefined va gia tri todo.todo(todo input) cung phai ton tai truoc khi thuc hien them moi 1 todo
    if (todo && todo.todo) {
      dispatch(addTodo(todo.todo));
      dispatch(setTodo(""));
    }
  };

  // xu ly su kien ket thuc keo tha
  // them kieu du lieu dropresult trong Typescript 
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    //dich la null
    if (!destination) {
      return;
    }
    //dich va vi tri khac nguon
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = [...todos]; //copy lai mang
    let complete = [...completedTodos];
    
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);//splice de loai bo phan tu khoi mang
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add); //splice de chen phan tu vao mang
    } else {
      complete.splice(destination.index, 0, add);
    }
    //cap nhat
    dispatch(setTodos(active));
    dispatch(setCompletedTodos(complete));
    // setcompletedTodos(complete);
  };
  return (
    //HTML
    <StyledApp theme={{ fontUrl: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap"}}>
        <StyleHeading> ✨ Taskify </StyleHeading>
        <InputFeild 
          todo={todo.todo}
          handleAdd={handleAdd}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList 
            todos={todos} 
            completedTodos={completedTodos}
          />
        </DragDropContext>
    </StyledApp>
  );
}

export default App;
