// #region Local Imports
import HeaderDummyData from "@Components/Custom/Header/HeaderDummyData";
import ActionTypes from "@Redux/ActionTypes";
import CommonReducer from ".";
// #endregion Local Imports

describe("Common reducer", () => {
    it("should return the initial state", () => {
        expect(CommonReducer(undefined, {})).toEqual({
            cartData: {
                showCartCount: false,
            },
            menuItems: [],
            languageItems: [],
            logoImage: "",
            footerItems: [],
            contactItems: "",
            categoryItems: [],
            firstLoad: false,
        });
    });

    it("should handle SetReducer", () => {
        expect(
            CommonReducer(
                {},
                {
                    type: ActionTypes.Common.SetReducer,
                    payload: {
                        menuItems: HeaderDummyData.mainNavData,
                    },
                }
            )
        ).toEqual({
            menuItems: HeaderDummyData.mainNavData,
        });
    });

    it("should handle SetCategoryItems", () => {
        expect(
            CommonReducer(
                {},
                {
                    type: ActionTypes.Common.SetCategoryItems,
                    payload: [
                        {
                            tid: "47",
                            revision_id: "47",
                            vid: "category",
                            langcode: "en",
                            status: "1",
                            name: "Non Mobility",
                            depth: 0,
                            parents: ["0"],
                            children: [],
                            additional: {
                                field_category_id: "102",
                                field_option_value: null,
                                field_primary_image:
                                    "https://drupal-cms.stage.sa-dev.info/sites/default/files/2021-07/icon-Non-Mobility.png",
                                field_page_type: "Product",
                                field_vc_bg_color: "",
                                field_vc_price: "",
                                field_vanity_category_id: "",
                            },
                        },
                    ],
                }
            )
        ).toEqual({
            categoryItems: [
                {
                    tid: "47",
                    revision_id: "47",
                    vid: "category",
                    langcode: "en",
                    status: "1",
                    name: "Non Mobility",
                    depth: 0,
                    parents: ["0"],
                    children: [],
                    additional: {
                        field_category_id: "102",
                        field_option_value: null,
                        field_primary_image:
                            "https://drupal-cms.stage.sa-dev.info/sites/default/files/2021-07/icon-Non-Mobility.png",
                        field_page_type: "Product",
                        field_vc_bg_color: "",
                        field_vc_price: "",
                        field_vanity_category_id: "",
                    },
                },
            ],
        });
    });

    it("should handle ResetReducer", () => {
        expect(
            CommonReducer(undefined, {
                type: ActionTypes.Common.ResetReducer,
            })
        ).toEqual({
            cartData: {
                showCartCount: false,
            },
            menuItems: [],
            languageItems: [],
            logoImage: "",
            footerItems: [],
            contactItems: "",
            categoryItems: [],
            firstLoad: false,
        });
    });
});
