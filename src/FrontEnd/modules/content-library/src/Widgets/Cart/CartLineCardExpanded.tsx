import mergeToNew from "@insite/client-framework/Common/mergeToNew";
import { HasCartLineContext, withCartLine } from "@insite/client-framework/Components/CartLineContext";
import { Cart } from "@insite/client-framework/Services/CartService";
import { ProductModelExtended } from "@insite/client-framework/Services/ProductServiceV2";
import siteMessage from "@insite/client-framework/SiteMessage";
import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import setAddToListModalIsOpen from "@insite/client-framework/Store/Components/AddToListModal/Handlers/SetAddToListModalIsOpen";
import { getSettingsCollection } from "@insite/client-framework/Store/Context/ContextSelectors";
import { isOutOfStock } from "@insite/client-framework/Store/Data/Carts/CartsSelector";
import addToWishList from "@insite/client-framework/Store/Data/WishLists/Handlers/AddToWishList";
import removeCartLine from "@insite/client-framework/Store/Pages/Cart/Handlers/RemoveCartLine";
import updateCartLine from "@insite/client-framework/Store/Pages/Cart/Handlers/UpdateCartLine";
import translate from "@insite/client-framework/Translate";
import {
    ProductSettingsModel,
    PromotionModel,
} from "@insite/client-framework/Types/ApiModels";
import ProductAvailability, { ProductAvailabilityStyles } from "@insite/content-library/Components/ProductAvailability";
import ProductBrand, { ProductBrandStyles } from "@insite/content-library/Components/ProductBrand";
import ProductDescription, { ProductDescriptionStyles } from "@insite/content-library/Components/ProductDescription";
import ProductImage, { ProductImageStyles } from "@insite/content-library/Components/ProductImage";
import ProductPartNumbers, { ProductPartNumbersStyles } from "@insite/content-library/Components/ProductPartNumbers";
import ProductPrice, { ProductPriceStyles } from "@insite/content-library/Components/ProductPrice";
import CartLineNotes, { CartLineNotesStyles } from "@insite/content-library/Widgets/Cart/CartLineNotes";
import CartLineQuantity, { CartLineQuantityStyles } from "@insite/content-library/Widgets/Cart/CartLineQuantity";
import Clickable from "@insite/mobius/Clickable";
import { BaseTheme } from "@insite/mobius/globals/baseTheme";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import { IconMemo, IconPresentationProps } from "@insite/mobius/Icon";
import XCircle from "@insite/mobius/Icons/XCircle";
import Link, { LinkPresentationProps } from "@insite/mobius/Link";
import ToasterContext from "@insite/mobius/Toast/ToasterContext";
import Typography, { TypographyProps } from "@insite/mobius/Typography";
import breakpointMediaQueries from "@insite/mobius/utilities/breakpointMediaQueries";
import getColor from "@insite/mobius/utilities/getColor";
import React, { FC, useContext } from "react";
import { connect, HandleThunkActionCreator, ResolveThunks } from "react-redux";
import { css } from "styled-components";

interface OwnProps {
    cart: Cart;
    promotions: PromotionModel[];
    productSettings: ProductSettingsModel;
    showInventoryAvailability?: boolean;
    showLineNotes?: boolean;
    updateCartLine: HandleThunkActionCreator<typeof updateCartLine>;
    removeCartLine: HandleThunkActionCreator<typeof removeCartLine>;
    showRemoveAction?: boolean;
    hideAddToList?: boolean;
    extendedStyles?: CartLineCardExpandedStyles;
}

const mapStateToProps = (state: ApplicationState) => ({
    wishListSettings: getSettingsCollection(state).wishListSettings,
});

const mapDispatchToProps = {
    setAddToListModalIsOpen,
    addToWishList,
};

type Props = OwnProps & HasCartLineContext & ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps>;

export interface CartLineCardExpandedStyles {
    container?: GridContainerProps;
    productImageGridItem?: GridItemProps;
    productImage?: ProductImageStyles;
    cartLineInfoGridItem?: GridItemProps;
    cartLineInfoContainer?: GridContainerProps;
    productInfoGridItem?: GridItemProps;
    productInfoContainer?: GridContainerProps;
    productBrandAndDescriptionGridItem?: GridItemProps;
    productBrand?: ProductBrandStyles;
    productDescriptionGridItem?: GridItemProps;
    productDescription?: ProductDescriptionStyles;
    configurationGridItem?: GridItemProps;
    configurationOptionText?: TypographyProps;
    productPartNumbersGridItem?: GridItemProps;
    productPartNumbers?: ProductPartNumbersStyles;
    quantityAndExtendedUnitNetPriceGridItem?: GridItemProps;
    quantityAndExtendedUnitNetPriceContainer?: GridContainerProps;
    quantityGridItem?: GridItemProps;
    quantity?: CartLineQuantityStyles;
    extendedUnitNetPriceGridItem?: GridItemProps;
    extendedUnitNetPriceText?: TypographyProps;
    cartLineErrorMessageGridItem?: GridItemProps;
    cartLineErrorMessageText?: TypographyProps;
    productPriceAndAvailabilityGridItem?: GridItemProps;
    productPrice?: ProductPriceStyles;
    promotionNameText?: TypographyProps;
    productAvailability?: ProductAvailabilityStyles;
    addToListLink?: LinkPresentationProps;
    cartLineNotesGridItem?: GridItemProps;
    cartLineNotes?: CartLineNotesStyles;
    removeCartLineGridItem?: GridItemProps;
    removeCartLineIcon?: IconPresentationProps;
}

export const cartLineCardExpandedStyles: CartLineCardExpandedStyles = {
    container: {
        gap: 20,
        css: css`
            border-bottom: 1px solid ${getColor("common.border")};
            padding: 1rem 0;
        `,
    },
    productImageGridItem: {
        width: 2,
        css: css`
            ${({ theme }: { theme: BaseTheme }) =>
                breakpointMediaQueries(theme, [
                    css` font-size: 10px; `,
                    css` font-size: 10px; `,
                    css` font-size: 10px; `,
                    css` font-size: 10px; `,
                    null,
                ])}
        `,
    },
    cartLineInfoGridItem: { width: [8, 8, 8, 9, 9] },
    cartLineInfoContainer: { gap: 20 },
    productInfoGridItem: { width: [12, 12, 12, 7, 7] },
    productInfoContainer: { gap: 12 },
    productBrandAndDescriptionGridItem: {
        css: css` flex-direction: column; `,
        width: 12,
    },
    productDescriptionGridItem: {
        width: 12,
    },
    configurationGridItem: {
        width: 12,
        css: css` flex-direction: column; `,
    },
    productPartNumbersGridItem: { width: 12 },
    quantityAndExtendedUnitNetPriceGridItem: { width: 12 },
    quantityGridItem: { width: 6 },
    extendedUnitNetPriceGridItem: { width: 6, css: css` align-items: flex-end; ` },
    extendedUnitNetPriceText: {
        weight: "bold",
        css: css` margin-bottom: 10px; `,
    },
    cartLineErrorMessageGridItem: { width: 12 },
    cartLineErrorMessageText: { color: "danger" },
    productPriceAndAvailabilityGridItem: {
        width: [12, 12, 12, 5, 5],
        css: css` flex-direction: column; `,
    },
    addToListLink: { css: css` margin-top: 20px; ` },
    cartLineNotesGridItem: { width: 12 },
    removeCartLineGridItem: {
        css: css` justify-content: center; `,
        width: [2, 2, 2, 1, 1],
    },
    removeCartLineIcon: { src: XCircle },
};

const CartLineCardExpanded: FC<Props> = ({
    cart,
    cartLine,
    promotions,
    productSettings,
    showInventoryAvailability,
    showLineNotes,
    updateCartLine,
    removeCartLine,
    extendedStyles,
    showRemoveAction,
    wishListSettings,
    setAddToListModalIsOpen,
    addToWishList,
    hideAddToList,
}) => {
    const toasterContext = useContext(ToasterContext);
    const qtyOrderedChangeHandler = (qtyOrdered: number) => {
        if (qtyOrdered !== cartLine.qtyOrdered) {
            if (qtyOrdered <= 0) {
                removeCartLine({ cartLineId: cartLine.id });
            } else {
                updateCartLine({
                    cartLine: {
                        ...cartLine,
                        qtyOrdered,
                    },
                });
            }
        }
    };

    const notesChangeHandler = (notes: string) => {
        if (notes !== cartLine.notes) {
            updateCartLine({
                cartLine: {
                    ...cartLine,
                    notes,
                },
                onSuccess: () => {
                    toasterContext.addToast({
                        body: translate("Line Notes Updated"),
                        messageType: "success",
                    });
                },
            });
        }
    };

    const removeCartLineClickHandler = () => {
        if (!showRemoveAction) {
            return;
        }

        removeCartLine({ cartLineId: cartLine.id });
    };

    const addToListClickHandler = () => {
        if (!wishListSettings) {
            return;
        }

        const product = {
            id: cartLine.productId,
            qtyOrdered: cartLine.qtyOrdered,
            selectedUnitOfMeasure: cartLine.unitOfMeasure,
        } as ProductModelExtended;
        if (!wishListSettings.allowMultipleWishLists) {
            addToWishList({
                products: [product],
                onSuccess: () => {
                    toasterContext.addToast({ body: siteMessage("Lists_ProductAdded"), messageType: "success" });
                },
            });
            return;
        }

        setAddToListModalIsOpen({ modalIsOpen: true, products: [product] });
    };

    const sumQtyPerUom = cart.cartLines!.reduce(
        (sum, current) => {
            return current.productId === cartLine.productId
                ? sum + current.qtyPerBaseUnitOfMeasure * current.qtyOrdered!
                : sum;
        },
        0);

    const errorMessages: React.ReactNode[] = [];
    if (showInventoryAvailability && cartLine.hasInsufficientInventory && !isOutOfStock(cartLine)) {
        const tooManyRequestedMessage = siteMessage("Cart_ToManyQtyRequested", cartLine.qtyOnHand.toLocaleString(), sumQtyPerUom.toLocaleString());
        errorMessages.push(tooManyRequestedMessage);
    }

    if (cartLine.isRestricted) {
        errorMessages.push(translate("Restricted product"));
    }

    if (!cartLine.isActive) {
        errorMessages.push(translate("Inactive product"));
    }

    const [styles] = React.useState(() => mergeToNew(cartLineCardExpandedStyles, extendedStyles));

    return (
        <GridContainer {...styles.container} data-test-selector={`cartline_expanded_${cartLine.productId}_${cartLine.unitOfMeasure}`}>
            <GridItem {...styles.productImageGridItem}>
                <ProductImage product={cartLine} extendedStyles={styles.productImage} />
            </GridItem>
            <GridItem {...styles.cartLineInfoGridItem}>
                <GridContainer {...styles.cartLineInfoContainer}>
                    <GridItem {...styles.productInfoGridItem}>
                        <GridContainer {...styles.productInfoContainer}>
                            <GridItem {...styles.productBrandAndDescriptionGridItem}>
                                {cartLine.brand
                                    && <ProductBrand brand={cartLine.brand} extendedStyles={styles.productBrand} />
                                }
                                <ProductDescription product={cartLine} extendedStyles={styles.productDescription} />
                            </GridItem>
                            {!cartLine.isFixedConfiguration && cartLine.sectionOptions!.length > 0
                                && <GridItem {...styles.configurationGridItem}>
                                    {cartLine.sectionOptions!.map(option => (
                                        <Typography {...styles.configurationOptionText} key={option.sectionOptionId}>
                                            {`${option.sectionName}:${option.optionName}`}
                                        </Typography>
                                    ))}
                                </GridItem>
                            }
                            <GridItem {...styles.productPartNumbersGridItem}>
                                <ProductPartNumbers
                                    productNumber={cartLine.erpNumber}
                                    customerProductNumber={cartLine.customerName}
                                    manufacturerItem={cartLine.manufacturerItem}
                                    extendedStyles={styles.productPartNumbers}
                                />
                            </GridItem>
                            <GridItem {...styles.quantityAndExtendedUnitNetPriceGridItem}>
                                <GridContainer {...styles.quantityAndExtendedUnitNetPriceContainer}>
                                    <GridItem {...styles.quantityGridItem}>
                                        <CartLineQuantity
                                            cart={cart}
                                            editable={true}
                                            onQtyOrderedChange={qtyOrderedChangeHandler}
                                            extendedStyles={styles.quantity}
                                        />
                                    </GridItem>
                                    {!cartLine.quoteRequired && !cart.cartNotPriced
                                        && <GridItem {...styles.extendedUnitNetPriceGridItem}>
                                            <Typography {...styles.extendedUnitNetPriceText} data-test-selector="cartline_extendedUnitNetPrice">
                                                {cartLine.pricing!.extendedUnitNetPriceDisplay}
                                            </Typography>
                                        </GridItem>
                                    }
                                </GridContainer>
                            </GridItem>
                            {errorMessages.length > 0
                                && <GridItem {...styles.cartLineErrorMessageGridItem}>
                                    {errorMessages.map((message, index) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <Typography {...styles.cartLineErrorMessageText} key={index} data-test-selector="cartline_errorMessage">{message}</Typography>
                                    ))}
                                </GridItem>
                            }
                        </GridContainer>
                    </GridItem>
                    <GridItem {...styles.productPriceAndAvailabilityGridItem}>
                        {!cart.cartNotPriced
                            && <ProductPrice
                                product={cartLine}
                                currencySymbol={cart.currencySymbol}
                                showSavings={true}
                                showSavingsAmount={productSettings.showSavingsAmount}
                                showSavingsPercent={productSettings.showSavingsPercent}
                                extendedStyles={styles.productPrice} />
                        }
                        {promotions.map(promotion => (
                            <Typography {...styles.promotionNameText} key={promotion.id}>{promotion.name}</Typography>
                        ))}
                        {showInventoryAvailability && !cartLine.quoteRequired
                            && <ProductAvailability
                                productId={cartLine.productId!}
                                availability={cartLine.availability!}
                                unitOfMeasure={cartLine.unitOfMeasure}
                                trackInventory={cartLine.trackInventory}
                                extendedStyles={styles.productAvailability} />
                        }
                        {!hideAddToList
                            && <Link {...styles.addToListLink} onClick={addToListClickHandler}>{translate("Add to List")}</Link>
                        }
                    </GridItem>
                    {showLineNotes && cart.properties["isPunchout"] === undefined
                        && <GridItem {...styles.cartLineNotesGridItem}>
                            <CartLineNotes
                                cart={cart}
                                editable={true}
                                onNotesChange={notesChangeHandler}
                                extendedStyles={styles.cartLineNotes} />
                        </GridItem>
                    }
                </GridContainer>
            </GridItem>
            <GridItem {...styles.removeCartLineGridItem}>
                {showRemoveAction
                    && <Clickable onClick={removeCartLineClickHandler} data-test-selector="cartline_removeLine">
                        <IconMemo {...styles.removeCartLineIcon} />
                    </Clickable>
                }
            </GridItem>
        </GridContainer>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(withCartLine(CartLineCardExpanded));
