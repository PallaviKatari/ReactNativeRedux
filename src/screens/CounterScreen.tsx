// src/screens/CounterScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { increment, decrement } from "../redux/counterSlice";

export default function CounterScreen() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Counter Demo</Text>
      <Text style={styles.count}>{count}</Text>

      <View style={styles.buttons}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, marginBottom: 20 },
  count: { fontSize: 48, marginVertical: 20 },
  buttons: { flexDirection: "row", gap: 20 },
});