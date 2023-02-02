import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ListState {
  lists: List[];
}

const initialState: ListState = {
  lists: []
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    loadLists: (state, action: PayloadAction<any | undefined>) => {
      state.lists = action.payload;
    },
    updateList: (state, action: PayloadAction<List>) => {
      const index = state.lists.findIndex(list => list.id === action.payload.id);

      if (index !== -1) {
        state.lists[index] = action.payload;
      }
    },
    removeList: (state, action: PayloadAction<number>) => {
      const newList = state.lists.filter(list => list.id !== action.payload);
      state.lists = newList;
    }
  }
});

export const {loadLists, updateList, removeList} = listSlice.actions;

export default listSlice.reducer;
