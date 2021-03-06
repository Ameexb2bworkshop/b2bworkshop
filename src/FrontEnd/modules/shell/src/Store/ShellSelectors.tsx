import { getCurrentPage } from "@insite/client-framework/Store/Data/Pages/PageSelectors";
import PageProps, { cleanPage, PageModel } from "@insite/client-framework/Types/PageProps";
import ShellState from "@insite/shell/Store/ShellState";
import { ColorResult } from "react-color";

export const colorResultToString = (color: ColorResult): undefined | string => {
    let returnValue: undefined | string = color.hex.toUpperCase();
    if (color.hex === "unset") {
        returnValue = undefined;
    }
    if (color.rgb.a && color.rgb.a < 1) {
        returnValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    }
    return returnValue;
};

export function getStorablePage(
    state: ShellState,
    websiteId: string | null,
    page?: PageProps,
    shouldCleanPage = true,
): PageModel {
    const storablePage: PageModel = {
        ...(page ?? getCurrentPage(state)),
        widgets: [],
        websiteId,
    };

    const { widgetIdsByPageIdParentIdAndZone, widgetsById } = state.data.pages;

    const pageContent = widgetIdsByPageIdParentIdAndZone[storablePage.id];

    for (const parentId in pageContent) {
        for (const zone in pageContent[parentId]) {
            for (const widgetId of pageContent[parentId][zone]) {
                storablePage.widgets.push({
                    ...widgetsById[widgetId],
                    parentId:
                        storablePage.layoutPageId && widgetsById[widgetId].parentId === storablePage.layoutPageId
                            ? storablePage.id
                            : widgetsById[widgetId].parentId,
                });
            }
        }
    }

    if (shouldCleanPage) {
        cleanPage(storablePage);
    }

    return storablePage;
}
