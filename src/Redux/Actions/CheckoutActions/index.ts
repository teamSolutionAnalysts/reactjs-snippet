import ActionTypes from "@Redux/ActionTypes";

const CheckoutActions = {
    CheckoutMainAccordionSelectedItem: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.CheckoutMainAccordionSelectedItem,
    }),
    CheckoutRegisterAccordionSelectedItem: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.CheckoutRegisterAccordionSelectedItem,
    }),
    CheckoutRegister: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetCheckoutRegister,
    }),
    CheckoutMainAccordion: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetMainAccordion,
    }),

    SetInventoryNumber: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetInventoryNumber,
    }),

    SetInvoiceNumber: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetInvoiceNumber,
    }),

    SetbaNumber: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetbaNumber,
    }),

    SetsaNumber: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetsaNumber,
    }),

    SetReservedInventoryNumber: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetReservedInventoryNumber,
    }),

    SetCartCheckout: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetCartCheckout,
    }),

    SetPlanInventoryNumber: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetPlanInventoryNumber,
    }),

    ResetAccordionsData: () => ({
        type: ActionTypes.Checkout.ResetAccordions,
    }),

    Reset: () => ({
        type: ActionTypes.Checkout.ResetReducer,
    }),
    setAddonOrder: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.AddonOrder,
    }),
    setSelectedMSISDNFromCart: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.setSelectedMSISDNFromCart,
    }),
    CheckoutUploadDocumentAccordionSelectedItem: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.CheckoutUploadDocumentAccordionSelectedItem,
    }),
    CheckoutUploadDocument: (payload: {}) => ({
        payload,
        type: ActionTypes.Checkout.SetB2BUploadDocCheckout,
    }),
};

export default CheckoutActions;
