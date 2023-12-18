// imports
import { createSlice } from '@reduxjs/toolkit';
// Initial States;
const initialState = {
    personalInfo: {
        fullName: null,
        phoneNumber: null,
        email: null
    },
    deliveryAddress: {
        country: null,
        title: null,
        state: null,
        region: null,
        landmark: null,
        additional_information: null
    },
    paymentInfo: {
        serviceName: '',
        phoneNumber: '',
        imageUrl: null
    },
    // toggles
    paymentLoadingModal: false,
    paymentErrorModal: false,
    paymentSuccessfullModal: false,

}
// Main Slice;
export const ordersScreenSlice = createSlice({
    initialState,
    name: 'ordersSlice',
    reducers: {
        changePersonalInfo: (state, action) => {
            state.personalInfo = action.payload;
        },
        changeDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        changePaymentInfo: (state, action) => {
            state.paymentInfo = action.payload;
        },
        // Toggles
        showPaymentLoadingModal: (state) => {
            state.paymentLoadingModal = !state.paymentLoadingModal;
        },
        showPaymentErrorModal: (state) => {
            state.paymentErrorModal = !state.paymentErrorModal;
        },
        showPaymentSuccessfullModal: (state) => {
            state.paymentSuccessfullModal = !state.paymentSuccessfullModal;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    changePersonalInfo, changeDeliveryAddress,
    changePaymentInfo, showPaymentLoadingModal,
    showPaymentErrorModal, showPaymentSuccessfullModal
} = ordersScreenSlice.actions;

export default ordersScreenSlice.reducer;