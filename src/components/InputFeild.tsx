import React, { useRef } from 'react';
import { setTodo } from '../redux/Slice';
import { useDispatch } from 'react-redux';
import { StyleInputBox, StyleInput, StyleInputSubmit } from './Container.styled';

//tao interface co cac du lieu de truyen vao
interface Props {
  todo: string;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({todo, handleAdd}) => {
  const dispatch = useDispatch();
  //tao bien inputRef de tham chieu den 1 phan tu trong html, o day la input__box
  const inputRef = useRef<HTMLInputElement> (null);
  return (
    //xu ly su kien khi nhan gui
    <StyleInput onSubmit={(e) => {
      handleAdd(e)
      inputRef.current?.blur(); //xu ly loai bo trang thai focus, dau ? de xac dinh nut hien tai co null khong
    }}>
      
      <StyleInputBox //HTML de tao o nhap lieu
        ref={inputRef}
        type="input"
        value={todo}
        onChange={(e) => dispatch(setTodo(e.target.value))}
        placeholder='Enter a task'
      />
      <StyleInputSubmit type="submit">
        Go
      </StyleInputSubmit>
    </StyleInput>
  )
}

export default InputFeild; //export ra de co the import