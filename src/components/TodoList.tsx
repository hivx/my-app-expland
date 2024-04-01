import React from 'react'
import { Todo } from '../redux/Store';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';
import { StyleContainer, StyleTodos, StyleTodosRemove,
  StyleTodosHeading } from '../Container.styled'

interface Props {
  todos: Todo[];
  completedTodos: Todo[];
}
// const TodoList = ({todos, setTodos, CompletedTodos, setCompletedTodos}: Props  ) => {//Functional Component
const TodoList: React.FC<Props> = ({todos, completedTodos}) => {
  
  return (
    <StyleContainer>
      <Droppable droppableId="TodosList">
        {//snapshot de xu ly them css cho class todo khi keo tha
          (provided, snapshot) => (
          <StyleTodos
            ref={provided.innerRef}
            {...provided.droppableProps} //truyen du lieu vao mang
            isDraggingOver={snapshot.isDraggingOver}
          >
          <StyleTodosHeading>
            Active Tasks
          </StyleTodosHeading>
          {todos.map((todo, index) => (// lap qua cac phan tu trong mang
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id} //lay id cho moi phan tu
              />
          ))}
          {/*luu lai trang thai*/}
          {provided.placeholder}
          </StyleTodos>
          )
        }
        </Droppable>
        <Droppable droppableId="Completed Tasks">
        {
          (provided, snapshot) => (
          <StyleTodosRemove
          //todos remove tuc la ap dung 2 css todo va remove
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
          <StyleTodosHeading>
            Completed Tasks
          </StyleTodosHeading>
          {completedTodos.map((todo, index) => (// lap qua cac phan tu trong mang
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id} //lay id cho moi phan tu
              />
          ))}
          {/*luu lai trang thai*/}
          {provided.placeholder}            
          </StyleTodosRemove>
          )
        }
      </Droppable>
    </StyleContainer>
  );
};

export default TodoList;