// #region Global Imports
import { combineReducers } from "redux";
import sessionStorage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
// #endregion Global Imports

// #region Local Imports
import HomeReducer from "./home";
import CheckoutReducer from "./checkout";
import PlanReducer from "./plan";
import Breadcrumb from "./breadcrumbs";
import CartReducer from "./cart";
import CommonReducer from "./common";
import AnonymousUserCartReducer from "./anonymousUserCart";
import DashboardReducer from "./dashboard";
// #endregion Local Imports

const anonymousUserPersistConfig = {
    key: "anonymousUser",
    storage: sessionStorage,
};

export default combineReducers({
    home: HomeReducer,
    checkout: CheckoutReducer,
    plan: PlanReducer,
    breadcrumb: Breadcrumb,
    cart: CartReducer,
    common: CommonReducer,
    anonymousUser: persistReducer(anonymousUserPersistConfig, AnonymousUserCartReducer),
    dashboard: DashboardReducer,
});
