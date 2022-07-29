/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
// #region Local Imports
// #endregion Local Imports
/* eslint-disable react/destructuring-assignment */
import ActionTypes from "@Redux/ActionTypes";
import { checkoutScreenData } from "@Utils/dummyData";

const INITIAL_STATE: any = {
    inventoryNumber: null,
    isInventoryNumberReserve: false,
    reservedInventoryNumberInfo: null,
    baNumber: "",
    saNumber: "",
    invoiceNumber: "",
    checkoutRegisterAccordionData: checkoutScreenData.checkoutRegisterAccordionData,
    mainAccordion: checkoutScreenData.mainAccordion,
    selectedMainAccordion: ["customerRegistration"],
    selectedRegisterAccordion: ["basicInfo"],
    cartCheckout: null,
    planInventoryNumber: null,
    addonOrder: false,
    selectedMSISDNFromCart: "",
    selecteduploadDocumentAccordion: ["companyDocument"],
    checkoutUploadDocumentAccordionData: checkoutScreenData.checkoutUploadDocumentAccordionData,
};

const CheckoutReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Checkout.CheckoutRegisterAccordionSelectedItem:
            return {
                ...state,
                selectedRegisterAccordion: action?.payload?.selectedRegisterAccordion || ["basicInfo"],
            };

        case ActionTypes.Checkout.SetCheckoutRegister:
            return {
                ...state,
                checkoutRegisterAccordionData: action?.payload?.checkoutRegisterAccordionData || [],
            };

        case ActionTypes.Checkout.SetInventoryNumber:
            return {
                ...state,
                inventoryNumber: action?.payload?.inventoryNumber,
            };
        case ActionTypes.Checkout.CheckoutMainAccordionSelectedItem:
            return {
                ...state,
                selectedMainAccordion: action?.payload?.selectedMainAccordion || ["customerRegistration"],
            };
        case ActionTypes.Checkout.SetMainAccordion:
            return {
                ...state,
                mainAccordion: action?.payload?.mainAccordion || [],
            };

        case ActionTypes.Checkout.SetbaNumber:
            return {
                ...state,
                baNumber: action?.payload?.baNumber,
            };
        case ActionTypes.Checkout.AddonOrder:
            return {
                ...state,
                addonOrder: action.payload,
            };
        case ActionTypes.Checkout.setSelectedMSISDNFromCart:
            return {
                ...state,
                selectedMSISDNFromCart: action?.payload?.selectedMSISDNFromCart,
            };
        case ActionTypes.Checkout.SetsaNumber:
            return {
                ...state,
                saNumber: action?.payload?.saNumber,
            };

        case ActionTypes.Checkout.SetInvoiceNumber:
            return {
                ...state,
                invoiceNumber: action?.payload?.invoiceNumber,
            };

        case ActionTypes.Checkout.SetReservedInventoryNumber:
            return {
                ...state,
                isInventoryNumberReserve: action?.payload?.isInventoryNumberReserve,
                reservedInventoryNumberInfo: action?.payload?.reservedInventoryNumberInfo,
            };

        case ActionTypes.Checkout.SetCartCheckout:
            return {
                ...state,
                cartCheckout: action?.payload?.cartCheckout,
            };

        case ActionTypes.Checkout.SetPlanInventoryNumber:
            return {
                ...state,
                planInventoryNumber: action?.payload?.planInventoryNumber,
            };

        case ActionTypes.Checkout.ResetAccordions:
            return {
                ...state,
                mainAccordion: checkoutScreenData.mainAccordion,
                selectedMainAccordion: ["customerRegistration"],
                selectedRegisterAccordion: ["basicInfo"],
                isInventoryNumberReserve: false,
                reservedInventoryNumberInfo: null,
            };

        case ActionTypes.Checkout.ResetReducer:
            return INITIAL_STATE;
        case ActionTypes.Checkout.CheckoutUploadDocumentAccordionSelectedItem:
            return {
                ...state,
                selecteduploadDocumentAccordion: action?.payload?.selecteduploadDocumentAccordion || [
                    "companyDocument",
                ],
            };
        case ActionTypes.Checkout.SetB2BUploadDocCheckout:
            return {
                ...state,
                checkoutUploadDocumentAccordionData: action?.payload?.checkoutUploadDocumentAccordionData || [],
            };
        default:
            return state;
    }
};

export default CheckoutReducer;
