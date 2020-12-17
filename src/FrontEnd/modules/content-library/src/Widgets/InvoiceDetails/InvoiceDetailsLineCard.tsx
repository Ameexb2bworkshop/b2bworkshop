import mergeToNew from "@insite/client-framework/Common/mergeToNew";
import translate from "@insite/client-framework/Translate";
import { InvoiceLineModel } from "@insite/client-framework/Types/ApiModels";
import ProductBrand, { ProductBrandStyles } from "@insite/content-library/Components/ProductBrand";
import SmallHeadingAndText, { SmallHeadingAndTextStyles } from "@insite/content-library/Components/SmallHeadingAndText";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import LazyImage, { LazyImageProps } from "@insite/mobius/LazyImage";
import Link, { LinkPresentationProps } from "@insite/mobius/Link";
import getColor from "@insite/mobius/utilities/getColor";
import * as React from "react";
import { css } from "styled-components";

interface OwnProps {
    invoiceLine: InvoiceLineModel;
    extendedStyles?: InvoiceDetailsLineCardStyles;
}

export interface InvoiceDetailsLineCardStyles {
    container?: GridContainerProps;
    imageItem?: GridItemProps;
    imageLink?: LinkPresentationProps;
    image?: LazyImageProps;
    infoItem?: GridItemProps;
    infoInnerContainer?: GridContainerProps;
    infoLeftColumn?: GridItemProps;
    infoLeftColumnContainer?: GridContainerProps;
    brandItem?: GridItemProps;
    brandStyles?: ProductBrandStyles;
    productNameItem?: GridItemProps;
    productNameLink?: LinkPresentationProps;
    numbersItem?: GridItemProps;
    numbersInnerContainer?: GridContainerProps;
    partItem?: GridItemProps;
    partStyles?: SmallHeadingAndTextStyles;
    myPartItem?: GridItemProps;
    myPartStyles?: SmallHeadingAndTextStyles;
    mgfItem?: GridItemProps;
    mgfStyles?: SmallHeadingAndTextStyles;
    notesItem?: GridItemProps;
    notesStyles?: SmallHeadingAndTextStyles;
    infoRightColumn?: GridItemProps;
    infoRightColumnContainer?: GridContainerProps;
    priceItem?: GridItemProps;
    priceStyles?: SmallHeadingAndTextStyles;
    qtyItem?: GridItemProps;
    qtyStyles?: SmallHeadingAndTextStyles;
    totalItem?: GridItemProps;
    totalStyles?: SmallHeadingAndTextStyles;
}

export const cardStyles: InvoiceDetailsLineCardStyles = {
    imageItem: {
        width: 2,
        css: css`
            @media print {
                max-height: 83px;
                max-width: 83px;
            }
        `,
    },
    image: {
        height: "auto",
    },
    infoItem: {
        width: 10,
    },
    infoInnerContainer: {
        gap: 8,
    },
    infoLeftColumn: {
        width: [12, 12, 10, 10, 7],
        printWidth: 7,
    },
    infoLeftColumnContainer: {
        gap: 8,
    },
    brandItem: {
        width: 12,
    },
    brandStyles: {
        nameText: {
            css: css`
                color: ${getColor("text.main")};
            `,
        },
    },
    productNameItem: {
        width: 12,
    },
    numbersItem: {
        width: 12,
    },
    numbersInnerContainer: {
        gap: 8,
    },
    partItem: {
        width: [6, 6, 4, 4, 4],
        printWidth: 4,
    },
    myPartItem: {
        width: [6, 6, 4, 4, 4],
        printWidth: 4,
    },
    mgfItem: {
        width: [6, 6, 4, 4, 4],
        printWidth: 4,
    },
    notesItem: {
        width: 12,
    },
    infoRightColumn: {
        width: [12, 12, 2, 2, 5],
        printWidth: 5,
    },
    infoRightColumnContainer: {
        gap: 8,
    },
    priceItem: {
        width: [6, 6, 12, 12, 5],
        printWidth: 5,
    },
    qtyItem: {
        width: [6, 6, 12, 12, 3],
        printWidth: 3,
    },
    totalItem: {
        width: [12, 12, 12, 12, 4],
        printWidth: 4,
        css: css`
            font-weight: 600;
        `,
    },
};

const InvoiceDetailsLineCard: React.FC<OwnProps> = ({ invoiceLine, extendedStyles }) => {
    const [styles] = React.useState(() => mergeToNew(cardStyles, extendedStyles));

    return (
        <GridContainer {...styles.container}>
            <GridItem {...styles.imageItem}>
                <Link href={invoiceLine.productUri} {...styles.imageLink}>
                    <LazyImage src={invoiceLine.mediumImagePath} {...styles.image} />
                </Link>
            </GridItem>
            <GridItem {...styles.infoItem}>
                <GridContainer {...styles.infoInnerContainer}>
                    <GridItem {...styles.infoLeftColumn}>
                        <GridContainer {...styles.infoLeftColumnContainer}>
                            {invoiceLine.brand && (
                                <GridItem {...styles.brandItem} data-test-selector="invoiceLine_brand">
                                    <ProductBrand
                                        brand={invoiceLine.brand}
                                        showLogo={false}
                                        extendedStyles={styles.brandStyles}
                                    />
                                </GridItem>
                            )}
                            <GridItem {...styles.productNameItem}>
                                <Link
                                    {...styles.productNameLink}
                                    href={invoiceLine.productUri}
                                    data-test-selector="invoiceLine_product"
                                >
                                    {invoiceLine.shortDescription}
                                </Link>
                            </GridItem>
                            <GridItem {...styles.numbersItem}>
                                <GridContainer {...styles.numbersInnerContainer}>
                                    <GridItem {...styles.partItem}>
                                        <SmallHeadingAndText
                                            heading={translate("Part #")}
                                            text={invoiceLine.productERPNumber}
                                            extendedStyles={styles.partStyles}
                                        />
                                    </GridItem>
                                    <GridItem {...styles.myPartItem}>
                                        <SmallHeadingAndText
                                            heading={translate("My Part #")}
                                            text={invoiceLine.customerProductNumber}
                                            extendedStyles={styles.myPartStyles}
                                        />
                                    </GridItem>
                                    <GridItem {...styles.mgfItem}>
                                        <SmallHeadingAndText
                                            heading={translate("MFG #")}
                                            text={invoiceLine.manufacturerItem}
                                            extendedStyles={styles.mgfStyles}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                            <GridItem {...styles.notesItem}>
                                <SmallHeadingAndText
                                    heading={translate("Line Notes")}
                                    text={invoiceLine.notes}
                                    extendedStyles={styles.notesStyles}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem {...styles.infoRightColumn}>
                        <GridContainer {...styles.infoRightColumnContainer}>
                            <GridItem {...styles.priceItem}>
                                <SmallHeadingAndText
                                    heading={translate("Price")}
                                    text={
                                        invoiceLine.unitPriceDisplay +
                                        (invoiceLine.unitOfMeasure ? ` / ${invoiceLine.unitOfMeasure}` : "")
                                    }
                                    extendedStyles={styles.priceStyles}
                                />
                            </GridItem>
                            <GridItem {...styles.qtyItem}>
                                <SmallHeadingAndText
                                    heading={translate("QTY Invoiced")}
                                    text={invoiceLine.qtyInvoiced}
                                    extendedStyles={styles.qtyStyles}
                                />
                            </GridItem>
                            <GridItem {...styles.totalItem}>
                                <SmallHeadingAndText
                                    heading={translate("Subtotal")}
                                    text={invoiceLine.lineTotalDisplay}
                                    extendedStyles={styles.totalStyles}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </GridItem>
        </GridContainer>
    );
};

export default InvoiceDetailsLineCard;
