import Zone from "@insite/client-framework/Components/Zone";
import PageModule from "@insite/client-framework/Types/PageModule";
import PageProps from "@insite/client-framework/Types/PageProps";
import Page from "@insite/mobius/Page";
import * as React from "react";

const ChangePasswordPage = ({ id }: PageProps) => (
    <Page>
        <Zone contentId={id} zoneName="Content" />
    </Page>
);

const pageModule: PageModule = {
    component: ChangePasswordPage,
    definition: {
        hasEditableUrlSegment: true,
        hasEditableTitle: true,
        pageType: "System",
    },
};

export default pageModule;

/**
 * @deprecated Use string literal "ChangePasswordPage" instead of this constant.
 */
export const ChangePasswordPageContext = "ChangePasswordPage";
