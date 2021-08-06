import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import { getCurrentPage } from "@insite/client-framework/Store/Data/Pages/PageSelectors";
import { getHomePageUrl, getPageLinkByNodeId } from "@insite/client-framework/Store/Links/LinksSelectors";
import LinksState from "@insite/client-framework/Store/Links/LinksState";
import translate from "@insite/client-framework/Translate";
import Breadcrumbs, { BreadcrumbsPresentationProps } from "@insite/mobius/Breadcrumbs";
import { LinkProps } from "@insite/mobius/Link";
import React, { FC } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationState) => {
    return {
        links: state.components.breadcrumbs.links,
        linksState: state.links,
        nodeId: getCurrentPage(state).nodeId,
        homePageUrl: getHomePageUrl(state),
    };
};

export interface PageBreadcrumbsStyles {
    breadcrumbs?: BreadcrumbsPresentationProps;
}

export const pageBreadcrumbStyles: PageBreadcrumbsStyles = {};

type Props = ReturnType<typeof mapStateToProps>;

const PageBreadcrumbs: FC<Props> = (props: Props) => {
    const homePageLink = { children: translate("Home"), href: props.homePageUrl };
    let links = props.links || generateLinksFrom(props.linksState, props.nodeId, props.homePageUrl);

    if (links?.length > 0) {
        links = [homePageLink, ...links.slice(1)];
    }

    return <Breadcrumbs links={links} data-test-selector="pageBreadcrumbs" {...pageBreadcrumbStyles.breadcrumbs} />;
};

export function generateLinksFrom(linksState: LinksState, nodeId: string, homePageUrl: string) {
    const links: LinkProps[] = [];
    const homePageLink = { children: translate("Home"), href: homePageUrl };
    let currentLink = getPageLinkByNodeId({ links: linksState }, nodeId);

    while (currentLink) {
        if (currentLink.type === "HomePage") {
            links.unshift(homePageLink);
        } else {
            links.unshift({ children: currentLink.title, href: currentLink.url });
        }
        currentLink = currentLink.parentId
            ? getPageLinkByNodeId({ links: linksState }, currentLink.parentId)
            : undefined;
    }

    return links;
}

export default connect(mapStateToProps)(PageBreadcrumbs);
