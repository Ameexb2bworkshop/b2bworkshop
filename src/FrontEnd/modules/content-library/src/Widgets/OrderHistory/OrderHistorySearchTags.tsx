import StyledWrapper from "@insite/client-framework/Common/StyledWrapper";
import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import { getVmiLocationState } from "@insite/client-framework/Store/Data/VmiLocations/VmiLocationsSelectors";
import updateSearchFields from "@insite/client-framework/Store/Pages/OrderHistory/Handlers/UpdateSearchFields";
import translate from "@insite/client-framework/Translate";
import WidgetModule from "@insite/client-framework/Types/WidgetModule";
import WidgetProps from "@insite/client-framework/Types/WidgetProps";
import Tag, { horizontalStyles, TagPresentationProps } from "@insite/mobius/Tag";
import InjectableCss from "@insite/mobius/utilities/InjectableCss";
import * as React from "react";
import { connect, ResolveThunks } from "react-redux";

const mapStateToProps = (state: ApplicationState) => {
    const vmiLocationId = state.pages.orderHistory.getOrdersParameter.vmiLocationId;

    return {
        filtersOpen: state.pages.orderHistory.filtersOpen,
        getOrdersParameter: state.pages.orderHistory.getOrdersParameter,
        vmiLocationState: vmiLocationId ? getVmiLocationState(state, vmiLocationId) : null,
    };
};

const mapDispatchToProps = {
    updateSearchFields,
};

export interface OrderHistorySearchTagsStyles {
    appliedFiltersContainer?: InjectableCss;
    appliedFilterTag?: TagPresentationProps;
}

export const orderHistorySearchTagsStyles: OrderHistorySearchTagsStyles = {
    appliedFiltersContainer: { css: horizontalStyles },
};

const styles = orderHistorySearchTagsStyles;

type Props = WidgetProps & ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps>;

const orderHistorySearchTags = ({ getOrdersParameter, updateSearchFields, vmiLocationState }: Props) => {
    const fieldRemoveHandler = (fieldName: string, value = "") => {
        updateSearchFields({ [fieldName]: value });
    };

    const customer = getOrdersParameter.customerSequence
        ? getOrdersParameter.customerSequence
        : translate("Billing Address");

    return (
        <StyledWrapper {...styles.appliedFiltersContainer}>
            {getOrdersParameter.productErpNumber && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("productErpNumber");
                    }}
                >
                    {`${translate("Product")}: ${getOrdersParameter.productErpNumber}`}
                </Tag>
            )}
            {getOrdersParameter.poNumber && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("poNumber");
                    }}
                >
                    {`${translate("PO #")}: ${getOrdersParameter.poNumber}`}
                </Tag>
            )}
            {getOrdersParameter.orderNumber && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("orderNumber");
                    }}
                >
                    {`${translate("Order #")}: ${getOrdersParameter.orderNumber}`}
                </Tag>
            )}
            {getOrdersParameter.fromDate && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("fromDate");
                    }}
                    data-test-selector="orderHistoryTags_FromDate"
                >
                    {`${translate("From")}: ${getOrdersParameter.fromDate}`}
                </Tag>
            )}
            {getOrdersParameter.toDate && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("toDate");
                    }}
                >
                    {`${translate("To")}: ${getOrdersParameter.toDate}`}
                </Tag>
            )}
            {customer !== "-1" && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("customerSequence", "-1");
                    }}
                >
                    {`${translate("Customer")}: ${customer}`}
                </Tag>
            )}
            {getOrdersParameter.status && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("status");
                    }}
                >
                    {`${translate("Status")}: ${
                        getOrdersParameter.displayName
                            ? translate(getOrdersParameter.displayName!)
                            : getOrdersParameter.status
                    }`}
                </Tag>
            )}
            {getOrdersParameter.orderTotalOperator && getOrdersParameter.orderTotal && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("orderTotalOperator");
                        fieldRemoveHandler("orderTotal");
                    }}
                >
                    {`${translate("Order Total")}: ${getOrdersParameter.orderTotalOperator} ${
                        getOrdersParameter.orderTotal
                    }`}
                </Tag>
            )}
            {getOrdersParameter.vmiLocationId && vmiLocationState?.value && (
                <Tag
                    {...styles.appliedFilterTag}
                    onDelete={() => {
                        fieldRemoveHandler("vmiLocationId");
                    }}
                >
                    {`${translate("VMI Location")}: ${vmiLocationState.value?.name}`}
                </Tag>
            )}
        </StyledWrapper>
    );
};

const widgetModule: WidgetModule = {
    component: connect(mapStateToProps, mapDispatchToProps)(orderHistorySearchTags),
    definition: {
        group: "Order History",
        displayName: "Tags",
        allowedContexts: ["OrderHistoryPage", "VmiOrderHistoryPage"],
    },
};

export default widgetModule;
