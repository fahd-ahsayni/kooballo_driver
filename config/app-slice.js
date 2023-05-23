import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  id: 0,
  name: "",
  latitude: 0,
  longitude: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },

    setChateauDetails(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsActive, setChateauDetails } = appSlice.actions;

export default appSlice.reducer;
