import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import questReducer from './slices/questSlice';
import memberSlice from './slices/memberSlice';
import friendSlice from './slices/friendSlice';
import chatSlice from './slices/chatSlice';
import alertSlice from './slices/alertSlice';

export const store = configureStore({
    reducer: {
        quest: questReducer,
        member: memberSlice,
        friend: friendSlice,
        chat: chatSlice,
        alert: alertSlice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
