interface AddressDetails {
    addressReference?: string | null;
    streetName?: string | null;
    StreetNumber?: string | null;
    buildingName?: string | null;
    floorNo?: string | null;
    city?: string | null;
    district?: string | null;
    zipcode?: string | null;
    deliveryCode?: string | null;
    squareNumber?: string | null;
    houseNumber?: string | null;
}

interface BillingInfo {
    baNumber?: string | null;
    baName?: string | null;
    customerNumber?: string | null;
    serviceType?: string | null;
    billCycle?: string | null;
    billDeliveryMode?: string | null;
    email?: string | null;
    contactNumber?: string | null;
    billFormat?: string | null;
    invoiceLanguage?: string | null;
    customerClass?: string | null;
    addressDetail?: AddressDetails[] | null;
}

interface BANumberList {
    baNumber?: string | null;
    baName?: string | null;
}
