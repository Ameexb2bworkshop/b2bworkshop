import { VmiLocationStateContext } from "@insite/client-framework/Store/Data/VmiLocations/VmiLocationsSelectors";
import WidgetModule from "@insite/client-framework/Types/WidgetModule";
import Typography, { TypographyPresentationProps } from "@insite/mobius/Typography";
import * as React from "react";
import { useContext } from "react";

export interface VmiLocationDetailsTitleStyles {
    titleText: TypographyPresentationProps;
}

export const titleStyles: VmiLocationDetailsTitleStyles = {
    titleText: {
        variant: "h2",
    },
};

const styles = titleStyles;

const VmiLocationDetailsTitle = () => {
    const { value: vmiLocation } = useContext(VmiLocationStateContext);
    if (!vmiLocation?.customer) {
        return null;
    }

    return (
        <Typography as="h1" {...styles.titleText}>
            {vmiLocation.customer.attention || `${vmiLocation.customer.firstName} ${vmiLocation.customer.lastName}`}
        </Typography>
    );
};

const widgetModule: WidgetModule = {
    component: VmiLocationDetailsTitle,
    definition: {
        allowedContexts: ["VmiLocationDetailsPage"],
        group: "VMI Location Details",
    },
};

export default widgetModule;
