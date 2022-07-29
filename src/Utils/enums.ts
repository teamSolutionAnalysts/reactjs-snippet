export enum TableHeight {
    defaultHeight = 599,
}

export const ButtonVariant: { [name: string]: { className: string } } = {
    gradient: { className: "primary-gradient" },
    link: { className: "link-button" },
    "round-gradient": { className: "primary-gradient round-button" },
    bordered: { className: "bordered-button" },
};

export const LOCAL_HOST_KEY = {
    AUTH_TOKEN: "auth_token",
    RESET_USERNAME: "reset_username",
    REFRESH_TOKEN: "refreshToken",
};

export const ConstantsFreeze = Object.freeze({
    DATE_FORMAT: "DD/MM/YYYY",
    PAYMENT_DATE_FORMATE: "MM/YYYY",
    HISTORY_DATE_FORMAT: "DD-MM-YYYY",
    SAVE_DATA_DATE_FORMAT: "YYYY-MM-DD",
    DISPLAY_DATE_FORMAT_WITH_TIME: "DD-MM-YYYY HH:MM:SS",
    DATE_FORMAT_WITH_TIME_DDMMYY: "DD-MM-YYYY HH:mm:ss",
    DATE_FORMAT_WITH_TIME: "YYYY-MM-DD HH:MM:SS",
    PENDING_BILL_DISPLAY_DATE_FORMAT: "Do MMMM YYYY",
    INVOICE_DISPLAY_DATE_FORMAT: "D MMMM YYYY",
    DATE_FORMAT_DOMMMMYYYY_WITHTIME: "Do MMMM, YYYY hh:mm a",
    MIN_AGE_LIMIT: "user.age.minimumAgeLimit",
    USER_PASSWORD_USERNAME_LENGTH: "user.password.username.match",
    USER_PASSWORD_SEQUENCE_LENGTH: "user.password.sequential.length",
    USER_PASSWORD_UPPERCASE: "user.password.uppercase",
    USER_PASSWORD_LOWERCASE: "user.password.lowercase",
    USER_PASSWORD_LENGTH: "user.password.length",
    USER_PASSWORD_DIGITS: "user.password.nonalphabetic",
    USER_PASSWORD_UNICODE: "user.password.notcontain.unicode",
    USER_EMAIL_LENGTH: "user.email.length",
    USER_MOBILE_LENGTH: "user.phone.length",
    PASSWORD_LENGTH: 10,
    PERSONAL_ID_TYPE_LENGTH: 11,
    VALID_FILES: ["image/jpg", "image/jpeg", "image/png", "application/pdf"],
    FILE_SIZE: 2 * 1024,
    DIGITSEQUINCE: "0123456789",
    MIN_PASSWORD_LENGTH: 10,
    CART_EMPTY_BUTTON_TEXT: "shoppingCart.message.emptyCart",
    BILL_CYCLE: "billCycle.monthly",
    CUSTOMER_CLASS: "creditClass",
    DEFAULT_CATEGORY: "DEFAULT",
    YES: "Yes",
    NO: "No",
    UNPAID_BILL_STATUS: "UNPAID",
    FULLY_PAID_BILL_STATUS: "FULLY_PAID",
    UNBILLED_BILL_STATUS: "Un-billed",
    BIILED_BILL_STATUS: "Billed",
    DAYS: "days",
    MONTHS: "months",
    YEAR: "year",
    FLOAT_NUMBER_PRECISION: 3,
    OTHER_REASON: "other",
    FNF_CATEGORY: "FNF",
    GIFT_CATEGORY: "Gifting",
    ROAMING_CATEGORY: "Roaming",
    CONTENT_CATEGORY: "Service",
    DATA_ONLY_CATEGORY: "Data Only",
    COUNTRY_CODE: "+249",
    UPDATE_FNF: "UPDATE_FNF",
    EXPIRED_STATUS: "Expired",
    UNSUBSCRIBE_STATUS: "Un-subscribed",
    ACTIVE_STATUS: "Active",
    QUOTA_SPENDING_LIMIT: "spendingLimit",
    MOBILE_MONEY: "mobile-money",
    DEBIT_CARD: "debit-card",
    MOMO: "momo",
    PENDING_STATUS: "pending",
    SUCCESS_STATUS: "success",
    FAILED_STATUS: "failed",
    SUCCESSFUL_STATUS: "successful",
    REJECTED_STATUS: "rejected",
    OFFER_SUB_TYPE: "OFFER_SUB_TYPE",
    OFFER_SUB_TYPE_VALUE: "Digital",
    ENGLISH: "English",
    ARABIC: "العربية",
    SHOW: "Show",
    CUSTOMER_CATEGORY: "CUSTOMER_CATEGORY",
    B2B: "B2B",
    PAGE_LIMIT: 10,
    ALL: "All",
    UPLOAD_DOCUMENT_TYPES: [
        "Personal Id Front",
        "Personal Id Back",
        "Photo",
        "Delegator Certificate",
        "Delegator Id Front",
        "Delegator Id Back",
    ],
    DEPOSIT: "Deposit",
    FRIENDS_FAMILY: "Friends & Family",
    COMPANY_REGISTRATION_NUMBER: "Company Registration Number",
    EXPIRED_CART: "expired",
});

export enum LENGTH_VALIDATION {
    NAME_LENGTH = 20,
    MIDDLE_NAME_LENGTH = 20,
    EMAIL_LENGTH = 50,
    CONTACT_LENGTH = 20,
    CUSTOMER_CONTACT_LENGTH = 15,
    CUSTOMER_EMAIL_LENGTH = 100,
    ADDRESS_LENGTH = 20,
    ZIP_LENGTH = 5,
    TICKET_SUBJECT = 255,
    TICKET_DESCRIPTION = 1024,
    TICKET_COMMENT = 1024,
    MSISDN_LENGTH = 10,
    PIN_LENGTH = 4,
    MAX_PIN_LENGTH = 20,
    CONTACT_NUMBER_LENGTH = 11,
    B2B_MIDDLE_NAME_LENGTH = 40,
    COMPANY_NAME_LENGTH = 100,
}
export const MEDIA_CATEGORIES = {
    THUMBNAIL: "Thumbnail",
    ICON: "Icon",
    LARGETHUMBNAIL: "LargeThumbnail",
    BANNER: "Banner",
};

export const PLAN_DETAILS = {
    Prepaid: "prepaid",
    Postpaid: "postpaid",
    PREPAID: "PREPAID",
    POSTPAID: "POSTPAID",
    PREPAID_PLAN: "Prepaid",
    POSTPAID_PLAN: "Postpaid",
    CHANGE_PLAN: "Change Plan",
};

export const PERSONAL_ID_TYPE = {
    NATIONAL_ID: "National ID",
    FOREIGNER_NUMBER: "Foreigner Number",
};
export const CUSTOMER_CATEGORY = {
    LOCAL: "Local",
    FOREIGNER: "Foreigner",
};

export const ALLOWANCE_USAGE_TYPE = {
    MAIN_BALANCE: "Main balance",
    DATA: "Data",
    VOICE: "Voice",
    SMS: "SMS",
};

export const TICKET_STATUS = {
    OPEN: "Open",
};

export const CMS_CONFIGURATION = {
    API_BLOCK: "api_blocks",
    SLIDER_BLOCK: "slider_block",
    IMAGE_BLOCK: "image_block",
    META_TITLE: "title",
    META_DESCRIPTION: "description",
};

export const DASHBOARD_COMPONENT = {
    DASHBOARD: "dashboard",
    TOPUP: "topup",
    INVOICE: "invoice",
    PAYMENT_HISTORY: "paymentHistory",
    USAGE_HISTORY: "usageHistory",
    ADD_ONS: "Addons",
    REWARD_HISTORY: "rewardHistory",
    NOTIFICATION_HISTORY: "notificationHistory",
    BALANCE: "balance",
    TOP_UP_HISTORY: "topUpHistory",
};

// ALIAS TO CHECK AUTHORIZATION BASED ON ROLES
export const COMPONENT_ALIAS = {
    VIEW_CUSTOMER_PROFILE: "view-customer-profile",
    UPDATE_CUSTOMER_PROFILE: "update-customer-profile",
    CHANGE_PASSWORD: "change-profile",
    VIEW_SUBSCRIPTION_DETAILS: "view-subscription-information",
    VIEW_ORDER_DETAILS: "view-order-details",
    INVOICE_HISTORY: "invoice-history",
    PAYMENT_HISTORY: "payment-history",
    TOPUP_HISTORY: "view-top-up-history",
    LOYALTY_POINTS: "view-loyalty-points",
    NOTIFICATION_HISTORY: "view-notification-history",
    QUOTA_ALLOWANCE_DETAIL: "view-quota-allowance-details",
    USAGE_HISTORY: "view-usage-history",
    TICKET_HISTORY: "view-ticket-history",
    CAMPAIGN_OFFERS: "campaign-wise-offer-display",
    TOPUP_AMOUNT: "top-up-via-amount",
    SUBSCRIBE_ADDON: "subscribe-add-on",
    UNSUBSCRIBE_ADDON: "unsubscribe-add-on",
    CHANGE_PLAN: "change-plan",
    CREATE_TICKET: "create-ticket",
    MANAGE_FNF: "manage-friends-n-family-FNF-List",
    CREDIT_TRANSFER: "prepaid-balance-transfer",
    CHANGE_SIM: "change-sim",
    GIFTING_ADDON: "gifting-add-on",
    PAYBILL: "pay-bill",
    PREPAID_PIN_RESET: "prepaid-pin-reset",
    MANAGE_DEPOSIT: "manage-additional-deposit",
    UPDATE_PREFERENCE: "update-preference-for-marketing-communication",
};

export const PAYMENT_SERVICE_TYPES = {
    BASE_PLAN: "base-plan-purchase",
    POSTPAID_ADDON_SUBSCRIPTION: "postpaid-add-on-subscription",
    PREPAID_TOPUP: "prepaid-top-up",
    MANAGE_DEPOSIT: "manage-deposit",
    CHANGE_PLAN: "change-plan",
    ADD_FNF: "add-more-number-in-fnf-group",
    PAYBILL: "pay-bill",
    BASE_PLAN_PURCHASE_POSTPAID_ADDON: "base-plan-purchase-and-postpaid-add-on-subscription",
    CHANGE_PLAN_POSTPAID_ADDON: "change-plan-and-postpaid-add-on-subscription",
};

export enum PERSONAL_ID_FILE_TYPE {
    FRONT = "Personal Id Front",
    BACK = "Personal Id Back",
    LIVE = "Photo",
}

export enum PASSWORD_STRENGTH {
    "lowerCase" = "lowerCase",
    "digits" = "digits",
    "upperCase" = "upperCase",
    "twoSpecialChar" = "twoSpecialChar",
}

export enum FORGOT_PASS_CONFIG {
    OTP = "OTP",
    LINK = "Link",
}

export enum CUSTOMER_ROLES {
    CA = "CA",
    SI = "SI",
}

export enum SCRATCH_MODAL_TYPE {
    PAY = "Pay",
    TOPUP = "TopUp",
}

export enum TICKET_PAGE_TYPE {
    ADD = "add-ticket",
    UPDATE = "update-ticket",
}

export const DASHBOARD_COMPONENT_CONFIG: any = {
    serviceType: {
        dashboard: ["Prepaid", "Postpaid"],
        topup: ["Prepaid"],
        invoice: ["Postpaid"],
        paymentHistory: ["Postpaid"],
        usageHistory: ["Prepaid", "Postpaid"],
        Addons: ["Prepaid", "Postpaid"],
        rewardHistory: ["Prepaid", "Postpaid"],
        notificationHistory: ["Prepaid", "Postpaid"],
        balance: ["Prepaid", "Postpaid"],
        depositAddons: ["Prepaid", "Postpaid"],
        payBill: ["Postpaid"],
        specialOffer: ["Postpaid", "Prepaid"],
        addonlist: ["Postpaid", "Prepaid"],
    },
    customerRole: {
        dashboard: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        topup: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        invoice: [CUSTOMER_ROLES.CA],
        paymentHistory: [CUSTOMER_ROLES.CA],
        usageHistory: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        Addons: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        rewardHistory: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        notificationHistory: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        balance: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        depositAddons: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        payBill: [CUSTOMER_ROLES.CA],
        specialOffer: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
        addonlist: [CUSTOMER_ROLES.CA, CUSTOMER_ROLES.SI],
    },
};

export enum UPLOAD_DOCUMENT_FILE_TYPE {
    COMPANY_ACCORDION = "companyDocument",
    DELEGATOR_ACCORDION = "delegatorDocument",
    FRONT = "Personal Id Front",
    BACK = "Personal Id Back",
    LIVE = "Photo",
    CERTIFICATE = "Delegator Certificate",
    DELEGATOR_FRONT = "Delegator Id Front",
    DELEGATOR_BACK = "Delegator Id Back",
    NATIONAL_ID_FRONT = "National ID Front",
    NATIONAL_ID_BACK = "National ID Back",
    COMPANY_REGISTRATION = "Company Registration No.",
}
