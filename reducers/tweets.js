import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    displayTweet: (state, action) => {
      state.value.push(action.payload);
    },
    removeTweet: (state) => {
      state.value = state.value.filter(
        (tweet) => tweet.title !== action.payload.title
      );
    },
  },
});

export const { displayTweet, removeTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
