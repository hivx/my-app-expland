import styled from "styled-components";
import img from './bg.png'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { MenuItem, MenuList } from '@mui/material';

export const StyledApp = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Workbench&display=swap')
    width:  100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #42c7ba;
    font-family: "Workbench", cursive;
`;

export const StyleContainerHeading = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
`;

export const StyleMenuList = styled(MenuList)`
    display: flex;
    justify-content: flex-start;
    color: black;
    font-size: 30px;
`;

export const StyleMenu = styled(MenuItem)`

`;

export const StyleHeading = styled.div`
    text-transform: uppercase;
    font-size: 40px;
    color: white;
    z-index: 1;
    text-align: center;
    margin-bottom: 10px;
    @media (max-width: 800px) {
        margin: auto;
        font-size: 35px;
    }
`;
export const StyleInput = styled.form`
    display: flex;
    width: 95%;
    position: relative;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 20px;
    @media(max-width: 700px) {
        width: 95%;
    }
`;

export const StyleInputBox = styled.input`
    width: 100%;
    border-radius: 50px;
    padding: 20px 30px;
    font-size: 25px;
    border: none;
    transition: 0.2s;
    box-shadow: inset 0 0 5px black;
    &:focus {
        box-shadow: 0 0 10px 1000px rgba(0, 0, 0, 0.5);
        outline: none;
    }
`;

export const StyleInputSubmit = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Neucha:ital,wght@0,100..900;1,100..900&display=swap');
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 12px;
    border-radius: 50px;
    right: 0px;
    border-radius: 50px;
    right: 0px;
    border: none;
    font-size: 15px;
    background-color: rgb(64, 69, 209);
    color: white;
    transition: 0.2s all;
    box-shadow: 0 0 10px black;
    font-family: "Neucha", cursive;
    cursor: pointer;
    &:hover {
        background-color: #4993e3;
    }
    &:active {
        transform: scale(0.8);
        box-shadow: 0 0 5px black;
    }
`;


export const StyleContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    align-items: flex-start;
    gap: 100px;
    @media(max-width: 700px) {
        width: 100%;
        flex-direction: column;
    }
`;

interface props {
    isDraggingOver?: boolean;
    isDone?: boolean;
    isDragging?: boolean;
}

export const StyleTodos = styled.div<props> `
    display: flex;
    width: 40%;
    flex-direction: column;
    padding: 15px;
    border-radius: 5px;
    
    ${props => props.isDraggingOver ? 
        `background-color: rgb(43, 246, 81);` : 
        `background-color: rgb(43, 206, 81)`
    };
    @media(max-width: 700px) {
        width: 95%;
        margin-bottom: 10px;
    }
    @media (max-width: 1100px) {
        width: 45%;
    }
`;

export const StyleTodosRemove = styled(StyleTodos)`
    ${props => props.isDraggingOver ? 
        `background-color: rgb(257, 101, 80);` : 
        `background-color: rgb(217, 101, 80);`
    };
`;

export const StyleTodosHeading = styled.span`
    font-size: 30px;
    text-align: center;
    color: white;
`;

export const StyleIcons = styled.div `
    margin-left: 10px;
    font-size: 25px;
    cursor: pointer;
`;

export const IconsContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const InputTodosText = styled.input`
    flex: 1;
    padding: 5px;
    border: none;
    font-size: 20px;
    &:focus {
        outline: none;
    }
`;

export const InputTodosTextDone = styled.div<props>`
    flex: 1;
    padding: 5px;
    border: none;
    font-size: 20px;
    &:focus {
        outline: none;
    }
    ${props => props.isDone ? 
        `text-decoration: line-through;` : 
        `text-decoration: none;`
    };
`;

export const StyleTodosSingle = styled.form<props>`
    display: flex;
    /* width: flex; */
    border-radius: 5px;
    padding: 20px;
    margin-top: 15px;
    background-image: url(${img}); 
    background-size: cover;

    transition: 0.2s;
    &:hover {
        box-shadow: 0 0 5px black;
        transform:  scale(1.03);
    }
    ${props => props.isDragging ? 
        `box-shadow: 0 0 20px black;` : 
        `box-shadow: 1px 1px 1px black;`
    };
`;

export const StyleForm = styled.form`
    display: flex;
    margin: 50px auto;
    width: 50%;
`;

export const BoxForm = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    margin-bottom: 20px;
`;

export const InputForm = styled(TextField)`

`;

export  const ButtonForm = styled(Button)`
    width: 100%;
`;

export const ContainerForm = styled(Container)`
    width: 100%; 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TextRed = styled.div`
    color: red;
`;

