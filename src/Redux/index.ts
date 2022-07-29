// #region Global Imports
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
// #region Local Imports
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Reducers from "./Reducers";
// #endregion Local Imports

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["checkout", "home", "plan", "cart", "dashboard"], // which reducer want to store
    blacklist: ["anonymousUser"],
};

const logMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV !== "production",
});
const pReducer = persistReducer(persistConfig, Reducers);

const middleware = applyMiddleware(thunkMiddleware, logMiddleware);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };
