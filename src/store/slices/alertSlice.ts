import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';


interface AlertState {
    chatdeleteIsOpen: boolean;
    text: string;
    type: string;
}

const initialState: AlertState = {
    chatdeleteIsOpen: false,
    text: "",
    type: ""
};

export const showAlert = (url: string | null, type: string, text: string): AppThunk => dispatch => {
    dispatch(setText({ text: text, type: type }))
    dispatch(setOpen(type));
    setTimeout(() => {
        dispatch(setOpen(type));
        if (url) window.location.replace(url);
    }, 2000);
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setOpen(state, action: PayloadAction<string>) {
            if (action.payload == "chatDelete")
                state.chatdeleteIsOpen = !state.chatdeleteIsOpen;
        },
        setText(state, action: PayloadAction<{ text: string, type: string }>) {
            state.text = action.payload.text;
            state.type = action.payload.type;
        }
    }
});

export const { setOpen, setText } = alertSlice.actions;

export default alertSlice.reducer;
