import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  modalType: "",
  isOpen: false,
  modalContent: {
    id: 1,
    title: "",
    createdAt: "",
    updatedAt: "",
    objectiveId: 1,
    seolgiId: 1,
    userId: 1,
    status: "",
    Seolgi: {
      bgFill: "#F3F3F3",
      blushFill: "#F3F3F3",
      color: "white",
      createdAt: "",
      id: 1,
      name: "",
    },
  },
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
