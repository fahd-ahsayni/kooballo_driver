import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  costumer_id: null,
  id: 0,
  name: "",
  latitude: 0,
  longitude: 0,
  created_at: null,
  adress: null,
  city: null,
  litres: 0,
  isAlreadyAccepted: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setChateauDetails(state, action) {
      state.isAlreadyAccepted = action.payload.isAlreadyAccepted;
      state.costumer_id = action.payload.costumer_id;
      state.id = action.payload.id;
      state.city = action.payload.city;
      state.adress = action.payload.adress;
      state.name = action.payload.name;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.created_at = action.payload.created_at;
      state.litres = action.payload.litres;
    },
    setIsAlreadyAccepted: (state, action) => {
      state.isAlreadyAccepted = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsActive, setChateauDetails, setIsAlreadyAccepted } = appSlice.actions;

export default appSlice.reducer;
