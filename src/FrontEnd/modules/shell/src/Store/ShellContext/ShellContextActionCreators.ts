import ContentMode from "@insite/client-framework/Common/ContentMode";
import { addTask } from "@insite/client-framework/ServerSideRendering";
import { loadPage } from "@insite/client-framework/Store/Data/Pages/PagesActionCreators";
import { getCurrentPage } from "@insite/client-framework/Store/Data/Pages/PageSelectors";
import { loadPageLinks } from "@insite/client-framework/Store/Links/LinksActionCreators";
import { DeviceType } from "@insite/client-framework/Types/ContentItemModel";
import { closeSiteHole, sendToSite } from "@insite/shell/Components/Shell/SiteHole";
import { getShellContext, switchContentMode } from "@insite/shell/Services/ContentAdminService";
import { loadTreeNodes } from "@insite/shell/Store/PageTree/PageTreeActionCreators";
import { AnyShellAction } from "@insite/shell/Store/Reducers";
import ShellThunkAction from "@insite/shell/Store/ShellThunkAction";
import { History, Location } from "history";

export const loadShellContext = (): ShellThunkAction => dispatch => {
    addTask(
        (async function () {
            const shellContext = await getShellContext();

            dispatch({
                ...shellContext,
                type: "ShellContext/CompleteLoadShellContext",
            });

            const links = document.querySelectorAll("link[rel~='icon']") as NodeListOf<HTMLAnchorElement>;
            if (shellContext.websiteFavicon && links) {
                for (const link of links) {
                    link.href = shellContext.websiteFavicon;
                    link.type = "";
                }
            }

            dispatch({
                type: "Data/Pages/CompleteChangeContext",
                languageId: shellContext.currentLanguageId,
                personaId: shellContext.defaultPersonaId,
                deviceType: "Desktop",
                defaultLanguageId: shellContext.defaultLanguageId,
                permissions: shellContext.permissions,
            });
        })(),
    );
};

export const changeStageMode = (stageMode: DeviceType): AnyShellAction => ({
    type: "ShellContext/ChangeStageMode",
    stageMode,
});

export const logOut = (): ShellThunkAction => dispatch => {
    dispatch({
        type: "ShellContext/LogOut",
    });
    window.location.reload();
};

export const toggleMobileCmsMode =
    (pageId: string, history: History): ShellThunkAction =>
    dispatch => {
        dispatch({
            type: "ShellContext/ToggleMobileCmsMode",
        });

        history.push(`/ContentAdmin/Page/${pageId}`);
    };

export const toggleSearchDataModeActive = (): ShellThunkAction => dispatch => {
    dispatch({
        type: "ShellContext/ToggleSearchDataModeActive",
    });
};

export const setContentMode =
    (contentMode: ContentMode): ShellThunkAction =>
    (dispatch, getState) => {
        addTask(
            (async function () {
                await switchContentMode(contentMode);
                sendToSite({
                    type: "Reload",
                });
                closeSiteHole();
                const pageId = getCurrentPage(getState()).id;
                // we need to clear out any already loaded pages so our editor doesn't show the wrong field values
                dispatch({
                    type: "Data/Pages/Reset",
                });
                if (pageId) {
                    dispatch(loadPage({ pathname: `/Content/Page/${pageId}`, search: "" } as Location));
                }
                dispatch({
                    type: "ShellContext/SetContentMode",
                    contentMode,
                });
                dispatch(loadTreeNodes());
                dispatch(loadPageLinks());
            })(),
        );
    };
