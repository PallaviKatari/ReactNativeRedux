import {createSlice} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter', //State
  initialState: {
    value: 0,
  },
  //Reducers - Logic to update the state
  reducers: {
    //Actions
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const {increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;