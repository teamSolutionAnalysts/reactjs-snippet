import _ from "lodash";
import ActionTypes from "@Redux/ActionTypes";
import Cookies from "js-cookie";

export interface BreadCrumbsData {
    title: string | string[];
    active: boolean;
    href: string;
    as?: string;
}

interface State {
    breadCrumbsData: BreadCrumbsData[];
}

const language = Cookies.get("next-i18next");

const INITIAL_STATE: State = {
    breadCrumbsData: [{ title: language === "ar" ? "منزل، بيت" : "Home", href: "/", active: false }],
};

const BreadcrumbReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Breadcrumbs.SaveBreadcrumbData: {
            const indexOfPageInList: number = state.breadCrumbsData.findIndex(
                value => value.title === action.payload.title
            );
            const isPageInList: boolean = indexOfPageInList !== -1;
            const newData = _.isArray(action.payload) ? action.payload : [action.payload];
            let newBreadcrumbs = [...state.breadCrumbsData];

            if (!isPageInList) {
                const lastElem = _.last(newBreadcrumbs);
                if (!_.isUndefined(lastElem)) {
                    lastElem.active = false;
                }
                newBreadcrumbs = [...newBreadcrumbs, ...newData];
            } else {
                newBreadcrumbs.splice(indexOfPageInList + 1);
                const lastElem = _.last(newBreadcrumbs);
                if (!_.isUndefined(lastElem)) {
                    lastElem.active = true;
                }
            }

            return {
                ...state,
                breadCrumbsData: newBreadcrumbs,
            };
        }

        case ActionTypes.Breadcrumbs.ReplaceBreadcrumb: {
            const breadcrumbClone = [...state.breadCrumbsData];
            breadcrumbClone.splice(breadcrumbClone.length - 1);
            return {
                ...state,
                breadCrumbsData: [...breadcrumbClone, action.payload],
            };
        }

        default:
            return state;
    }
};

export default BreadcrumbReducer;
