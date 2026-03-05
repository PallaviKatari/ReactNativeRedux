import React from "react";
import { View, Text, Button ,StyleSheet} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { increment, decrement } from "../redux/counterSlice";

export default function CounterScreen() {
  const count = useAppSelector((state) => state.counter.value); //0

  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});
