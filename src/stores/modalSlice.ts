import { createSlice } from "@reduxjs/toolkit";
import { COLORS } from "../utils/constants";
import { SnackbarType } from "./types";

const initialState: any = {
    loader: {
        active: false,
        bg: COLORS.dark_overlay,
        color: COLORS.white,
      },
      snackbar: {
        active:false,
        type: SnackbarType.NONE,
        message: "",
      },
};
export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loader = action.payload;
    },
    setSnackbar: (state, action) => {
        state.snackbar = action.payload;
      },
  },
});

export const {setLoading,setSnackbar } = modalSlice.actions;
export default modalSlice.reducer;
