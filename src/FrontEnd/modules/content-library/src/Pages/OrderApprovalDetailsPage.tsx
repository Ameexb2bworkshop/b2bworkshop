import parseQueryString from "@insite/client-framework/Common/Utilities/parseQueryString";
import { CartContext } from "@insite/client-framework/Components/CartContext";
import Zone from "@insite/client-framework/Components/Zone";
import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import { getCurrentAccountState } from "@insite/client-framework/Store/Data/Accounts/AccountsSelector";
import loadCurrentAccount from "@insite/client-framework/Store/Data/Accounts/Handlers/LoadCurrentAccount";
import { getOrderApprovalsState } from "@insite/client-framework/Store/Data/OrderApprovals/OrderApprovalsSelectors";
import { getLocation } from "@insite/client-framework/Store/Data/Pages/PageSelectors";
import { getPageLinkByPageType } from "@insite/client-framework/Store/Links/LinksSelectors";
import displayOrder from "@insite/client-framework/Store/Pages/OrderApprovalDetails/Handlers/DisplayOrder";
import PageModule from "@insite/client-framework/Types/PageModule";
import PageProps from "@insite/client-framework/Types/PageProps";
import Page from "@insite/mobius/Page";
import { HasHistory, withHistory } from "@insite/mobius/utilities/HistoryContext";
import React, { useEffect } from "react";
import { connect, ResolveThunks } from "react-redux";

const mapStateToProps = (state: ApplicationState) => {
    const location = getLocation(state);
    let cartId;
    if (location && location.search) {
        const parsedQuery = parseQueryString<{ cartId: string }>(location.search);
        cartId = parsedQuery.cartId;
    }

    return {
        cartId,
        orderApprovalsState: getOrderApprovalsState(state, cartId),
        shouldLoadAccount: !getCurrentAccountState(state).value,
        orderApprovalListPageLink: getPageLinkByPageType(state, "OrderApprovalListPage"),
    };
};

const mapDispatchToProps = {
    displayOrder,
    loadCurrentAccount,
};

type Props = PageProps & HasHistory & ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps>;

const OrderApprovalDetailsPage = ({
    id,
    cartId,
    history,
    orderApprovalsState,
    displayOrder,
    shouldLoadAccount,
    loadCurrentAccount,
    orderApprovalListPageLink,
}: Props) => {
    useEffect(() => {
        if (cartId) {
            displayOrder({ cartId });
        }

        if (shouldLoadAccount) {
            loadCurrentAccount();
        }
    }, [shouldLoadAccount, cartId]);

    useEffect(() => {
        if (orderApprovalListPageLink && orderApprovalsState?.value?.status === "Submitted") {
            history.push(orderApprovalListPageLink.url);
        }
    }, [orderApprovalsState]);

    return (
        <Page>
            <CartContext.Provider value={orderApprovalsState?.value}>
                <Zone contentId={id} zoneName="Content" />
            </CartContext.Provider>
        </Page>
    );
};

const pageModule: PageModule = {
    component: connect(mapStateToProps, mapDispatchToProps)(withHistory(OrderApprovalDetailsPage)),
    definition: {
        hasEditableUrlSegment: true,
        hasEditableTitle: true,
        pageType: "System",
    },
};

export default pageModule;

/**
 * @deprecated Use string literal "OrderApprovalDetailsPage" instead of this constant.
 */
export const OrderApprovalDetailsPageContext = "OrderApprovalDetailsPage";
