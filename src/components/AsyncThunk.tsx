import React from "react";
import {View, Text, Button} from "react-native";
import {Provider, useDispatch, useSelector} from "react-redux";
import {configureStore, createSlice, createAsyncThunk} from "@reduxjs/toolkit";

/* -------------------- TYPES -------------------- */

type CounterState = {
  value: number;
  loading: boolean;
};

/* -------------------- ASYNC ACTION -------------------- */

const fetchRandomNumber = createAsyncThunk<number>(
  "counter/random",
  async () => {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        const random = Math.floor(Math.random() * 10);
        resolve(random);
      }, 1000);
    });
  }
);

/* -------------------- SLICE -------------------- */

const counterSlice = createSlice({
  name: "counter",
  initialState: {value: 0, loading: false} as CounterState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomNumber.fulfilled, (state, action) => {
        state.value += action.payload;
        state.loading = false;
      });
  },
});

const {increment, decrement} = counterSlice.actions;

/* -------------------- STORE -------------------- */

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

/* -------------------- SCREEN -------------------- */

function CounterScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const count = useSelector((state: RootState) => state.counter.value);
  const loading = useSelector((state: RootState) => state.counter.loading);

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      
      <Text style={{fontSize: 30}}>Count: {count}</Text>

      <Button title="Increment" onPress={() => dispatch(increment())} />

      <Button title="Decrement" onPress={() => dispatch(decrement())} />

      <Button
        title="Add Random (Async)"
        onPress={() => dispatch(fetchRandomNumber())}
      />

      {loading && <Text>Loading...</Text>}
      
    </View>
  );
}

/* -------------------- APP -------------------- */

export default function AsyncThunk() {
  return (
    <Provider store={store}>
      <CounterScreen />
    </Provider>
  );
}