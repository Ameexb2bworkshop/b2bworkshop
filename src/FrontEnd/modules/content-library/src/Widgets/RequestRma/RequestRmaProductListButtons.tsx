import React, { FC } from "react";
import WidgetModule from "@insite/client-framework/Types/WidgetModule";
import { RequestRmaPageContext } from "@insite/content-library/Pages/RequestRmaPage";
import RequestRmaButtons, { RequestRmaButtonsStyles } from "@insite/content-library/Widgets/RequestRma/RequestRmaButtons";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import { css } from "styled-components";

export interface RequestRmaProductListButtonsStyles {
    gridContainer?: GridContainerProps;
    buttonsGridItem?: GridItemProps;
    requestRmaButtons?: RequestRmaButtonsStyles;
}

const styles: RequestRmaProductListButtonsStyles = {
    buttonsGridItem: {
        css: css` justify-content: flex-end; `,
        width: [0, 0, 0, 12, 12],
    },
};

export const productListButtonsStyles = styles;

const RequestRmaProductListButtons: FC = () => {
    return (
        <GridContainer {...styles.gridContainer}>
            <GridItem {...styles.buttonsGridItem}>
                <RequestRmaButtons extendedStyles={styles.requestRmaButtons} />
            </GridItem>
        </GridContainer>
    );
};

const widgetModule: WidgetModule = {
    component: RequestRmaProductListButtons,
    definition: {
        displayName: "Product List Buttons",
        allowedContexts: [RequestRmaPageContext],
        fieldDefinitions: [],
        group: "Return Request (RMA)",
    },
};

export default widgetModule;