import AuthService from ".";

describe("Auth Service tests", () => {
    test("Auth login test", async () => {
        const loginData = {
            username: "username",
            password: "password",
        };
        await AuthService.postLoginDetail(loginData)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth register test", async () => {
        const data = {
            firstName: "firstName",
            lastName: "lastName",
            middlename: "middlename",
        };
        await AuthService.postRegister(data)
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth get otp test", async () => {
        await AuthService.getOtp("/api/auth/sendOtp?resend=true", {
            username: "+919292929298",
        })
            .then((res: any) => {
                expect(res.responseCode).toBe(200);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth numberStatus test", async () => {
        await AuthService.numberStatus({ mobile: "+919292929298" })
            .then((res: any) => {
                expect(res.status).toBe(true);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth checkIdBlacklist test", async () => {
        const personalIdInput = {
            personalIdType: "personalIdType",
            personalIdValue: "personalIdValueData",
        };
        await AuthService.checkIdBlacklist(personalIdInput)
            .then((res: any) => {
                expect(res?.result?.isValid).toBe(true);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth getUserDetails test", async () => {
        await AuthService.getUserDetails()
            .then((res: any) => {
                expect(res?.user.firstName).toBe("mtmUser");
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth forgotPassword test", async () => {
        const reqData = {
            requestType: "link",
            username: "Roy@mailinator.com",
        };
        await AuthService.forgotPassword(reqData)
            .then((res: any) => {
                expect(res.status).toBe(true);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth verifyOTP test", async () => {
        const reqData = {
            otp: "12345",
            uuid: "",
        };
        await AuthService.verifyOTP(reqData)
            .then((res: any) => {
                expect(res?.result?.isValid).toBe(true);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth resetPassword test", async () => {
        const reqData = {
            username: "kuldip.shuk@gmail.com",
            newPassword: "Dhaval_1434@124",
        };
        await AuthService.resetPassword(reqData)
            .then((res: any) => {
                expect(res?.result?.isValid).toBe(true);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
    test("Auth changeUserPassword test", async () => {
        const reqData = {
            username: "kuldip.shuk@gmail.com",
            password: "Dhaval_1434@124",
            newPassword: "Dhaval_1434@124",
        };
        await AuthService.changeUserPassword(reqData)
            .then((res: any) => {
                expect(res?.result?.isValid).toBe(true);
            })
            .catch((err: any) => {
                expect(err.name).toBe(undefined);
            });
    });
});
