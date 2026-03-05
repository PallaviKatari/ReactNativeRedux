// createAsyncThunk - Redux Toolkit
// API Calls
// asynchronous actions in a structured way
// handles pending, fulfilled, rejected states

import React,{ useEffect } from 'react';
import { configureStore,createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';

// 1. Async thunk to fetch data
const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if(!response.ok) {
    throw new Error('Network response was not ok');
  } 
  return response.json();
});

// 2. Slice with extraReducers to handle async states
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.status = 'failed';
          });
      }
    });

// 3. Configure store
const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// 4. UI Component
function DataComponent() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status, error } = useSelector((state: RootState) => state.data);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    
    if (status === 'loading') return <View>Loading...</View>;
    if (status === 'failed') return <View>Error: {error}</View>;
    return (
      <View style={{ padding: 20 ,marginTop: 50}}>
        {items.map((item: { id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <Text key={item.id}>{item.title}</Text>
        ))}
      </View>
    );
}

// 5. Provider
export default function AsyncThunkDemo() {
  return (
    <Provider store={store}>
      <DataComponent />
    </Provider>
  );
}