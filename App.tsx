// src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import CounterScreen from "./src/screens/CounterScreen";
import TSApp from "./src/components/TSTypedDefinitions";

export default function App() {
  return (
    <Provider store={store}>
      {/* <CounterScreen /> */}
      <TSApp/>
    </Provider>
  );
}