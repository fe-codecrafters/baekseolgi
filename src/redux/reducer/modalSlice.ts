import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modalType: "",
  isOpen: false,
  modalContent: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType, modalContent } = actions.payload;
      state.modalType = modalType;
      state.modalContent = modalContent;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
