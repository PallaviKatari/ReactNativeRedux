// src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import CounterScreen from "./src/screens/CounterScreen";
import AsyncThunkDemo from "./src/screens/AsyncThunkDemo";
//import TSApp from "./src/components/TSTypedDefinitions";
//import AsyncThunk from "./src/components/AsyncThunk";

export default function App() {
  return (
   <AsyncThunkDemo/>
  //  <Provider store={store}>
  //     <CounterScreen />
  //   </Provider>
  );
}