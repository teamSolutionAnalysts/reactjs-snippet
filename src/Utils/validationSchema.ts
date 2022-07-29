/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-expressions */
import * as Yup from "yup";
// import moment from "moment";
import {
    checkContainUnicode,
    checkCurrentWithNew,
    checkPasswordChar,
    checkSequnceInPassword,
} from "@Components/Register";
import { ConstantsFreeze, LENGTH_VALIDATION } from "./enums";

const basicDetailsSchema = (t: any) =>
    Yup.object({
        firstName: Yup.string()
            .required(t("formikError:FIRST_NAME_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        lastName: Yup.string()
            .required(t("formikError:LAST_NAME_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        middlename: Yup.string()
            .required(t("formikError:MIDDLE_NAME_REQUIRED"))
            .max(
                LENGTH_VALIDATION.MIDDLE_NAME_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.MIDDLE_NAME_LENGTH })
            ),
        email: Yup.string().max(
            LENGTH_VALIDATION.CUSTOMER_EMAIL_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CUSTOMER_EMAIL_LENGTH })
        ),
        gender: Yup.string().required(t("formikError:GENDER_REQUIRED")),
        dob: Yup.string().required(t("formikError:DOB_REQUIRED")),
        customerCategory: Yup.string().required(t("formikError:CUSTOMER_CATEGORY_REQUIRED")),
        personalIdType: Yup.string().required(t("formikError:PERSONAL_ID_TYPE_REQUIRED")),
        personalIdValue: Yup.string().required(t("formikError:PERSONAL_ID_VALUE_REQUIRED")),
        issueDate: Yup.string().required(t("formikError:ISSUE_DATE_REQUIRED")),
        expireDate: Yup.string().required(t("formikError:EXPIRY_DATE_REQUIRED")),
    });

const addressDetailsSchema = (t: any) =>
    Yup.object({
        squareNumber: Yup.string()
            .required(t("formikError:SQUARE_NUMBER_REQUIRED"))
            .max(
                LENGTH_VALIDATION.ADDRESS_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ADDRESS_LENGTH })
            ),
        houseNumber: Yup.string()
            .required(t("formikError:HOUSE_NUMBER_REQUIRED"))
            .max(
                LENGTH_VALIDATION.ADDRESS_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ADDRESS_LENGTH })
            ),
        streetNumber: Yup.string().max(
            LENGTH_VALIDATION.ADDRESS_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ADDRESS_LENGTH })
        ),
        city: Yup.string().required(t("formikError:CITY_REQUIRED")),
        district: Yup.string().max(
            LENGTH_VALIDATION.ADDRESS_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ADDRESS_LENGTH })
        ),
        zipcode: Yup.string()
            .required(t("formikError:ZIP_CODE_INVALID"))
            .matches(/^[0-9]+$/, t("formikError:MUST_BE_5_DIGIT"))
            .min(LENGTH_VALIDATION.ZIP_LENGTH, t("formikError:MUST_BE_EXACT_5_DIGIT"))
            .max(LENGTH_VALIDATION.ZIP_LENGTH, t("formikError:MUST_BE_EXACT_5_DIGIT")),
    });

const contactDetailsSchema = (t: any) =>
    Yup.object({
        contactName: Yup.string().max(
            LENGTH_VALIDATION.NAME_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })
        ),
        alternateEmail: Yup.string().max(
            LENGTH_VALIDATION.CUSTOMER_EMAIL_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CUSTOMER_EMAIL_LENGTH })
        ),
        alternateContact: Yup.string()
            // .required(t("formikError:IS_REQUIRED"))
            .max(
                LENGTH_VALIDATION.CUSTOMER_CONTACT_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CUSTOMER_CONTACT_LENGTH })
            ),
        communicationMode: Yup.string().required(t("formikError:COMMUNICATION_MODE_REQUIRED")),
        preferredLanguage: Yup.string().required(t("formikError:IS_REQUIRED")),
    });

const billingAccountSchema = (t: any) =>
    Yup.object({
        name: Yup.string()
            .required(t("formikError:IS_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        billingFormat: Yup.string().required(t("formikError:IS_REQUIRED")),
        billingDeliveryMode: Yup.string().required(t("formikError:IS_REQUIRED")),
        billingLanguage: Yup.string().required(t("formikError:IS_REQUIRED")),
        email: Yup.string().required(t("formikError:IS_REQUIRED")),
        contactNumber: Yup.string()
            .required(t("formikError:IS_REQUIRED"))
            .max(
                LENGTH_VALIDATION.CUSTOMER_CONTACT_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CUSTOMER_CONTACT_LENGTH })
            ),
        squareNumber: Yup.string()
            .required(t("formikError:IS_REQUIRED"))
            .max(
                LENGTH_VALIDATION.ADDRESS_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ADDRESS_LENGTH })
            ),
        houseNumber: Yup.string()
            .required(t("formikError:IS_REQUIRED"))
            .max(
                LENGTH_VALIDATION.ADDRESS_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ADDRESS_LENGTH })
            ),
        streetNumber: Yup.string().max(
            LENGTH_VALIDATION.ADDRESS_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ADDRESS_LENGTH })
        ),
        district: Yup.string().max(
            LENGTH_VALIDATION.ADDRESS_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ADDRESS_LENGTH })
        ),
        city: Yup.string().required(t("formikError:IS_REQUIRED")),
        zipcode: Yup.string()
            .required(t("formikError:IS_REQUIRED"))
            .max(LENGTH_VALIDATION.ZIP_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.ZIP_LENGTH })),
    });

const changePasswordSchema = (t: any, config?: any) =>
    Yup.object({
        currentPassword: Yup.string().required(t("formikError:IS_REQUIRED")),
        newPassword: Yup.string()
            .required(t("formikError:IS_REQUIRED"))
            .min(
                Number(config.userPasswordLength),
                t("formikError:PASSWORD_CHARACTER", { length: Number(config.userPasswordLength) })
            )
            .test(
                "usernameInPassword",
                t("formikError:PASSWORD_USER_ERROR"),
                (value: any, context: any) =>
                    !checkSequnceInPassword(value, context?.from[0]?.value?.username, config.userPasswordUsernameLength)
            )
            .test(
                "noDigitSequence",
                t("formikError:PASSWORD_SEQUENCE"),
                (value: any) =>
                    !checkSequnceInPassword(value, ConstantsFreeze.DIGITSEQUINCE, config.userPasswordsequenceLength)
            )
            .test(
                "noUnicodeAllowed",
                t("formikError:PASSWORD_UNICODE"),
                (value: any) => !checkContainUnicode(value, config.userPasswordUnicode)
            )
            .test("oneOf", t("formikError:SAME_PASS_ERROR"), (value: any, a) => {
                return value !== a.parent.currentPassword || !a.parent.currentPassword;
            })
            .test(
                "shouldMatchPolicy",
                t("formikError:PASSWORD_CUSTOM_VALIDATION"),
                (value: any) => !checkPasswordChar(value)
            ),
        confirmPassword: Yup.string()
            .required(t("formikError:IS_REQUIRED"))
            .oneOf([Yup.ref("newPassword"), null], "Password and Confirm Password did not match"),
    });

const cartModalSchema = (t: any) =>
    Yup.object({
        simNumber: Yup.string().required(t("formikError:IS_REQUIRED")),
    });

const loginSchema = (t: any) =>
    Yup.object({
        // username: Yup.string().required(t("formikError:IS_REQUIRED")),
        password: Yup.string().required(t("formikError:PASSWORD_REQUIRED")),
    });

const uploadDocumentSchema = (allowedFileTypes: any, maxFileSize: any) =>
    Yup.object().shape({
        doc: Yup.mixed()
            .test("required", "FILE_REQUIRED", value => typeof value?.name !== "undefined")
            .test("fileFormat", "INVALID_FILE_TYPE", value => allowedFileTypes?.includes(value?.type))
            .test("fileSize", "FILE_SIZE_VALIDATION", value => value?.size / 1000 < Number(maxFileSize)),
    });

const registerSchema = (t: any, config: any) =>
    Yup.object({
        firstName: Yup.string()
            .required(t("formikError:FIRST_NAME_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        lastName: Yup.string()
            .required(t("formikError:LAST_NAME_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        middlename: Yup.string()
            .required(t("formikError:MIDDLE_NAME_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        password: Yup.string()
            .required(t("formikError:PASSWORD_REQUIRED"))
            .min(
                Number(config?.userPasswordLength),
                t("formikError:PASSWORD_CHARACTER", { length: Number(config?.userPasswordLength) })
            )
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH }))
            .test(
                "usernameInPassword",
                t("formikError:PASSWORD_USER_ERROR"),
                (value: any, context: any) =>
                    !checkSequnceInPassword(
                        value,
                        context?.from[0]?.value?.username,
                        config?.userPasswordUsernameLength
                    )
            )
            .test(
                "noDigitSequence",
                t("formikError:PASSWORD_SEQUENCE"),
                (value: any) =>
                    !checkSequnceInPassword(value, ConstantsFreeze.DIGITSEQUINCE, config?.userPasswordsequenceLength)
            )
            .test(
                "noUnicodeAllowed",
                t("formikError:PASSWORD_UNICODE"),
                (value: any) => !checkContainUnicode(value, config?.userPasswordUnicode)
            )
            .test(
                "shouldMatchPolicy",
                t("formikError:PASSWORD_CUSTOM_VALIDATION"),
                (value: any) => !checkPasswordChar(value)
            ),
        // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password and Confirm password did not match'),
        username: Yup.string().required(t("formikError:USER_NAME_REQUIRED")),
        alternateEmail: Yup.string().max(
            LENGTH_VALIDATION.EMAIL_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.EMAIL_LENGTH })
        ),
        alternateContact: Yup.string().max(
            LENGTH_VALIDATION.CONTACT_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CONTACT_LENGTH })
        ),
        dob: Yup.string(),
        gender: Yup.string(),
        preferredLanguage: Yup.string(),
        otp: Yup.string().required(t("formikError:OTP_REQUIRED")),
        communicationConsent: config?.displayConsent === "1" ? Yup.bool().isTrue() : Yup.bool(),
    });

const resetPasswordSchema = (t: any, config: any) =>
    Yup.object({
        newPassword: Yup.string()
            .required(t("formikError:PASSWORD_REQUIRED"))
            .min(
                Number(config.userPasswordLength),
                t("formikError:PASSWORD_CHARACTER", { length: Number(config.userPasswordLength) })
            )
            .test(
                "usernameInPassword",
                t("formikError:PASSWORD_USER_ERROR"),
                (value: any, context: any) =>
                    !checkSequnceInPassword(value, context?.from[0]?.value?.username, config.userPasswordUsernameLength)
            )
            .test(
                "noDigitSequence",
                t("formikError:PASSWORD_SEQUENCE"),
                (value: any) =>
                    !checkSequnceInPassword(value, ConstantsFreeze.DIGITSEQUINCE, config.userPasswordsequenceLength)
            )
            .test(
                "noUnicodeAllowed",
                t("formikError:PASSWORD_UNICODE"),
                (value: any) => !checkContainUnicode(value, config.userPasswordUnicode)
            )
            .test(
                "shouldMatchPolicy",
                t("formikError:PASSWORD_CUSTOM_VALIDATION"),
                (value: any) => !checkPasswordChar(value)
            ),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("newPassword"), null],
            "Password and Confirm Password did not match"
        ),
    });

const NumberSelectionSchema = (t: any, minLength: any) =>
    Yup.object().shape({
        search: Yup.string()
            .required(t("numberSelection:SEARCH_NUMBER_REQUIRED_ERROR"))
            .min(Number(minLength), t("numberSelection:SEARCH_MINIMUM_NUMBER_ERROR", { number: Number(minLength) })),
    });

const topUpHistorySchema = (t: any) =>
    Yup.object({
        fromDate: Yup.string().required(t("formikError:FROM_DATE_REQUIRED")),
        toDate: Yup.string()
            .required(t("formikError:TO_DATE_REQUIRED"))
            .min(Yup.ref("fromDate"), "End date can't be before Start date"),
    });

const DateRangeValidation = (t: any) =>
    Yup.object().shape({
        fromDate: Yup.string().required(t("formikError:FROMDATE_REQUIRED")),
        toDate: Yup.string().required(t("formikError:TODATE_REQUIRED")),
    });

const updateEmailValidation = (t: any) =>
    Yup.object().shape({
        email: Yup.string()
            .email(t("myProfileCart:INVALID_EMAIL"))
            .required(t("myProfileCart:EMAIL_REQUIRED")),
    });

const otpVerificationValidation = (t: any) =>
    Yup.object().shape({
        otp: Yup.string().required(t("myProfileCart:OTP_REQUIRED")),
    });

const ticketValidationSchema = (t: any) =>
    Yup.object().shape({
        category: Yup.string().required(t("formikError:TICKET_CATEGORY_REQUIRED")),
        subCategory: Yup.string().required(t("formikError:TICKET_SUBCATEGORY_REQUIRED")),
        subject: Yup.string()
            .required(t("formikError:TICKET_SUBJECT_REQUIRED"))
            .max(
                LENGTH_VALIDATION.TICKET_SUBJECT,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.TICKET_SUBJECT })
            ),
        description: Yup.string()
            .required(t("formikError:TICKET_DESCRIPTION_REQUIRED"))
            .max(
                LENGTH_VALIDATION.TICKET_DESCRIPTION,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.TICKET_DESCRIPTION })
            ),
    });

const changePinValidation = (config: any, lang: any) =>
    Yup.object({
        newPin: Yup.string()
            .required(config?.EMPTY_FIELD?.[lang])
            .test(
                "newPinNotSameAsCurrentPin",
                config?.NEW_PIN_SAME_AS_EXISTING_PIN?.[lang],
                (value: any, context: any) => !checkCurrentWithNew(value, context?.from[0]?.value?.currentPin)
            ),
        confirmPin: Yup.string()
            .required(config?.EMPTY_FIELD?.[lang])
            .oneOf([Yup.ref("newPin"), null], config?.["NEW_AND_RE-ENTERED_PIN_NOT_MATCH"]?.[lang]),
    });

const fnfNumberValidationSchema = (t: any, mobileRegex: any) =>
    Yup.object().shape({
        number: Yup.string()
            .required(t("formikError:NUMBER_REQUIRED"))
            .matches(new RegExp(mobileRegex), t("formikError:MOBILE_NUMBER_INVALID")),
    });

const nonMobilityRegisterSchema = (t: any) =>
    Yup.object({
        fullName: Yup.string()
            .required(t("formikError:FULL_NAME_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        contactNum: Yup.string()
            .required(t("formikError:NUMBER_REQUIRED"))
            .max(
                LENGTH_VALIDATION.CONTACT_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CONTACT_LENGTH })
            )
            .matches(/^\d{9,11}$/, t("formikError:CONTACT_NUMBER_INVALID")),
        emailId: Yup.string().matches(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            t("formikError:VALID_EMAIL")
        ),
        communicationLanguage: Yup.string(),
        description: Yup.string()
            .required(t("formikError:TICKET_DESCRIPTION_REQUIRED"))
            .max(
                LENGTH_VALIDATION.TICKET_SUBJECT,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.TICKET_SUBJECT })
            ),
    });

const nonMobilityLoggedInSchema = (t: any) =>
    Yup.object({
        contactNum: Yup.string()
            .max(
                LENGTH_VALIDATION.CONTACT_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CONTACT_LENGTH })
            )
            .matches(/^\d{9,11}$/, t("formikError:CONTACT_NUMBER_INVALID")),
        description: Yup.string()
            .required(t("formikError:TICKET_DESCRIPTION_REQUIRED"))
            .max(
                LENGTH_VALIDATION.TICKET_SUBJECT,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.TICKET_SUBJECT })
            ),
    });

const giftingValidationSchema = (t: any) =>
    Yup.object().shape({
        msisdn: Yup.string().required(t("formikError:MSISDN_REQUIRED")),
    });

const companyDetailsSchema = (t: any) =>
    Yup.object({
        typeOfBusiness: Yup.string().required(t("formikError:TYPE_OF_BUSINESS_REQUIRED")),
        personalIdType: Yup.string().required(t("formikError:PERSONAL_ID_TYPE_REQUIRED")),
        personalIdValue: Yup.string().required(t("formikError:PERSONAL_ID_VALUE_REQUIRED")),
        issueDate: Yup.string().required(t("formikError:ISSUE_DATE_REQUIRED")),
        expireDate: Yup.string().required(t("formikError:EXPIRY_DATE_REQUIRED")),
    });

const delegatorDetailsSchema = (t: any) =>
    Yup.object({
        delegatorName: Yup.string()
            .required(t("formikError:DELEGATOR_NAME"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        delegatorMobile: Yup.string()
            .required(t("formikError:DELEGATOR_PHONE"))
            .max(
                LENGTH_VALIDATION.CUSTOMER_CONTACT_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CUSTOMER_CONTACT_LENGTH })
            ),
        delegatorPersonalIdType: Yup.string().required(t("formikError:PERSONAL_ID_TYPE_REQUIRED")),
        delegatorPersonalIdValue: Yup.string().required(t("formikError:PERSONAL_ID_VALUE_REQUIRED")),
        delegatorIssueDate: Yup.string().required(t("formikError:ISSUE_DATE_REQUIRED")),
        delegatorExpireDate: Yup.string().required(t("formikError:EXPIRY_DATE_REQUIRED")),
    });
const b2bBasicDetailsSchema = (t: any) =>
    Yup.object({
        firstName: Yup.string()
            .required(t("formikError:FIRST_NAME_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        lastName: Yup.string()
            .required(t("formikError:LAST_NAME_REQUIRED"))
            .max(LENGTH_VALIDATION.NAME_LENGTH, t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.NAME_LENGTH })),
        middlename: Yup.string()
            .required(t("formikError:MIDDLE_NAME_REQUIRED"))
            .max(
                LENGTH_VALIDATION.B2B_MIDDLE_NAME_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.B2B_MIDDLE_NAME_LENGTH })
            ),
        gender: Yup.string().required(t("formikError:GENDER_REQUIRED")),
        dob: Yup.string().required(t("formikError:DOB_REQUIRED")),
        companyName: Yup.string()
            .required(t("formikError:COMPANY_NAME_REQUIRED"))
            .max(
                LENGTH_VALIDATION.COMPANY_NAME_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.COMPANY_NAME_LENGTH })
            ),
        phoneNumber: Yup.string()
            .required(t("formikError:IS_REQUIRED"))
            .max(
                LENGTH_VALIDATION.CUSTOMER_CONTACT_LENGTH,
                t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CUSTOMER_CONTACT_LENGTH })
            ),
        customerCategory: Yup.string().required(t("formikError:CUSTOMER_CATEGORY_REQUIRED")),
        numberOfEmployees: Yup.string().required(t("formikError:NUMBER_OF_EMPLOYEES_REQUIRED")),
    });
const b2bContactDetailsSchema = (t: any) =>
    Yup.object({
        email: Yup.string().max(
            LENGTH_VALIDATION.CUSTOMER_EMAIL_LENGTH,
            t("formikError:LENGTH_ERROR", { max: LENGTH_VALIDATION.CUSTOMER_EMAIL_LENGTH })
        ),
        communicationMode: Yup.string().required(t("formikError:COMMUNICATION_MODE_REQUIRED")),
        preferredLanguage: Yup.string().required(t("formikError:IS_REQUIRED")),
    });

export {
    basicDetailsSchema,
    addressDetailsSchema,
    contactDetailsSchema,
    billingAccountSchema,
    changePasswordSchema,
    cartModalSchema,
    loginSchema,
    uploadDocumentSchema,
    registerSchema,
    resetPasswordSchema,
    NumberSelectionSchema,
    topUpHistorySchema,
    DateRangeValidation,
    updateEmailValidation,
    otpVerificationValidation,
    ticketValidationSchema,
    changePinValidation,
    fnfNumberValidationSchema,
    nonMobilityRegisterSchema,
    nonMobilityLoggedInSchema,
    giftingValidationSchema,
    companyDetailsSchema,
    delegatorDetailsSchema,
    b2bBasicDetailsSchema,
    b2bContactDetailsSchema,
};
