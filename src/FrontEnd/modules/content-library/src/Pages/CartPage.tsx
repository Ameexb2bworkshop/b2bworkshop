import Zone from "@insite/client-framework/Components/Zone";
import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import { getCurrentCartState } from "@insite/client-framework/Store/Data/Carts/CartsSelector";
import loadCurrentCart from "@insite/client-framework/Store/Data/Carts/Handlers/LoadCurrentCart";
import loadCurrentPromotions from "@insite/client-framework/Store/Data/Promotions/Handlers/LoadCurrentPromotions";
import { getCurrentPromotionsDataView } from "@insite/client-framework/Store/Data/Promotions/PromotionsSelectors";
import setIsPreloadingData from "@insite/client-framework/Store/Pages/CheckoutShipping/Handlers/SetIsPreloadingData";
import PageModule from "@insite/client-framework/Types/PageModule";
import PageProps from "@insite/client-framework/Types/PageProps";
import Modals from "@insite/content-library/Components/Modals";
import LoadingOverlay, { LoadingOverlayProps } from "@insite/mobius/LoadingOverlay";
import Page from "@insite/mobius/Page";
import React, { useEffect } from "react";
import { connect, ResolveThunks } from "react-redux";
import { css } from "styled-components";

interface OwnProps extends PageProps {}

const mapDispatchToProps = {
    loadCurrentCart,
    loadCurrentPromotions,
    setIsPreloadingData,
};

const mapStateToProps = (state: ApplicationState) => {
    const currentPromotionsDataView = getCurrentPromotionsDataView(state);
    const cartState = getCurrentCartState(state);
    return {
        shouldLoadCart:
            !cartState.isLoading && (!cartState.value || (cartState.value.lineCount && !cartState.value.cartLines)),
        shouldLoadPromotions: !currentPromotionsDataView.value && !currentPromotionsDataView.isLoading,
        isPreloadingData: state.pages.checkoutShipping.isPreloadingData,
    };
};

type Props = OwnProps & ResolveThunks<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

export interface CartPageStyles {
    loadingOverlay?: LoadingOverlayProps;
}

export const cartPageStyles: CartPageStyles = {
    loadingOverlay: {
        css: css`
            width: 100%;
        `,
    },
};

const styles = cartPageStyles;
const CartPage = ({
    id,
    shouldLoadCart,
    shouldLoadPromotions,
    loadCurrentPromotions,
    isPreloadingData,
    setIsPreloadingData,
    loadCurrentCart,
}: Props) => {
    useEffect(() => {
        if (shouldLoadPromotions) {
            loadCurrentPromotions();
        } else if (shouldLoadCart) {
            loadCurrentCart();
        }

        if (!shouldLoadPromotions && !shouldLoadCart && isPreloadingData) {
            setIsPreloadingData({ isPreloadingData: false });
        }
    });

    return (
        <Page>
            <LoadingOverlay {...styles.loadingOverlay} loading={isPreloadingData}>
                <Zone contentId={id} zoneName="Content"></Zone>
            </LoadingOverlay>
            <Modals />
        </Page>
    );
};

const pageModule: PageModule = {
    component: connect(mapStateToProps, mapDispatchToProps)(CartPage),
    definition: {
        hasEditableUrlSegment: true,
        hasEditableTitle: true,
        pageType: "System",
    },
};

export default pageModule;

/**
 * @deprecated Use string literal "CartPage" instead of this constant.
 */
export const CartPageContext = "CartPage";
