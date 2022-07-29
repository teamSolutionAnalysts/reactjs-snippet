import React from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { VscGraph } from "react-icons/vsc";
import { HiOutlineUser } from "react-icons/hi";
import { IoTicketOutline, IoLogOutOutline } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import RoutPath from "./routes";
import { COMPONENT_ALIAS, CUSTOMER_ROLES } from "./enums";

const productDetails = {
    headerSlider: {
        img: "/images/cart-banner.jpg",
        mainTitle: "MTN’s Secure Checkout",
        secondaryTitle: "Everywhere you go.",
    },
    productTitle: {
        img: "/images/explor.png",
        title: "Explore our wide range of Handsets",
    },
    productSlider: [
        {
            image: "/images/product-mobile-img.png",
            text: "img1",
        },
        {
            image: "/images/product-mobile-img.png",
            text: "img2",
        },
        {
            image: "/images/product-mobile-img.png",
            text: "img3",
        },
        {
            image: "/images/product-mobile-img.png",
            text: "img3",
        },
    ],
    productMainDescription: {
        productName: "Samsung Galaxy S21 5G",
        mainPrice: "$1559 SDG",
        discountPrice: "300 SDG",
        availability: "In Stock",
        details: `Lorem ipsum dolor sit amet, consectetur Bob adipiscing elit. Etiam pulvinar congue pharetra. Donec ultrices ut turpis in vestibulum. Sed interdum pellentesque ultrices. Etiam finibus odio fermentum nisi porta imperdiet. Sed mattis, augue quis ultricies sodales, libero quam molestie urna, sed finibus augue purus nec arcu. Morbi venenatis risus nec molestie ultricies. Aliquam erat volutpat. Nullam convallis sodales viverra. Donec faucibus lacus et risus porttitor ultrices. Curabitur vestibulum vitae est et interdum. Duis bibendum, mauris ac interdum varius, tellus massa porttitor eros, vel suscipit mauris lorem sed leo. Pellentesque urna magna, blandit ac eleifend sed, ultricies et felis.,
            Lorem ipsum dolor sit amet, consectetur Bob adipiscing elit. Etiam pulvinar congue pharetra. Donec ultrices ut turpis in vestibulum. Sed interdum pellentesque ultrices. Etiam finibus odio fermentum nisi porta imperdiet. Sed mattis, augue quis ultricies sodales, libero quam molestie urna, sed finibus augue purus nec arcu. Morbi venenatis risus nec molestie ultricies. Aliquam erat volutpat. Nullam convallis sodales viverra. Donec faucibus lacus et risus porttitor ultrices. Curabitur vestibulum vitae est et interdum. Duis bibendum, mauris ac interdum varius, tellus massa porttitor eros, vel suscipit mauris lorem sed leo. Pellentesque urna magna, blandit ac eleifend sed, ultricies et felis.`,
    },
};

const cartDetails = {
    cart: [
        {
            image: "/images/details-img.jpg",
            planName: "PrepaidSuperplan-499",
            details: "201 SDG",
        },
    ],
};

const checkoutScreenData = {
    mainAccordion: [
        {
            title: "checkout:CUSTOMER_REGISTRATION",
            id: "customerRegistration",
            expanded: true,
            isPreviousSaved: true,
            backendKeyName: "customerRegister",
        },
        {
            title: "checkout:NUMBER_SELECTION",
            id: "numberSelection",
            expanded: false,
            isPreviousSaved: false,
            backendKeyName: "Number Selection",
        },
        {
            title: "checkout:UPLOAD_DOCUMENT",
            id: "uploadDocument",
            expanded: false,
            isPreviousSaved: false,
            backendKeyName: "Document Uploads",
        },
        {
            title: "checkout:BILLING_ACCOUNT",
            id: "billingAccount",
            expanded: false,
            isPreviousSaved: false,
            backendKeyName: "Billing Account",
        },
        {
            title: "checkout:TERMS_AND_CONDITIONS",
            id: "termsAndConditions",
            expanded: false,
            isPreviousSaved: false,
            backendKeyName: "Terms & Conditions",
        },
        {
            title: "checkout:ORDER_SUMMARY",
            id: "orderSummery",
            expanded: false,
            isPreviousSaved: false,
            backendKeyName: "Order Summary",
        },
        {
            title: "checkout:PAYMENT_PLACE_ORDER",
            id: "payment&PlaceOrder",
            expanded: false,
            isPreviousSaved: false,
            backendKeyName: "Payment & Place Order",
        },
    ],
    checkoutRegisterAccordionData: [
        {
            title: "checkout:BASIC_DETAILS",
            id: "basicInfo",
            expanded: true,
            isPreviousSaved: true,
        },
        {
            title: "checkout:ADDRESS_DETAILS",
            id: "addressInfo",
            expanded: false,
            isPreviousSaved: false,
        },
        {
            title: "checkout:CONTACT_DETAILS",
            id: "contactInfo",
            expanded: false,
            isPreviousSaved: false,
        },
    ],
    checkoutB2BRegisterAccordionData: [
        {
            title: "checkout:BASIC_DETAILS",
            id: "basicInfo",
            expanded: true,
            isPreviousSaved: true,
        },
        {
            title: "checkout:CONTACT_DETAILS",
            id: "contactInfo",
            expanded: false,
            isPreviousSaved: false,
        },
        {
            title: "checkout:COMPANY_DETAILS",
            id: "companyInfo",
            expanded: false,
            isPreviousSaved: false,
        },
        {
            title: "checkout:ADDRESS_DETAILS",
            id: "addressInfo",
            expanded: false,
            isPreviousSaved: false,
        },
        {
            title: "checkout:DELEGATOR_DETAILS",
            id: "delegatorInfo",
            expanded: false,
            isPreviousSaved: false,
        },
    ],
    checkoutUploadDocumentAccordionData: [
        {
            title: "checkout:COMPANY_DOCUMENTS",
            id: "companyDocument",
            expanded: true,
            isPreviousSaved: true,
        },
        {
            title: "checkout:DELEGATOR_DOCUMENTS",
            id: "delegatorDocument",
            expanded: false,
            isPreviousSaved: false,
        },
    ],
};

export const layoutSidebar = [
    {
        key: "1",
        img: <VscGraph />,
        activeImg: <VscGraph />,
        link: RoutPath.ProfileDashboard,
        name: "sidebar:Dashboard",
        routesArray: [RoutPath.ProfileDashboard],
        selected: false,
        action: null,
    },
    {
        key: "2",
        img: <HiOutlineUser />,
        activeImg: <HiOutlineUser />,
        link: RoutPath.MyAccount,
        name: "sidebar:MyAccount",
        routesArray: [
            RoutPath.MyAccount,
            RoutPath.ChangePassword,
            RoutPath.MySubscriptions,
            RoutPath.MyOrders,
            RoutPath.BillingDetails,
            RoutPath.MyProfile,
            RoutPath.CommunicationPreference,
        ],
        selected: false,
        action: null,
        subMenu: [
            {
                key: "2-1",
                img: <FiUser />,
                activeImg: <FiUser />,
                link: RoutPath.MyProfile,
                name: "sidebar:MY_PROFILE",
                alias: COMPONENT_ALIAS.VIEW_CUSTOMER_PROFILE,
                routesArray: [RoutPath.MyProfile],
                selected: false,
                action: null,
                forRoles: [CUSTOMER_ROLES.CA],
            },
            {
                key: "2-2",
                img: <FiLock />,
                activeImg: <FiLock />,
                link: RoutPath.ChangePassword,
                name: "sidebar:ChangePassword",
                alias: COMPONENT_ALIAS.CHANGE_PASSWORD,
                routesArray: [RoutPath.ChangePassword],
                selected: false,
                action: null,
            },
            {
                key: "2-3",
                img: <CgFileDocument />,
                activeImg: <CgFileDocument />,
                link: RoutPath.MySubscriptions,
                name: "sidebar:Mysubscriptions",
                alias: COMPONENT_ALIAS.VIEW_SUBSCRIPTION_DETAILS,
                routesArray: [RoutPath.MySubscriptions],
                selected: false,
                action: null,
            },
            {
                key: "2-4",
                img: <CgFileDocument />,
                activeImg: <CgFileDocument />,
                link: RoutPath.MyOrders,
                name: "sidebar:MyOrders",
                alias: COMPONENT_ALIAS.VIEW_ORDER_DETAILS,
                routesArray: [RoutPath.MyOrders],
                selected: false,
                action: null,
                forRoles: [CUSTOMER_ROLES.CA],
            },
            {
                key: "2-5",
                img: <CgFileDocument />,
                activeImg: <CgFileDocument />,
                link: RoutPath.BillingDetails,
                name: "sidebar:BILLING_DETAIL",
                routesArray: [RoutPath.BillingDetails],
                selected: false,
                action: null,
                forServiceType: "postpaid",
            },
            {
                key: "2-6",
                img: <BiMessageRounded />,
                activeImg: <BiMessageRounded />,
                link: RoutPath.CommunicationPreference,
                name: "sidebar:COMMUNICATION_PREFRENCE",
                alias: COMPONENT_ALIAS.UPDATE_PREFERENCE,
                routesArray: [RoutPath.CommunicationPreference],
                selected: false,
                action: null,
                forRoles: [CUSTOMER_ROLES.CA],
            },
        ],
    },
    {
        key: "3",
        img: <IoTicketOutline />,
        activeImg: <IoTicketOutline />,
        link: RoutPath.SupportTicket,
        name: "sidebar:SupportTickets",
        alias: COMPONENT_ALIAS.TICKET_HISTORY,
        routesArray: [RoutPath.SupportTicket],
        selected: false,
        action: null,
    },
    {
        key: "4",
        img: <IoLogOutOutline />,
        activeImg: <IoLogOutOutline />,
        link: null,
        name: "sidebar:Logout",
        routesArray: [RoutPath.Logout],
        selected: false,
        action: "logout",
    },
];

export const headerMenus = [
    {
        key: "1",
        img: <VscGraph />,
        activeImg: <VscGraph />,
        link: RoutPath.ProfileDashboard,
        name: "sidebar:Dashboard",
        routesArray: [RoutPath.ProfileDashboard],
        selected: false,
        action: null,
    },
    {
        key: "2",
        img: <HiOutlineUser />,
        activeImg: <HiOutlineUser />,
        link: RoutPath.MyAccount,
        name: "sidebar:MyAccount",
        routesArray: [
            RoutPath.MyAccount,
            RoutPath.ChangePassword,
            RoutPath.MySubscriptions,
            RoutPath.MyOrders,
            RoutPath.CommunicationPreference,
        ],
        selected: false,
        action: null,
        subMenu: [
            {
                key: "2-1",
                img: <FiUser />,
                activeImg: <FiUser />,
                link: RoutPath.MyProfile,
                name: "sidebar:MY_PROFILE",
                alias: COMPONENT_ALIAS.VIEW_CUSTOMER_PROFILE,
                routesArray: [RoutPath.MyProfile],
                selected: false,
                action: null,
                forRoles: [CUSTOMER_ROLES.CA],
            },
            {
                key: "2-2",
                img: <FiLock />,
                activeImg: <FiLock />,
                link: RoutPath.ChangePassword,
                name: "sidebar:ChangePassword",
                alias: COMPONENT_ALIAS.CHANGE_PASSWORD,
                routesArray: [RoutPath.ChangePassword],
                selected: false,
                action: null,
            },
            {
                key: "2-3",
                img: <CgFileDocument />,
                activeImg: <CgFileDocument />,
                link: RoutPath.MySubscriptions,
                name: "sidebar:Mysubscriptions",
                alias: COMPONENT_ALIAS.VIEW_SUBSCRIPTION_DETAILS,
                routesArray: [RoutPath.MySubscriptions],
                selected: false,
                action: null,
            },
            {
                key: "2-4",
                img: <CgFileDocument />,
                activeImg: <CgFileDocument />,
                link: RoutPath.MyOrders,
                name: "sidebar:MyOrders",
                alias: COMPONENT_ALIAS.VIEW_ORDER_DETAILS,
                routesArray: [RoutPath.MyOrders],
                selected: false,
                action: null,
                forRoles: [CUSTOMER_ROLES.CA],
            },
            {
                key: "2-5",
                img: <CgFileDocument />,
                activeImg: <CgFileDocument />,
                link: RoutPath.BillingDetails,
                name: "sidebar:BILLING_DETAIL",
                routesArray: [RoutPath.BillingDetails],
                selected: false,
                action: null,
                forServiceType: "postpaid",
            },
            {
                key: "2-6",
                img: <BiMessageRounded />,
                activeImg: <BiMessageRounded />,
                link: RoutPath.CommunicationPreference,
                name: "Communication Preference",
                alias: COMPONENT_ALIAS.UPDATE_PREFERENCE,
                routesArray: [RoutPath.CommunicationPreference],
                selected: false,
                action: null,
                forRoles: [CUSTOMER_ROLES.CA],
            },
        ],
    },
    {
        key: "3",
        img: <IoTicketOutline />,
        activeImg: <IoTicketOutline />,
        link: RoutPath.SupportTicket,
        name: "sidebar:SupportTickets",
        alias: COMPONENT_ALIAS.TICKET_HISTORY,
        routesArray: [RoutPath.SupportTicket],
        selected: false,
        action: null,
    },
    {
        key: "4",
        img: <IoLogOutOutline />,
        activeImg: <IoLogOutOutline />,
        link: null,
        name: "sidebar:Logout",
        routesArray: [RoutPath.Logout],
        selected: false,
        action: "logout",
    },
];

const cartItemData = {
    cartId: 1,
    items: [
        {
            href: "https://stl-static-content.s3.amazonaws.com/images/plan-2.png",
            packagePlan: "Vanity_PostpaidT",
            oneTime: {
                discountPrice: "",
                originalPrice: "0 SDG",
            },
            recurring: {
                discountPrice: "",
                originalPrice: "0 SDG",
                billCycleFrequency: "",
            },
            deposit: {
                amount: "",
            },
        },
        {
            href: "https://stl-static-content.s3.amazonaws.com/images/plan-2.png",
            packagePlan: "NEW_silver- National mins-45",
            oneTime: {
                discountPrice: "",
                originalPrice: "0 SDG",
            },
            recurring: {
                discountPrice: "45 SDG",
                originalPrice: "47.9 SDG",
                billCycleFrequency: "Monthly",
            },
            deposit: {
                amount: "",
            },
        },
        {
            href: "https://stl-static-content.s3.amazonaws.com/images/plan-2.png",
            packagePlan: "SilverGPPRecurringCharge400",
            oneTime: {
                discountPrice: "",
                originalPrice: "400 SDG",
            },
            recurring: {
                discountPrice: "400 SDG",
                originalPrice: "425.81 SDG",
                billCycleFrequency: "Monthly",
            },
            deposit: {
                amount: "700 SDG",
            },
        },
    ],
    payOnCheckout: {
        subTotal: "428.70709999999997 SDG",
        tax: "0 SDG",
        deposit: "700 SDG",
        discount: "0 SDG",
        totalAmount: "1128.9970999999998 SDG",
        proratedAmount: "28.71 SDG",
        payableAmount: "400 SDG",
    },
};

const documentImageMapping = [
    {
        ext: "pdf",
        imagePath: "images/file-pdf.svg",
    },
    {
        ext: "doc",
        imagePath: "images/file-document.svg",
    },
    {
        ext: "jpg",
        imagePath: "images/file-image.svg",
    },
];

export { productDetails, checkoutScreenData, cartDetails, cartItemData, documentImageMapping };
