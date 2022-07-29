/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { notification } from "antd";
import moment from "moment";
import { ConstantsFreeze, CUSTOMER_ROLES, LOCAL_HOST_KEY } from "@Utils/enums";
import _ from "lodash";
import Cookie from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import HomeActions from "@Redux/Actions/HomeActions";
import CartActions from "@Redux/Actions/CartActions";
import CommonActions from "@Redux/Actions/CommonActions";
import CheckoutActions from "@Redux/Actions/CheckoutActions";
import PlanActions from "@Redux/Actions/PlanActions";
import AnonymousUserCartActions from "@Redux/Actions/AnonymousUserCartActions";
import DashboardActions from "@Redux/Actions/DashboardActions";
import { store } from "@Redux";
import ConfigService from "@Services/API/Config";
import NextI18NextInstance from "@Server/i18n";
import RoutPath from "@Utils/routes";

export declare type NotificationPlacement = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export const getLocalStorageItem = (key = ""): any => {
    if (process.browser) {
        return localStorage.getItem(key) || null;
    }
};
export const setLocalStorageItem = (key = "", string = ""): void => {
    if (process.browser) {
        return localStorage.setItem(key, string);
    }
};

export const localStorageRemoveItem = (key = ""): void => {
    if (process.browser) {
        return localStorage.removeItem(key);
    }
};

export const localStorageClear = (): void => {
    if (process.browser) {
        return localStorage.clear();
    }
};

// Notification Show
export const NotificationWithIcon = (
    type: string,
    message: string,
    placement: NotificationPlacement = "bottomRight"
): void => {
    if (type === "success") {
        notification.success({
            message,
            placement,
        });
    } else if (type === "error") {
        notification.error({
            message,
            placement,
        });
    } else {
        notification.info({
            message,
            placement,
        });
    }
};

export const requiredField = (fieldName: string, language = "en"): string | null => {
    if (language === "ar") {
        return `مطلوب ذكر ${fieldName}`;
    }
    return `${fieldName} is required field`;
};

export const getTodayDateAndTime = () => {
    const dateString = moment().format(ConstantsFreeze.SAVE_DATA_DATE_FORMAT);
    return dateString;
};

export const checkSequnceInPassword = (password: any, metaString: any) => {
    if (password && metaString) {
        const { length: metaStringLength } = metaString;
        let start = 0;
        let end = 3;
        while (end <= metaStringLength) {
            const subStr = metaString.substring(start, end);
            const isContain = password.includes(subStr);
            if (isContain) {
                return true;
            }
            start++;
            end++;
        }
        return false;
    }

    return false;
};

export const checkPasswordChar = (password: string) => {
    let data = [];
    data.push(
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /\d/.test(password),
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
    );
    data = _.filter(data, item => item);
    return _.size(data) < 3;
};

export const checkContainUnicode = (password: string) => {
    // eslint-disable-next-line no-control-regex
    const specialCharCheck = /[^\u0000-\u00ff]/;
    const result = specialCharCheck.test(password);
    return result;
};

export const convertBase64ToImage = (uri: string) => {
    const splitDataURI = uri.split(",");
    const byteString = splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const type = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) ia[i] = byteString.charCodeAt(i);

    const imageBlob = new Blob([ia], { type });
    const imageFile = new File([imageBlob], "live-pic.jpeg", { type });

    return imageFile;
};

export const getUserToken = () => {
    const { AUTH_TOKEN } = LOCAL_HOST_KEY;
    return Cookie.get(AUTH_TOKEN);
};

export const isUserLoggedIn = () => {
    const token = getUserToken();
    if (token) {
        return true;
    }
    return false;
};
export const UUID = () => {
    return uuidv4();
};

export const setCookie = (key: any, value: String) => {
    Cookie.set(key, value);
};
export const getCookie = (key: any) => {
    return Cookie.get(key);
};

const getCookieFromBrowser = (key: any) => Cookie.get(key);

const getCookieFromServer = (key: string, req: any) => {
    if (!req.headers.cookie) return false;

    const rawCookie = req.headers.cookie.split(";").find((c: any) => c.trim().startsWith(`${key}=`));
    if (!rawCookie) return false;
    const [, token] = rawCookie.split("=");
    if (!token) return false;

    return token;
};

export const getCookieBasedOnProcess = (key: string, req: any) => {
    if (process.browser) return getCookieFromBrowser(key);
    return getCookieFromServer(key, req);
};

export const handleLogout = (t: any, router: any, msg?: string) => {
    // clearing cookie and storage only
    // need to clear redux

    const { AUTH_TOKEN, REFRESH_TOKEN } = LOCAL_HOST_KEY;
    Cookie.remove(AUTH_TOKEN);
    Cookie.remove(REFRESH_TOKEN);
    // store.dispatch(HomeActions.ClearUserConfiguration());
    // store.dispatch(CartActions.SetShoppingCartId({ shoppingCartId: null }));
    store.dispatch(HomeActions.Reset());
    store.dispatch(CartActions.Reset());
    store.dispatch(CommonActions.Reset());
    store.dispatch(CheckoutActions.Reset());
    store.dispatch(PlanActions.Reset());
    store.dispatch(AnonymousUserCartActions.Reset());
    store.dispatch(DashboardActions.Reset());
    // removed document names from local storage
    const docType = ConstantsFreeze.UPLOAD_DOCUMENT_TYPES;
    docType.map((item: string) => {
        localStorageRemoveItem(item);
        return 0;
    });
    NotificationWithIcon("success", msg || t("sidebar:LOGOUT_SUCCESS"));
    router.push(msg ? "/login" : RoutPath.RootRoute);
};

let foundId = "";
export const findIdForCategory = (list: any[], categoryName: any) => {
    for (let i = 0; i < list.length; i += 1) {
        const item = list[i];
        if (item.name === categoryName) {
            foundId = item.additional.field_category_id;
            return foundId;
        }

        if (item.children && item.children.length) {
            findIdForCategory(item.children, categoryName);
        } else {
            // eslint-disable-next-line no-continue
            continue;
        }
    }

    return foundId;
};

export const splitStringBySpace = (str: string) => {
    return str.split(" ");
};

export const findConfigurationValue = (response: any, key: any) => {
    return _.find(response, item => item.configurableKey === key);
};

export const PasswordValidationConfig = async (lang: string) => {
    return new Promise((resolve: any, reject: any) => {
        ConfigService.getConfiguration("fields=user")
            .then((res: any) => {
                if (res?.result?.length) {
                    const response = res?.result;
                    let displayConsent = "";
                    let consentText = "";
                    let passwordStrength = "";
                    let userPasswordUsernameLength = "";
                    let userPasswordsequenceLength = "";
                    let userPasswordUppercase = "";
                    let userPasswordLowercase = "";
                    let userPasswordLength = "";
                    let userPasswordDigits = "";
                    let userPasswordUnicode = "";
                    let userEmailLength = "";
                    let userMobileLength = "";

                    const displayConsentBox = findConfigurationValue(response, "user.consent.signUp.enable");
                    if (displayConsentBox) {
                        displayConsent = displayConsentBox.configurableValue;
                    }

                    const consentTextConfiguration = findConfigurationValue(
                        response,
                        `user.consent.signUp.message.${lang}`
                    );
                    if (consentTextConfiguration) {
                        consentText = consentTextConfiguration.configurableValue;
                    }

                    const passwordStrengthConfig = findConfigurationValue(response, `user.password.strength`);
                    if (passwordStrengthConfig) {
                        passwordStrength = passwordStrengthConfig.configurableValue;
                    }

                    const userPasswordUsernameLengthResponse = findConfigurationValue(
                        response,
                        ConstantsFreeze.USER_PASSWORD_USERNAME_LENGTH
                    );
                    if (userPasswordUsernameLengthResponse) {
                        userPasswordUsernameLength = userPasswordUsernameLengthResponse.configurableValue;
                    }

                    const userPasswordsequenceLengthResponse = findConfigurationValue(
                        response,
                        ConstantsFreeze.USER_PASSWORD_SEQUENCE_LENGTH
                    );
                    if (userPasswordsequenceLengthResponse) {
                        userPasswordsequenceLength = userPasswordsequenceLengthResponse.configurableValue;
                    }

                    const userPasswordUppercaseResponse = findConfigurationValue(
                        response,
                        ConstantsFreeze.USER_PASSWORD_UPPERCASE
                    );
                    if (userPasswordUppercaseResponse) {
                        userPasswordUppercase = userPasswordUppercaseResponse.configurableValue;
                    }

                    const userPasswordLowercaseResponse = findConfigurationValue(
                        response,
                        ConstantsFreeze.USER_PASSWORD_LOWERCASE
                    );
                    if (userPasswordLowercaseResponse) {
                        userPasswordLowercase = userPasswordLowercaseResponse.configurableValue;
                    }

                    const userPasswordLengthResponse = findConfigurationValue(
                        response,
                        ConstantsFreeze.USER_PASSWORD_LENGTH
                    );
                    if (userPasswordLengthResponse) {
                        userPasswordLength = userPasswordLengthResponse.configurableValue;
                    }

                    const userPasswordDigitsResponse = findConfigurationValue(
                        response,
                        ConstantsFreeze.USER_PASSWORD_DIGITS
                    );
                    if (userPasswordDigitsResponse) {
                        userPasswordDigits = userPasswordDigitsResponse.configurableValue;
                    }

                    const userPasswordUnicodeResponse = findConfigurationValue(
                        response,
                        ConstantsFreeze.USER_PASSWORD_UNICODE
                    );
                    if (userPasswordUnicodeResponse) {
                        userPasswordUnicode = userPasswordUnicodeResponse.configurableValue;
                    }

                    const userEmailLengthResponse = findConfigurationValue(response, ConstantsFreeze.USER_EMAIL_LENGTH);
                    if (userEmailLengthResponse) {
                        userEmailLength = userEmailLengthResponse.configurableValue;
                    }

                    const userMobileLengthResponse = findConfigurationValue(
                        response,
                        ConstantsFreeze.USER_MOBILE_LENGTH
                    );
                    if (userMobileLengthResponse) {
                        userMobileLength = userMobileLengthResponse.configurableValue;
                    }
                    resolve({
                        displayConsent,
                        consentText,
                        passwordStrength,
                        userPasswordUsernameLength,
                        userPasswordsequenceLength,
                        userPasswordUppercase,
                        userPasswordLowercase,
                        userPasswordLength,
                        userPasswordDigits,
                        userPasswordUnicode,
                        userEmailLength,
                        userMobileLength,
                    });
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};

export function decodeString(str: string) {
    const elem = document.createElement("textarea");
    elem.innerHTML = str;

    return elem.value;
}

export const getIdsBySplitStrToObject = (str: string) => {
    const obj = str.split("|").reduce((result: any, token: any) => {
        const [key, value] = token.split(":");

        // eslint-disable-next-line no-param-reassign
        result[key.trim()] = value.trim();
        return result;
    }, {});
    const ids = Object.keys(obj).join(",");
    return ids;
};

export const getCustomerRole = () => {
    const homeState = store.getState().home;
    const { userConfig } = homeState;

    if (!userConfig || !userConfig?.role) return;

    return {
        isCA: userConfig?.role === CUSTOMER_ROLES.CA,
        isSI: userConfig?.role === CUSTOMER_ROLES.SI,
    };
};

export const getMappedMsg = (msgConfig: any, statusCode: any, language: any) => {
    // eslint-disable-next-line no-shadow
    let data: any = {};
    Object.entries(msgConfig).map(([key, value]: any) => {
        switch (key) {
            case statusCode?.toString():
                data = value[language];
                break;
            default:
                break;
        }
        return 0;
    });
    return data;
};

export function constructPriceObject(price: string) {
    const v1 = price
        ?.replace(/[{}]/g, "")
        ?.replace(/\s/g, "")
        ?.split(",")?.[0]
        ?.split(":");

    const v2 = price
        ?.replace(/[{}]/g, "")
        ?.replace(/\s/g, "")
        ?.split(",")?.[1]
        ?.split(":");

    return {
        [v1?.[0]]: Number(v1?.[1]),
        [v2?.[0]]: Number(v2?.[1]),
    };
}

export const getToDate = () => {
    const toDate = moment()
        .endOf("month")
        .format(ConstantsFreeze.SAVE_DATA_DATE_FORMAT);

    return toDate;
};
export const getFromDate = () => {
    const fromDate = moment()
        .startOf("month")
        .format(ConstantsFreeze.SAVE_DATA_DATE_FORMAT);
    return fromDate;
};
interface UPCTranslation {
    recordId: number;
    createdAt: string;
    language: string;
    value: string;
    updatedAt: string;
}

export const getCurrentLangData = (data: UPCTranslation[]): UPCTranslation | undefined => {
    const response = data?.find(item => item.language.split("_").includes(NextI18NextInstance.i18n.language));
    return response;
};

export const checkBasicPlanExpiry = (expireDate: any) => {
    let isExpire = false;
    if (moment(expireDate) < moment()) {
        isExpire = true;
    }
    return isExpire;
};

export const getURL = (planObj: any, type: string) => {
    const obj = planObj?.attachment?.find((ele: any) => ele.attachmentTag[0].tag === type);
    let imageUrl;
    if (obj?.url) {
        imageUrl = `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${obj?.url}`;
    } else {
        imageUrl = `/images/product-img-1.png`;
    }

    return imageUrl;
};

export const convertInSeconds = (duration: string) => {
    let seconds: any;
    const [durationTime, format] = duration.split(" ");
    const formatLower = format.toLowerCase();
    switch (formatLower) {
        case "minutes":
            seconds = Number(durationTime) * 60 * 1000;
            break;
        case "seconds":
            seconds = Number(durationTime) * 1000;
            break;
        default:
            break;
    }
    return seconds;
};

export const getPermissionDetail = (alias: string) => {
    const dashboardState = store.getState().dashboard;
    const { userPermissions } = dashboardState;
    const subscriptionTypeObj = _.find(userPermissions, i => i.permissionAlias === alias);
    return subscriptionTypeObj?.subscriptionType;
};

export const getCustomerTypeSegment = (alias: string) => {
    const dashboardState = store.getState().dashboard;
    const { userPermissions } = dashboardState;
    const subscriptionTypeObj = _.find(userPermissions, i => i.permissionAlias === alias);
    return subscriptionTypeObj?.customerTypeSegment;
};

export const havePermission = (alias: string, serviceType: any, customerType: any) => {
    const dashboardState = store.getState().dashboard;
    const { userPermissionAlias } = dashboardState;
    const servicePermission: any = getPermissionDetail(alias);
    const customerTypeSegment: any = getCustomerTypeSegment(alias);
    if (
        userPermissionAlias?.includes(alias) &&
        ((servicePermission && servicePermission === ConstantsFreeze.ALL) ||
            servicePermission?.toLowerCase() === serviceType?.toLowerCase()) &&
        ((customerTypeSegment && customerTypeSegment === ConstantsFreeze.ALL) || customerTypeSegment === customerType)
    ) {
        return true;
    }
    return false;
};

export const getMaxDocumentObjectId = (arr: any, docType: string) => {
    const docTypeArr = _.filter(arr, (item: any) => item.documentType === docType);
    let latestDoc: any = null;
    if (docTypeArr.length > 0) {
        if (docTypeArr.length > 1) {
            latestDoc = docTypeArr.reduce((prev: any, current: any) => (+prev.id > +current.id ? prev : current));
        } else {
            latestDoc = docTypeArr;
        }
    }
    return latestDoc;
};
export const getPaymentServiceType = (type: any) => {
    const serviceTypes = JSON.parse(getLocalStorageItem("paymentServiceTypes"));
    const { alias } = _.find(serviceTypes, item => item.alias === type);
    return alias;
};

export const getPlanSubType = (planObj: any) => {
    const subtype = planObj.productOfferCharacteristic.find((prdt: any) => prdt.id === "OFFER_SUB_TYPE")
        .specificationCharacteristicValue[0].value;
    return subtype;
};
