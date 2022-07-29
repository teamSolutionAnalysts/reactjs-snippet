// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import ActionTypes from "@Redux/ActionTypes";
import { BreadCrumbsData } from "@Reducers/breadcrumbs";

const BreadcrumbAction = {
    SaveBreadCrumbsData: (newItem: BreadCrumbsData | BreadCrumbsData[]) => ({
        type: ActionTypes.Breadcrumbs.SaveBreadcrumbData,
        payload: newItem,
    }),
    ReplaceBreadcrumb: (newItem: BreadCrumbsData) => ({
        type: ActionTypes.Breadcrumbs.ReplaceBreadcrumb,
        payload: newItem,
    }),
};

export default BreadcrumbAction;
