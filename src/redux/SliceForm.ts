import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//load trang thai cua localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('FormState');
    if (serializedState === null) {
      return undefined; //tra ve ko xac dinh
    }
    return JSON.parse(serializedState);//co thi load FormState
  } catch (err) {//bat loi
    return undefined;
  }
};

//luu trang thai vao localStorage
const saveState = (state: FormState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('FormState', serializedState); //luu vao serializedState tuong tuong voi FormState
  } catch {
    console.log("error");//bat loi
  }
};

// Define the initial state
interface FormState {
  firstname: string;
  lastname: string;
  age: number;
  job: string;
}

const initialState: FormState = loadState() || {
  firstname: "",
  lastname: "",
  age: 0,
  job: "",
}

// Create a slice
const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<FormState>) => {
      const { firstname, lastname, age, job } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.age = age;
      state.job = job;

      saveState(state);
    },
  },
});

export const { saveForm } = formSlice.actions;
export default formSlice.reducer;

