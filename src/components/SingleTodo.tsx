//Xu ly tung todo
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../redux/Store';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { StyleIcons, IconsContainer, InputTodosText, InputTodosTextDone, StyleTodosSingle } from './Container.styled'
import {useDispatch} from 'react-redux'
import { Draggable } from 'react-beautiful-dnd';
import { doneTodo, deleteTodo, editSingle } from '../redux/Slice';

//dung interface cung duoc
type Props = {
  index: number,
  todo: Todo,
}

const SingleTodo  = ({index, todo}:Props) => {
  //khai bao state voi bien edit de cap nhap trang thai edittodo
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const dispatch = useDispatch();

  //chuyen doi gia tri isDone
  const handleDone = (id: number) => {  
    dispatch(doneTodo(id));
  };
  //xoa todo theo id
  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };
  const handleEdit = (e: React.FormEvent, id: number, todo: string) => {
    e.preventDefault();

    dispatch(editSingle({id, todo: editTodo}));
    setEdit(false);
  };

  //tham chieu vao element input
  const inputRef = useRef<HTMLInputElement>(null);

  //khi tham chieu khac null va gia tri edit thay doi se focus va input
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]); //edit thay doi false or true
  
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          //HTML (JSX)
          <StyleTodosSingle 
            onSubmit={(e) => handleEdit(e, todo.id, editTodo)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            { edit ? (
              //input cho phep chinh sua todo
              <InputTodosText
                ref={inputRef}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
              ) : (
                <InputTodosTextDone isDone={todo.isDone}>
                  {todo.todo}
                </InputTodosTextDone>
              )
            }

            <IconsContainer>
              {/* doi gia tri edit */}
                <StyleIcons  onClick={() =>{
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}>
                  <EditOutlinedIcon />
                </StyleIcons>
                <StyleIcons  onClick={() => handleDelete(todo.id)}>
                  <DeleteOutlineIcon />
                </StyleIcons>
                <StyleIcons onClick={() => handleDone(todo.id)}>
                  <CheckOutlinedIcon /> 
                </StyleIcons>
            </IconsContainer>
          </StyleTodosSingle>
        )
      }   
    </Draggable>
  )
};

export default SingleTodo;