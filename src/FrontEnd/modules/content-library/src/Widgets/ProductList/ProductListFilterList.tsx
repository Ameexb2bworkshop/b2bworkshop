import React, { FC } from "react";
import { connect, ResolveThunks } from "react-redux";
import WidgetModule from "@insite/client-framework/Types/WidgetModule";
import WidgetProps from "@insite/client-framework/Types/WidgetProps";
import { ProductListPageContext } from "@insite/content-library/Pages/ProductListPage";
import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import StyledWrapper from "@insite/client-framework/Common/StyledWrapper";
import Typography, { TypographyPresentationProps } from "@insite/mobius/Typography";
import translate from "@insite/client-framework/Translate";
import Tag, { TagPresentationProps } from "@insite/mobius/Tag";
import { css } from "styled-components";
import removeProductFilters from "@insite/client-framework/Store/Pages/ProductList/Handlers/RemoveProductFilters";
import Link, { LinkPresentationProps } from "@insite/mobius/Link";
import clearAllProductFilters from "@insite/client-framework/Store/Pages/ProductList/Handlers/ClearAllProductFilters";
import setNavRef from "@insite/client-framework/Store/Pages/ProductList/Handlers/SetNavRef";
import InjectableCss from "@insite/mobius/utilities/InjectableCss";
import { formatPriceRangeFacet } from "@insite/content-library/Widgets/ProductList/ProductListPriceFilters";
import SkipNav, { SkipNavStyles } from "@insite/content-library/Components/SkipNav";

interface OwnProps extends WidgetProps {
}

const mapStateToProps = ({ pages: { productList: { productsState, productFilters, unfilteredProductCollection } }, context }: ApplicationState) => {
    if (productsState.value) {
        return {
            loaded: true,
            stockedItemsOnly: productFilters.stockedItemsOnly,
            brandFacets: unfilteredProductCollection?.brandFacets,
            productLineFacets: unfilteredProductCollection?.productLineFacets,
            categoryFacets: unfilteredProductCollection?.categoryFacets,
            priceFacets: unfilteredProductCollection?.priceRange?.priceFacets,
            attributeTypeFacets: unfilteredProductCollection?.attributeTypeFacets,
            searchWithinQueries: productFilters.searchWithinQueries,
            selectedBrandIds: productFilters.brandIds,
            selectedProductLineIds: productFilters.productLineIds,
            selectedPriceFilters: productFilters.priceFilters,
            selectedAttributeValuesIds: productFilters.attributeValueIds,
            selectedCategoryId: productFilters.categoryId,
            session: context.session,
        };
    }
    return { };
};

const mapDispatchToProps = {
    removeProductFilters,
    clearAllProductFilters,
    setNavRef,
};

type Props = ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps> & OwnProps;

export interface ProductListFilterListStyles {
    wrapper?: InjectableCss;
    skipFiltersButtonWrapper?: InjectableCss;
    skipFiltersButton?: SkipNavStyles;
    filterText?: TypographyPresentationProps;
    filterTag?: TagPresentationProps;
    clearAllLink?: LinkPresentationProps;
}

const styles: ProductListFilterListStyles = {
    wrapper: { css: css`
            padding-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        `,
    },
    filterText: {
        variant: "h3",
    },
    skipFiltersButtonWrapper: {
        css: css`
            position: relative;
            top: -65px;
            width: 100%;
        `,
    },
};

export const filterListStyles = styles;

const ProductListFilterList: FC<Props> = (
    {
        loaded,
        stockedItemsOnly,
        brandFacets,
        productLineFacets,
        priceFacets,
        categoryFacets,
        attributeTypeFacets,
        searchWithinQueries,
        selectedBrandIds,
        selectedProductLineIds,
        selectedPriceFilters,
        selectedAttributeValuesIds,
        selectedCategoryId,
        removeProductFilters,
        clearAllProductFilters,
        setNavRef,
        session,
    }) => {
    const afterFilters = React.createRef<HTMLSpanElement>();

    React.useEffect(() => {
        setNavRef({ navRef: afterFilters });

        return () => {
            setNavRef({ navRef: undefined });
        };
    }, []);

    if (!loaded) {
        return null;
    }

    const clickRemoveStockedItemsOnly = () => {
        removeProductFilters({ stockedItemsOnly: false });
    };

    const clickRemoveSearchHandler = (search: string) => {
        removeProductFilters({ searchWithinQueries: [search] });
    };

    const clickRemoveBrandHandler = (id: string) => {
        removeProductFilters({ brandIds: [id] });
    };

    const clickRemoveProductLineHandler = (id: string) => {
        removeProductFilters({ productLineIds: [id] });
    };

    const clickRemovePriceHandler = (price: string) => {
        removeProductFilters({ priceFilters: [price] });
    };

    const clickRemoveAttributeValueHandler = (id: string) => {
        removeProductFilters({ attributeValueIds: [id] });
    };

    const clickRemoveCategoryHandler = () => {
        removeProductFilters({ categoryId: selectedCategoryId });
    };

    const anyActiveFilters
        = searchWithinQueries?.length
        || selectedBrandIds?.length
        || selectedProductLineIds?.length
        || selectedPriceFilters?.length
        || selectedAttributeValuesIds?.length
        || selectedCategoryId;

    return (
        <StyledWrapper {...styles.wrapper}>
            <Typography {...styles.filterText} data-test-selector="productListFilterList">{translate("Filter")}</Typography>
            <StyledWrapper {...styles.skipFiltersButtonWrapper}>
                <SkipNav text={translate("Skip to Results")} extendedStyles={styles.skipFiltersButton} destination={afterFilters}/>
            </StyledWrapper>
            {stockedItemsOnly
                && <Tag
                    {...styles.filterTag}
                    onDelete={clickRemoveStockedItemsOnly}
                    data-test-select="stockedItemsOnlyFilter"
                >
                    {translate("Stocked Items Only")}
                </Tag>
            }
            {searchWithinQueries?.map(s =>
                <Tag
                    key={s} {...styles.filterTag}
                    onDelete={() => clickRemoveSearchHandler(s)}
                    data-test-selector="searchWithinFilter"
                >
                    {translate("Search")}: {s}
                </Tag>,
            )}
            {selectedBrandIds?.map(id =>
                <Tag
                    key={id} {...styles.filterTag}
                    onDelete={() => clickRemoveBrandHandler(id)}
                    data-test-selector={`brandFilter${id}`}
                >
                    {translate("Brand")}: {brandFacets?.find(b => b.id === id)?.name}
                </Tag>,
            )}
            {selectedProductLineIds?.map(id =>
                <Tag
                    key={id} {...styles.filterTag}
                    onDelete={() => clickRemoveProductLineHandler(id)}
                    data-test-selector={`productLineFilter${id}`}
                >
                    {translate("Product Line")}: {productLineFacets?.find(x => x.id === id)?.name}
                </Tag>,
            )}
            {selectedCategoryId
                && <Tag
                    {...styles.filterTag}
                    onDelete={() => clickRemoveCategoryHandler()}
                    data-test-selector={`categoryFilter${selectedCategoryId}`}
                >
                    {translate("Category")}: {categoryFacets?.find(c => c.categoryId === selectedCategoryId)?.shortDescription}
                </Tag>
            }
            {selectedPriceFilters?.map(id =>
                <Tag
                    key={id} {...styles.filterTag}
                    onDelete={() => clickRemovePriceHandler(id)}
                    data-test-selector={`priceFilter${id}`}
                >
                    {translate("Price")}: {formatPriceRangeFacet(priceFacets?.find(x => x.minimumPrice.toString() === id), session)}
                </Tag>,
            )}
            {selectedAttributeValuesIds?.map(id => {
                    const attributeTypeFacet = attributeTypeFacets?.find(at => at.attributeValueFacets?.find(av => av.attributeValueId === id));
                    const attributeValueFacet = attributeTypeFacet?.attributeValueFacets?.find(av => av.attributeValueId === id);

                    return <Tag
                        key={id} {...styles.filterTag}
                        onDelete={() => clickRemoveAttributeValueHandler(id)}
                        data-test-selector={`attributeValueFilter${id}`}
                    >
                        {attributeTypeFacet?.nameDisplay}: {attributeValueFacet?.valueDisplay}
                    </Tag>;
                }
            )}
            {anyActiveFilters
                && <Link {...styles.clearAllLink} onClick={clearAllProductFilters} data-test-selector="productListClearAll">{translate("Clear All")}</Link>
            }
        </StyledWrapper>
    );
};

const widgetModule: WidgetModule = {

    component: connect(mapStateToProps, mapDispatchToProps)(ProductListFilterList),
    definition: {
        group: "Product List",
        displayName: "Filter List",
        allowedContexts: [ProductListPageContext],
        fieldDefinitions: [],
    },
};

export default widgetModule;