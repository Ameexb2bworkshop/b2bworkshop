import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import { getVmiCountsDataView } from "@insite/client-framework/Store/Data/VmiCounts/VmiCountsSelectors";
import exportVmiCounts from "@insite/client-framework/Store/Pages/VmiBinDetails/Handlers/ExportVmiCounts";
import { TableTabKeys } from "@insite/client-framework/Store/Pages/VmiBinDetails/VmiBinDetailsReducer";
import translate from "@insite/client-framework/Translate";
import WidgetModule from "@insite/client-framework/Types/WidgetModule";
import WidgetProps from "@insite/client-framework/Types/WidgetProps";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import Link, { LinkPresentationProps } from "@insite/mobius/Link";
import Typography, { TypographyPresentationProps } from "@insite/mobius/Typography";
import React from "react";
import { connect, ResolveThunks } from "react-redux";
import { css } from "styled-components";

const mapStateToProps = (state: ApplicationState) => {
    return {
        vmiCountsState: getVmiCountsDataView(state, state.pages.vmiBinDetails.getVmiCountsParameter),
        selectedIds: state.pages.vmiBinDetails.selectedVmiItems[TableTabKeys.PreviousCounts] || {},
    };
};

const mapDispatchToProps = {
    exportVmiCounts,
};

type Props = ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps> & WidgetProps;

export interface VmiBinDetailsCountsActionsStyles {
    container?: GridContainerProps;
    gridItem?: GridItemProps;
    exportLink?: LinkPresentationProps;
    binsCountText?: TypographyPresentationProps;
}

export const vmiBinDetailsCountsActionsStyles: VmiBinDetailsCountsActionsStyles = {
    container: {
        gap: 8,
        css: css`
            padding: 20px 0;
        `,
    },
    gridItem: {
        width: 12,
        css: css`
            > * {
                padding-right: 10px;
            }
        `,
    },
    exportLink: {
        css: css`
            margin-left: 15px;
        `,
    },
};
const styles = vmiBinDetailsCountsActionsStyles;

const VmiBinDetailsCountsActions = ({ vmiCountsState, selectedIds, exportVmiCounts }: Props) => {
    if (!vmiCountsState.value || !vmiCountsState.pagination) {
        return null;
    }

    const { totalItemCount } = vmiCountsState.pagination;

    if (totalItemCount === 0) {
        return null;
    }

    const handleExportSelectedButtonClick = () => {
        exportVmiCounts({ ids: selectedIds });
    };

    const handleExportAllButtonClick = () => {
        exportVmiCounts({ ids: {} });
    };

    return (
        <>
            <GridContainer {...styles.container}>
                <GridItem {...styles.gridItem}>
                    <Typography {...styles.binsCountText}>
                        {totalItemCount} {translate("Counts")}
                    </Typography>
                    <Link
                        {...styles.exportLink}
                        disabled={Object.keys(selectedIds).length === 0}
                        onClick={handleExportSelectedButtonClick}
                    >
                        {translate("Export Selected")}
                    </Link>
                    <Link {...styles.exportLink} onClick={handleExportAllButtonClick}>
                        {translate("Export All")}
                    </Link>
                </GridItem>
            </GridContainer>
        </>
    );
};

const widgetModule: WidgetModule = {
    component: connect(mapStateToProps, mapDispatchToProps)(VmiBinDetailsCountsActions),
    definition: {
        group: "VMI Bin Details",
        displayName: "VMI Counts Actions",
        allowedContexts: ["VmiBinDetailsPage"],
    },
};

export default widgetModule;
