import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavProgressState {
  isActive: boolean;
  isLoading: boolean;
  startTime: number | null;
}

const initialState: NavProgressState = {
  isActive: false,
  isLoading: false, // Mặc định false khi mới vào trang
  startTime: null,
};

const navProgressSlice = createSlice({
  name: "navProgress",
  initialState,
  reducers: {
    start: (state) => {
      console.log("🚀 Redux Action: start() - Setting isLoading: true");
      state.isActive = true;
      state.isLoading = true;
      state.startTime = Date.now();
    },
    stop: (state) => {
      console.log("⏹️ Redux Action: stop() - Setting isLoading: false");
      state.isActive = false;
      state.isLoading = false;
      state.startTime = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log(
        "⚙️ Redux Action: setLoading() - Setting isLoading:",
        action.payload
      );
      state.isLoading = action.payload;
    },
  },
});

export const { start, stop, setLoading } = navProgressSlice.actions;
export default navProgressSlice.reducer;
