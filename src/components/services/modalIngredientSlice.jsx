import { createSlice } from '@reduxjs/toolkit';

const modalIngredientSlice = createSlice({
    name: 'modalIngredient',
    initialState: {
        active: false,
        details: {}
    },
    reducers: {
        openModal: (state, action)=> {
            state.active = true;
            state.details = action.payload
        },
        closeModal: (state, action) => {
            state.active = false
            state.details = {}
        }
    }
})

export const getStoreModalIngredient = (store) => ({
    active: store.modalIngredient.active,
    details: store.modalIngredient.details
})

export const { openModal, closeModal } = modalIngredientSlice.actions

export default modalIngredientSlice.reducer