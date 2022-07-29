const ActionTypes = {
    Home: {
        ResetReducer: "Home_ResetReducer",
        SetReducer: "Home_SetReducer",
        setConfiguration: "Home_SetConfiguration",
        setUserConfiguration: "Home_SetUserConfiguration",
        clearUserConfiguration: "Home_ClearUserConfiguration",
        setTicketCategories: "Home_SetTicketCategories",
        setTicketSubCategories: "Home_SetTicketSubCategories",
        setUserMSISDNConfig: "Home_SetUserMSISDNConfig",
    },
    Common: {
        SetReducer: "Common_SetReducer",
        ResetReducer: "Common_ResetReducer",
        SetCategoryItems: "Common_Set_Category_Items",
        SetInitialPageLoad: "Common_SetInitialPageLoad",
        SetCheckoutData: "Common_SetCheckoutData",
        SetIsCustomerRegistrationExecuted: "Common_SetIsCustomerRegistrationExecuted",
        StartLoading: "start_loading",
        StopLoading: "stop_loading",
        planID: "plan_id",
    },
    Checkout: {
        SetCheckoutRegister: "Checkout_SetCheckoutRegister",
        CheckoutMainAccordionSelectedItem: "Checkout_CheckoutMainAccordionSelectedItem",
        SetMainAccordion: "Checkout_SetMainAccordion",
        CheckoutRegisterAccordionSelectedItem: "Checkout_CheckoutRegisterAccordionSelectedItem",
        ResetReducer: "Checkout_ResetReducer",
        SetInventoryNumber: "Checkout_SetInventoryNumber",
        SetbaNumber: "Checkout_SetbaNumber",
        SetsaNumber: "Checkout_SetsaNumber",
        SetInvoiceNumber: "Checkout_SetInvoiceNumber",
        SetReservedInventoryNumber: "Checkout_SetReservedInventoryNumber",
        SetCartCheckout: "Checkout_SetCartCheckout",
        SetPlanInventoryNumber: "Checkout_SetPlanInventoryNumber",
        ResetAccordions: "Checkout_ResetAccordions",
        AddonOrder: "Addon_Order",
        CheckoutUploadDocumentAccordionSelectedItem: "Checkout_UploadDocumentAccordionSelectedItem",
        SetB2BUploadDocCheckout: "Checkout_SetB2BUploadDocument",
        setSelectedMSISDNFromCart: "Checkout_SetSelectedMSISDNFromCart",
    },
    Plan: {
        SetPlanName: "Plan_SetPlanName",
        SetIccId: "Plan_SetIccId",
        SetSimOperatorType: "Plan_SetSimOperatorType",
        SetEffectDate: "Plan_SetEffectDate",
        SetProductId: "Plan_SetProductId",
        SetPaymentMode: "Plan_SetPaymentMode",
        ResetReducer: "Plan_ResetReducer",
        ClearCart: "Clear_Cart",
        SetBundleFlag: "Plan_SetBundleFlag",
    },
    Breadcrumbs: {
        SaveBreadcrumbData: "Save_Breadcrumb_Data",
        ReplaceBreadcrumb: "Replace_Breadcrumb",
    },
    Cart: {
        SetShoppingCartId: "Set_Shopping_Cart_Id",
        SetCartLineItemId: "Cart_SetCartLineItemId",
        SetReserveInventoryRes: "Cart_SetReserveInventoryRes",
        ResetReducer: "Cart_ResetReducer",
        SetRelatedPartyId: "Cart_SetRelatedPartyId",
        SetShoppingCartProductId: "Shopping_Cart_ProductId",
        setCartBadge: "Cart_setCartBadge",
        SetSubscriptionLimit: "Cart_SubscriptionLimit",
        SetAmountOverDueForCustome: "Cart_AmountOverDueForCustome",
        SetSpendingLimit: "Cart_SpendingLimit",
        SetIsRemainingSpendingLimitFound: "Cart_SetIsRemainingSpendingLimitFound",
        ChangeBasePlan: "Cart_ChangeBasePlan",
        SetUnSubAddOnListForChangePlan: "SetUnSubAddOnListForChangePlan",
        SetCartAmountForChangePlan: "SetCartAmountForChangePlan",
    },
    AnonymousUserCart: {
        SetShoppingCartId: "Set_anonymous_Shopping_Cart_Id",
        ResetReducer: "AnonymousUserCart_ResetReducer",
        SetRelatedPartyId: "AnonymousCart_SetRelatedPartyId",
        setCartBadge: "AnonymousCart_setCartBadge",
        SetUUID: "AnonymousCart_setUUID",
    },
    Dashboard: {
        setSelectMSISDNNumber: "Set_Selected_MSISDN",
        setSelectedBasicPlan: "Set_Selected_Basicplan",
        selectedServiceType: "Set_Selected_ServiceType",
        setUserAccountNumber: "Set_Selected_MSISDN_AccountNumber",
        setSelectedAddonCategory: "Set_Selected_Addon_Category",
        selectedServiceAccount: "Set_Selected_ServiceAccount",
        setIsBasicPlanExpire: "Set_IsBasicPlanExpire",
        giftingRecipientMSIDN: "Set_Gifting_Recipient_MSISDN",
        setSubType: "SetSubType",
        setUserPermissions: "Set_User_Permissions",
        ResetReducer: "Dashboard_ReserReducer",
    },
};
export default ActionTypes;
