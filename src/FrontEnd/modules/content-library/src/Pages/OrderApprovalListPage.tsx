import Zone from "@insite/client-framework/Components/Zone";
import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import loadOrderApprovals from "@insite/client-framework/Store/Data/OrderApprovals/Handlers/LoadOrderApprovals";
import {
    getOrderApprovalsDataView,
    OrderApprovalsDataViewContext,
} from "@insite/client-framework/Store/Data/OrderApprovals/OrderApprovalsSelectors";
import PageModule from "@insite/client-framework/Types/PageModule";
import PageProps from "@insite/client-framework/Types/PageProps";
import Page from "@insite/mobius/Page";
import React, { useEffect } from "react";
import { connect, ResolveThunks } from "react-redux";

const mapStateToProps = (state: ApplicationState) => ({
    getOrderApprovalsParameter: state.pages.orderApprovalList.getOrderApprovalsParameter,
    orderApprovalsDataView: getOrderApprovalsDataView(state, state.pages.orderApprovalList.getOrderApprovalsParameter),
});

const mapDispatchToProps = {
    loadOrderApprovals,
};

type Props = PageProps & ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps>;

const OrderApprovalListPage = ({
    id,
    getOrderApprovalsParameter,
    orderApprovalsDataView,
    loadOrderApprovals,
}: Props) => {
    useEffect(() => {
        // if this is undefined it means someone changed the filters and we haven't loaded the new collection yet
        if (!orderApprovalsDataView.value && !orderApprovalsDataView.isLoading) {
            loadOrderApprovals(getOrderApprovalsParameter);
        }
    });

    return (
        <Page>
            <OrderApprovalsDataViewContext.Provider value={orderApprovalsDataView}>
                <Zone contentId={id} zoneName="Content" />
            </OrderApprovalsDataViewContext.Provider>
        </Page>
    );
};

const pageModule: PageModule = {
    component: connect(mapStateToProps, mapDispatchToProps)(OrderApprovalListPage),
    definition: {
        hasEditableUrlSegment: true,
        hasEditableTitle: true,
        pageType: "System",
    },
};

export default pageModule;

/**
 * @deprecated Use string literal "OrderApprovalListPage" instead of this constant.
 */
export const OrderApprovalListPageContext = "OrderApprovalListPage";
