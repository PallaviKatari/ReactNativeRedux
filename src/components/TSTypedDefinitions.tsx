// App.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Provider, useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// ------------------
// 1️⃣ Slice
// ------------------
interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    addAmount: (state, action: PayloadAction<number>) => { state.value += action.payload; },
  },
});

const { increment, decrement, addAmount } = counterSlice.actions;

// ------------------
// 2️⃣ Store
// ------------------
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Typed hooks
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ------------------
// 3️⃣ CounterScreen Component
// ------------------
function CounterScreen() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux + TypeScript Demo</Text>
      <Text style={styles.count}>{count}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => dispatch(addAmount(5))}>
          <Text style={styles.buttonText}>Add 5</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ------------------
// 4️⃣ App Component with Provider
// ------------------
export default function App() {
  return (
    <Provider store={store}>
      <CounterScreen />
    </Provider>
  );
}

// ------------------
// 5️⃣ Styles
// ------------------
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, marginBottom: 20 },
  count: { fontSize: 48, marginVertical: 20 },
  buttons: { flexDirection: "row" },
  button: {
    backgroundColor: "#4A6CF7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});