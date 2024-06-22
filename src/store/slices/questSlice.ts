import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findAll, findMemberSolveApi, findQuestionApi } from '../../services/api/questAPI';
import { Quest, QuestDetail, SolveData, Tag } from '../../pages/QuestListPage/types';

interface QuestState {
  questList: Quest[];
  searchText: string;
  tagList: Tag[];
  levelList: number[];
  stateList: (string | null)[];
  searchResult: Quest[];
  quest: Quest;
  questDetaile: QuestDetail;
  solveList: SolveData[];
}

const initialState: QuestState = {
  questList: [],
  searchText: '',
  tagList: [],
  levelList: [],
  stateList: [],
  searchResult: [],
  quest: {
    id: 0,
    state: null,
    title: "",
    level: 0,
    solved: null,
    accuracy: 0
  },
  questDetaile: {
    id: 0,
    level: 0,
    title: "",
    content: ""
  },
  solveList: []
};



export const findAllQuest = createAsyncThunk(
  'quest/findAll',
  async () => {
    try {
      const response = await findAll();
      return response;
    } catch (error) {
      console.error('Error fetching quests:', error);
      throw error;
    }
  }
);

export const findQuestion = createAsyncThunk(
  'quest/findQuestion',
  async (questionId: number) => {
    try {
      const response = await findQuestionApi(questionId);
      return response;
    } catch (error) {
      console.error('Error fetching quests:', error);
      throw error;
    }
  }
);

export const findMemberSolve = createAsyncThunk(
  'quest/findMemberSolve',
  async (loginId: string) => {
    try {
      const response = await findMemberSolveApi(loginId);
      return response;
    } catch (error) {
      console.error('Error fetching quests:', error);
      throw error;
    }
  }
);

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setTag(state, action: PayloadAction<{ type: string, checked: boolean, tagValue: string }>) {
      const { type, checked, tagValue } = action.payload;
      if (checked) {
        state.tagList.push(tagValue);
        if (type === '난이도') state.levelList.push(parseInt(tagValue));
        if (type === '상태') state.stateList.push(tagValue);
      } else {
        state.tagList = state.tagList.filter(tag => tag !== tagValue);
        state.levelList = state.levelList.filter(tag => tag !== parseInt(tagValue));
        state.stateList = state.stateList.filter(tag => tag !== tagValue);
      }
    },
    removeTag(state, action: PayloadAction<string>) {
      const tagValue = action.payload;
      state.tagList = state.tagList.filter(tag => tag !== tagValue);
      state.levelList = state.levelList.filter(tag => tag !== parseInt(tagValue));
      state.stateList = state.stateList.filter(tag => tag !== tagValue);
    },
    search(state) {
      const { searchText, questList, levelList, stateList } = state;
      const nonBlankSearchText = removeBlank(searchText);

      const searchResult = questList.filter(quest => {
        let state: string = '';
        if (quest.state === 'T') state = '푼 문제';
        if (quest.state === 'F') state = '풀고 있는 문제';
        if (quest.state === null) state = '안 푼 문제';
        const nonBlankQuestTitle = removeBlank(quest.title);
        if (!levelList.length && !stateList.length) return nonBlankQuestTitle.includes(nonBlankSearchText);
        if (!levelList.length && stateList.length) return nonBlankQuestTitle.includes(nonBlankSearchText) && stateList.includes(state);
        if (levelList.length && !stateList.length) return nonBlankQuestTitle.includes(nonBlankSearchText) && levelList.includes(quest.level);
        return nonBlankQuestTitle.includes(nonBlankSearchText) && levelList.includes(quest.level) && stateList.includes(state);
      });

      state.searchResult = searchResult;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(findAllQuest.fulfilled, (state, action) => {
        state.questList = action.payload;
        state.searchResult = action.payload;
      })
      .addCase(findQuestion.fulfilled, (state, action) => {
        state.questDetaile = action.payload;
      })
      .addCase(findMemberSolve.fulfilled, (state, action) => {
        state.solveList = action.payload;
      })
  }
});

const removeBlank = (text: string): string => {
  return text.replace(/\s+/g, '');
}


export const { setSearchText, setTag, removeTag, search } = questSlice.actions;

export default questSlice.reducer;
