import * as React from "react";
import { Dictionary } from "@insite/client-framework/Common/Types";
import { getWidgetDefinition, getWidgetDefinitions, LoadedWidgetDefinition } from "@insite/shell/DefinitionLoader";
import { connect, ResolveThunks } from "react-redux";
import sortBy from "lodash/sortBy";
import ShellState from "@insite/shell/Store/ShellState";
import styled, { css } from "styled-components";
import {
    savePage,
    editWidget,
    hideAddWidgetModal,
} from "@insite/shell/Store/PageEditor/PageEditorActionCreators";
import { addWidget } from "@insite/client-framework/Store/UNSAFE_CurrentPage/CurrentPageActionCreators";
import Modal, { ModalPresentationProps } from "@insite/mobius/Modal";
import { setupWidgetModel } from "@insite/shell/Services/WidgetCreation";
import WidgetProps from "@insite/client-framework/Types/WidgetProps";
import { sendToSite } from "@insite/shell/Components/Shell/SiteHole";
import WidgetGroups, { WidgetGroup } from "@insite/client-framework/Types/WidgetGroups";
import { ShellThemeProps } from "@insite/shell/ShellTheme";
import Search from "@insite/shell/Components/Icons/Search";
import TextField from "@insite/mobius/TextField";
import { AddWidgetData } from "@insite/client-framework/Common/FrameHole";
import mobiusIconsObject from "@insite/mobius/Icons/commonIcons";
import shellIconsObject from "../Icons/CompatibleIcons/shellIcons";
import Icon from "@insite/mobius/Icon";

const iconsObject = { ...shellIconsObject, ...mobiusIconsObject };

interface OwnProps {
}

type Props = ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps> & OwnProps;

const mapStateToProps = (state: ShellState, ownProps: OwnProps) => {
    const pageType = state.currentPage.page.type;
    const groups: WidgetGroup[] = [];
    const widgetsByGroup: Dictionary<LoadedWidgetDefinition[]> = {};

    for (const widgetDefinition of getWidgetDefinitions()) {
        if (widgetDefinition.allowedContexts && widgetDefinition.allowedContexts.indexOf(pageType) < 0) {
            continue;
        }

        if (!widgetsByGroup[widgetDefinition.group]) {
            groups.push(widgetDefinition.group);
            widgetsByGroup[widgetDefinition.group] = [];
        }
        widgetsByGroup[widgetDefinition.group].push(widgetDefinition);
    }

    for (const groupKey in widgetsByGroup) {
        widgetsByGroup[groupKey].sort((a, b) => (a.displayName || "").localeCompare(b.displayName || ""));
    }

    return {
        page: state.currentPage.page,
        currentLanguage: state.shellContext.languagesById[state.shellContext.currentLanguageId]!,
        defaultLanguageId: state.shellContext.defaultLanguageId,
        currentPersonaId: state.shellContext.currentPersonaId,
        currentDeviceType: state.shellContext.currentDeviceType,
        defaultPersonaId: state.shellContext.defaultPersonaId,
        addWidgetData: state.pageEditor.addWidgetData,
        widgetsByGroup,
        groups: sortBy(groups, [o => WidgetGroups.indexOf(o)]),
    };
};

const mapDispatchToProps = {
    addWidget,
    savePage,
    editWidget,
    hideAddWidgetModal,
};

interface State {
    widgetSearch: string;
}

export interface AddWidgetModalStyles {
    modal?: ModalPresentationProps;
}

const styles: AddWidgetModalStyles = {
    modal: {
        size: 900,
        cssOverrides: {
            modalContent: css`
                overflow-y: hidden;
            `,
        },
    },
};

class AddWidgetModal extends React.Component<Props, State> {
    searchInputWrapper = React.createRef<HTMLInputElement>();
    lastAddWidgetData?: AddWidgetData;

    constructor(props: Props) {
        super(props);

        this.state = {
            widgetSearch: "",
        };
    }

    close = () => {
        this.props.hideAddWidgetModal();
    };

    searchChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            widgetSearch: event.currentTarget.value,
        });
    };

    addWidget = (widgetDefinition: LoadedWidgetDefinition) => {
        const { addWidgetData, addWidget, currentLanguage, defaultLanguageId, currentPersonaId, defaultPersonaId,
                currentDeviceType, savePage, editWidget, hideAddWidgetModal } = this.props;
        if (!addWidgetData) {
            return;
        }

        const newWidget = setupWidgetModel(widgetDefinition, addWidgetData.parentId, addWidgetData.zoneName, currentLanguage, defaultLanguageId, currentDeviceType, currentPersonaId, defaultPersonaId) as WidgetProps;
        sendToSite({
            type: "AddWidget",
            widget: newWidget,
            sortOrder: addWidgetData.sortOrder,
        });
        addWidget(newWidget, addWidgetData.sortOrder);
        editWidget(newWidget.id, true);
        hideAddWidgetModal();
        savePage();
    };

    render() {
        const {
            groups,
            widgetsByGroup,
            addWidgetData,
        } = this.props;

        if (addWidgetData?.addRow && !this.lastAddWidgetData?.addRow) {
            this.addWidget(getWidgetDefinition("Basic/Row"));
        }

        setTimeout(() => {
            if (addWidgetData && !this.lastAddWidgetData && this.searchInputWrapper.current) {
                this.searchInputWrapper.current.querySelector("input")!.focus();
            }
            this.lastAddWidgetData = addWidgetData;
        });

        const { widgetSearch } = this.state;
        let displayedWidgetsByGroup: Dictionary<LoadedWidgetDefinition[]> = {};
        if (widgetSearch) {
            Object.keys(widgetsByGroup).forEach(groupName => {
                const possibleWidgets = widgetsByGroup[groupName];
                for (const widget of possibleWidgets) {
                    if (widget.displayName!.toLowerCase().indexOf(widgetSearch.toLowerCase()) >= 0) {
                        if (!displayedWidgetsByGroup[groupName]) {
                            displayedWidgetsByGroup[groupName] = [];
                        }
                        displayedWidgetsByGroup[groupName].push(widget);
                    }
                }
            });
        } else {
            displayedWidgetsByGroup = widgetsByGroup;
        }

        return (
            <Modal
                {...styles.modal}
                headline="Add Widget"
                handleClose={this.close}
                isOpen={!!addWidgetData && !addWidgetData.addRow}
            >
                <WidgetListWidgets ref={this.searchInputWrapper} data-test-selector="addWidgetModal">
                    <TextField
                        value={this.state.widgetSearch}
                        placeholder="Search Widgets"
                        onChange={this.searchChange}
                        cssOverrides={{ formInputWrapper: formInputWrapperCss, formField: formFieldCss }}
                        iconProps={{ src: () => <Search/> }}
                    />
                    <WidgetListScroller>
                        {groups.map(displayName =>
                            displayedWidgetsByGroup[displayName]
                            && <WidgetListGroup key={displayName}>
                                <WidgetListHeader>{displayName} elements</WidgetListHeader>
                                <WidgetListItems>
                                    {displayedWidgetsByGroup[displayName].map(widgetDefinition =>
                                        <WidgetListItemStyle key={widgetDefinition.type} onClick={() => this.addWidget(widgetDefinition)} data-test-selector={`addWidgetModal_${widgetDefinition.displayName}`}>
                                            <Icon src={iconsObject[widgetDefinition.icon || "NoIcon"]} />
                                            {widgetDefinition.displayName}
                                        </WidgetListItemStyle>,
                                    )}
                                </WidgetListItems>
                            </WidgetListGroup>,
                        )}
                    </WidgetListScroller>
                </WidgetListWidgets>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWidgetModal);

const formInputWrapperCss = css`
    margin-bottom: 10px;
    width: 300px;
`;

const formFieldCss = css`
    margin-top: 0;
`;

const WidgetListWidgets = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    height: 80vh;
`;

const WidgetListScroller = styled.div`
    height: calc(80vh - 85px);
    overflow-y: auto;
    padding-right: 5px;
    margin-bottom: 0;
    width: 100%;
`;

const WidgetListGroup = styled.div`
    border-radius: 4px;
    border: 1px solid ${(props: ShellThemeProps) => props.theme.colors.text.main};
    margin-bottom: 20px;
    background-color: white;
`;

const WidgetListHeader = styled.h3`
    background-color: ${(props: ShellThemeProps) => props.theme.colors.text.main};
    width: 100%;
    font-size: 14px;
    color: white;
    text-transform: uppercase;
    padding: 4px 8px;
`;

const WidgetListItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
`;

const WidgetListItemStyle = styled.div`
    flex-basis: 8.75%;
    border-radius: 4px;
    font-size: 13px;
    margin: 5px;
    display: flex;
    text-align: center;
    align-items: center;
    padding: 2px 5px;
    cursor: pointer;
    overflow: hidden;
    min-height: 36px;
    flex-direction: column;
`;