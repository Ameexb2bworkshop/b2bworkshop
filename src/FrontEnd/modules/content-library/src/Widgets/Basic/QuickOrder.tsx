import { ProductInfo } from "@insite/client-framework/Common/ProductInfo";
import { makeHandlerChainAwaitable } from "@insite/client-framework/HandlerCreator";
import siteMessage from "@insite/client-framework/SiteMessage";
import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import { getSettingsCollection } from "@insite/client-framework/Store/Context/ContextSelectors";
import { getPageLinkByPageType } from "@insite/client-framework/Store/Links/LinksSelectors";
import addToCart from "@insite/client-framework/Store/Pages/Cart/Handlers/AddToCart";
import translate from "@insite/client-framework/Translate";
import WidgetModule from "@insite/client-framework/Types/WidgetModule";
import WidgetProps from "@insite/client-framework/Types/WidgetProps";
import ProductSelector, { ProductSelectorStyles } from "@insite/content-library/Components/ProductSelector";
import { BaseTheme } from "@insite/mobius/globals/baseTheme";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import Link, { LinkPresentationProps } from "@insite/mobius/Link";
import { HasToasterContext, withToaster } from "@insite/mobius/Toast/ToasterContext";
import Typography, { TypographyPresentationProps } from "@insite/mobius/Typography";
import breakpointMediaQueries from "@insite/mobius/utilities/breakpointMediaQueries";
import React, { FC } from "react";
import { connect, ResolveThunks } from "react-redux";
import { css } from "styled-components";

const mapStateToProps = (state: ApplicationState) => {
    const settingsCollection = getSettingsCollection(state);
    return {
        canOrderUpload: settingsCollection.orderSettings.canOrderUpload,
        showAddToCartConfirmationDialog: settingsCollection.productSettings.showAddToCartConfirmationDialog,
        orderUploadPageNavLink: getPageLinkByPageType(state, "OrderUploadPage"),
        quickOrderPageNavLink: getPageLinkByPageType(state, "QuickOrderPage"),
    };
};

const mapDispatchToProps = {
    addToCart: makeHandlerChainAwaitable(addToCart),
};

type Props = WidgetProps & ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps> & HasToasterContext;

export interface QuickOrderStyles {
    container?: GridContainerProps;
    titleGridItem?: GridItemProps;
    titleText?: TypographyPresentationProps;
    linksGridItem?: GridItemProps;
    orderUploadLink?: LinkPresentationProps;
    orderMultipleItemsLink?: LinkPresentationProps;
    productSelector?: ProductSelectorStyles;
}

export const quickOrderStyles: QuickOrderStyles = {
    container: {
        gap: 15,
    },
    titleGridItem: { width: [12, 5, 5, 5, 5] },
    titleText: {
        variant: "h3",
        css: css` margin-bottom: 0; `,
    },
    linksGridItem: {
        width: [12, 7, 7, 7, 7],
        css: css`
            ${({ theme }: { theme: BaseTheme }) =>
                breakpointMediaQueries(theme, [
                    css` padding-bottom: 20px; padding-top: 0; `,
                    css` justify-content: flex-end; padding-top: 20px; `,
                    css` justify-content: flex-end; padding-top: 20px; `,
                    css` justify-content: flex-end; padding-top: 20px; `,
                    css` justify-content: flex-end; padding-top: 20px; `,
                ])}
        `,
    },
    orderMultipleItemsLink: {
        css: css` margin-left: 20px; `,
    },
    productSelector: {
        container: { gap: 30 },
        searchGridItem: { width: [12, 12, 5, 5, 6] },
        qtyGridItem: { width: [3, 3, 2, 2, 2] },
        unitOfMeasureGridItem: { width: [9, 9, 2, 2, 2] },
        buttonGridItem: { width: [12, 12, 3, 3, 2] },
        selectButton: {
            css: css`
                width: 100%;
                align-self: flex-end;
            `,
        },
    },
};

const styles = quickOrderStyles;

const QuickOrder: FC<Props> = ({
    canOrderUpload,
    showAddToCartConfirmationDialog,
    orderUploadPageNavLink,
    quickOrderPageNavLink,
    toaster,
    addToCart,
}) => {
    const [errorMessage, setErrorMessage] = React.useState<React.ReactNode>("");

    const addProductToCart = async (productInfo: ProductInfo) => {
        await addToCart({
            productId: productInfo.productId,
            qtyOrdered: productInfo.qtyOrdered,
            unitOfMeasure: productInfo.unitOfMeasure,
            onError: () => {
                setErrorMessage(siteMessage("Product_NotFound"));
            },
        });

        if (showAddToCartConfirmationDialog) {
            toaster.addToast({ body: siteMessage("Cart_ProductAddedToCart"), messageType: "success" });
        }
    };

    return <>
        <GridContainer {...styles.container}>
            <GridItem {...styles.titleGridItem}>
                <Typography {...styles.titleText}>{translate("Quick Order")}</Typography>
            </GridItem>
            <GridItem {...styles.linksGridItem}>
                {canOrderUpload
                    && <Link {...styles.orderUploadLink} href={orderUploadPageNavLink ? orderUploadPageNavLink.url : undefined}>
                        {translate("Upload an Order")}
                    </Link>
                }
                <Link {...styles.orderMultipleItemsLink} href={quickOrderPageNavLink ? quickOrderPageNavLink.url : undefined}>
                    {translate("Order Multiple Items")}
                </Link>
            </GridItem>
        </GridContainer>
        <ProductSelector
            selectButtonTitle={translate("Add to Cart")}
            onSelectProduct={addProductToCart}
            productIsConfigurableMessage={siteMessage("QuickOrder_CannotOrderConfigurable")}
            productIsUnavailableMessage={siteMessage("QuickOrder_ProductIsUnavailable")}
            customErrorMessage={errorMessage}
            extendedStyles={styles.productSelector}
        />
    </>;
};

const widgetModule: WidgetModule = {
    component: connect(mapStateToProps, mapDispatchToProps)(withToaster(QuickOrder)),
    definition: {
        group: "Basic",
    },
};

export default widgetModule;
