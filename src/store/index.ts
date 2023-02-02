import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import commonReducer from 'reducers/commonSlice';
import userReducer from 'reducers/userSlice';
import listReducer from 'reducers/listSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
    list: listReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
