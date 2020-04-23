import React, { FC } from "react";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import WidgetProps from "@insite/client-framework/Types/WidgetProps";
import WidgetModule from "@insite/client-framework/Types/WidgetModule";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import Zone from "@insite/client-framework/Components/Zone";
import { OrderUploadPageContext } from "@insite/content-library/Pages/OrderUploadPage";

export interface OrderUploadPageContainerStyles {
    container?: GridContainerProps;
    fileUploadGridItem?: GridItemProps;
    instructionsGridItem?: GridItemProps;
}

const styles: OrderUploadPageContainerStyles = {
    fileUploadGridItem: { width: [12, 12, 6, 6, 6] },
    instructionsGridItem: { width: [12, 12, 6, 6, 6] },
};

export const orderUploadPageContainerStyles = styles;

const OrderUploadPageContainer: FC<WidgetProps> = (props) => {
    return (
        <GridContainer {...styles.container}>
            <GridItem {...styles.fileUploadGridItem}>
                <Zone zoneName="Content00" contentId={props.id} />
            </GridItem>
            <GridItem {...styles.instructionsGridItem}>
                <Zone zoneName="Content01" contentId={props.id} />
            </GridItem>
        </GridContainer>
    );
};

const widgetModule: WidgetModule = {
    component: OrderUploadPageContainer,
    definition: {
        group: "Order Upload",
        allowedContexts: [OrderUploadPageContext],
        fieldDefinitions: [],
        displayName: "Page Container",
    },
};

export default widgetModule;