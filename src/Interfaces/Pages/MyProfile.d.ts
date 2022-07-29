interface DocumentList {
    documentReference?: string | null;
    documentType?: string | null;
    fileName?: string | null;
    version?: string | null;
}

interface CustomerDocument {
    documentList: DocumentList[];
}

interface CustomerAccount {
    accountNumber?: string | null;
    accountName?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    primaryMSISDN?: string | null;
    serviceType?: string | null;
    gender?: string | null;
    dob?: string | null;
    customerEmail?: string | null;
    customerTypeSegment?: string | null;
    parentId?: string | null;
    profession?: string | null;
    customerCategory?: string | null;
    incomeSegment?: string | null;
    communication?: string | null;
    preferredLang?: string | null;
    communicationConsent?: string | null;
    isVerify?: string | null;
    createdDate?: string | null;
    activationDate?: string | null;
    caActivationDate?: string | null;
    activePrepaidCount?: string | null;
    activePostpaidCount?: string | null;
    phone?: string | null;
    personalIdType?: string | null;
    personalIdValue?: string | null;
    issueDate?: string | null;
    expiryDate?: string | null;
    networkAge?: string | null;
    customerStatus?: string | null;
}

interface User {
    username?: string | null;
    fullname?: string | null;
    email?: string | null;
    preferredLanguage?: string | null;
    gender?: string | null;
    customerType?: string | null;
    communicationMode?: string | null;
    dob?: string | null;
    caNumber?: string | null;
    alternateContact?: string | null;
    alternateEmail?: string | null;
    squareNumber?: string | null;
    houseNumber?: string | null;
    streetNumber?: string | null;
    city?: string | null;
    district?: string | null;
    zipcode?: string | null;
    contactName?: string | null;
    customerCategory?: string | null;
    personalIdType?: string | null;
    personalIdValue?: string | null;
    issueDate?: string | null;
    expireDate?: string | null;
    mobile?: string | null;
    status?: string | null;
    id?: string | null;
    role?: string | null;
}

interface CustomerProfile {
    customer: {
        customerDocument?: CustomerDocument;
        customerAccount?: CustomerAccount;
    };
    user: User;
}
