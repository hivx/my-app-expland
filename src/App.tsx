import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "./redux/Store";
import InputFeild from './components/InputFeild';//import inputfeild
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { addTodo, setTodo, setTodos, setCompletedTodos, select } from './redux/SliceTodo';
import { StyledApp, StyleHeading, StyleMenu, StyleMenuList,
  StyleContainerHeading } from './Container.styled';
import InfoForm from './forms/FormHome';
import { 
  Routes, 
  Route, 
  useNavigate,
} from "react-router-dom";
import EditForm from './forms/FormEdit';

const App: React.FC = () => {
  const todo = useSelector(select);
  const todos = useSelector((state: RootState) => state.arrayTodo.todos);
  const completedTodos = useSelector((state: RootState) => state.arrayTodo.completedTodos);
  const formData = useSelector((state: RootState) => state.formData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExitClick = () => {
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

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
      <StyledApp>
        <Routes>
          <Route path="/" element={
            <>
              <StyleHeading> ✨ Taskify </StyleHeading>
              <InfoForm />
            </>
          } />
          <Route path="/todo" element={
            <>
              <StyleContainerHeading>
                <StyleMenuList>
                  <StyleMenu>{`${formData.lastname} ${formData.firstname}`}</StyleMenu>
                  <StyleMenu>{`${formData.age} years old`}</StyleMenu>
                  <StyleMenu>{formData.job}</StyleMenu>
                  <StyleMenu onClick={handleExitClick}>Exit</StyleMenu>
                </StyleMenuList>
                <StyleHeading> ✨ Taskify </StyleHeading>
              </StyleContainerHeading>
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
            </>
          } />
          <Route path="/edit" element={
            <>
              <StyleHeading> ✨ Taskify </StyleHeading>
              <EditForm />
            </>
          } />
        </Routes>
      </StyledApp>
  );
}

export default App;
