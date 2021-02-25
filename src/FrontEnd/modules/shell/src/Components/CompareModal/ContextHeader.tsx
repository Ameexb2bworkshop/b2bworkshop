import { DeviceType } from "@insite/client-framework/Types/ContentItemModel";
import Button from "@insite/mobius/Button/Button";
import Icon from "@insite/mobius/Icon";
import Typography from "@insite/mobius/Typography";
import FullWidth from "@insite/shell/Components/Icons/FullWidth";
import SplitScreen from "@insite/shell/Components/Icons/SplitScreen";
import { Spacer } from "@insite/shell/Components/Shell/HeaderBar";
import ViewPortClicker from "@insite/shell/Components/Shell/ViewPortClicker";
import {
    configureComparison,
    loadPublishedPageVersions,
    restoreVersion,
    setIsSideBySide,
    switchDisplayedSide,
} from "@insite/shell/Store/CompareModal/CompareModalActionCreators";
import { CompareModalState } from "@insite/shell/Store/CompareModal/CompareModalState";
import ShellState from "@insite/shell/Store/ShellState";
import React from "react";
import { connect, ResolveThunks } from "react-redux";
import styled from "styled-components";

interface OwnProps {
    closeModal: () => void;
}

const mapStateToProps = (state: ShellState) => {
    const {
        compareModal: { compareVersions, isSideBySide },
        shellContext: { languages, personas, deviceTypes },
    } = state;

    return {
        isSideBySide,
        compareVersions,
        languages,
        personas,
        deviceTypes,
    };
};

const mapDispatchToProps = {
    configureComparison,
    loadPublishedPageVersions,
    restoreVersion,
    setIsSideBySide,
    switchDisplayedSide,
};

type Props = ReturnType<typeof mapStateToProps> & ResolveThunks<typeof mapDispatchToProps> & OwnProps;

class ContextHeader extends React.Component<Props> {
    update = (value: Partial<CompareModalState["compareVersions"]>) => {
        const compareVersions = { ...this.props.compareVersions!, ...value };
        this.props.configureComparison(compareVersions);
    };

    onLanguageChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.update({ languageId: event.currentTarget.value });
    };

    onPersonaChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.update({ personaId: event.currentTarget.value });
    };

    onDeviceTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.update({ deviceType: event.currentTarget.value });
    };

    changeStageMode = (stageMode: DeviceType) => {
        this.update({ stageMode });
    };

    render() {
        const { compareVersions, languages, personas, deviceTypes, isSideBySide } = this.props;

        if (!compareVersions) {
            return null;
        }

        const { languageId, deviceType, personaId, stageMode, name } = compareVersions;
        const { hasDeviceSpecificContent, hasPersonaSpecificContent } = languages.filter(o => o.id === languageId)[0];

        const clicker = (targetStageMode: DeviceType) => (
            <ViewPortClicker
                targetStageMode={targetStageMode}
                currentStageMode={stageMode}
                changeStageMode={this.changeStageMode}
            />
        );

        return (
            <ContextHeaderStyle>
                <ContextSelects>
                    <TitleStyle variant="h3">Comparing: {name}</TitleStyle>
                    <Icon src="Globe" size={20} color="#000" />
                    <select
                        onChange={this.onLanguageChange}
                        data-test-selector="publishCompareModal_languageSelect"
                        value={languageId}
                    >
                        {languages.map(({ id, description }) => (
                            <option key={id} value={id}>
                                {description}
                            </option>
                        ))}
                    </select>
                    {hasDeviceSpecificContent && (
                        <>
                            <Icon src="Monitor" size={20} color="#000" />
                            <select
                                onChange={this.onDeviceTypeChange}
                                value={deviceType}
                                data-test-selector="publishCompareModal_deviceSelect"
                            >
                                {deviceTypes.map(deviceType => (
                                    <option key={deviceType} value={deviceType}>
                                        {deviceType}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                    {hasPersonaSpecificContent && (
                        <>
                            <Icon src="Users" size={20} color="#000" />
                            <select
                                onChange={this.onPersonaChange}
                                data-test-selector="publishCompareModal_personaSelect"
                                value={personaId}
                            >
                                {personas.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                </ContextSelects>
                <RightSideStuff>
                    <ViewButtonStyle
                        data-isclickable={!isSideBySide}
                        onClick={() => {
                            this.props.setIsSideBySide(true);
                        }}
                    >
                        <SplitScreen /> Side by Side
                    </ViewButtonStyle>
                    <ViewButtonStyle
                        data-isclickable={isSideBySide}
                        onClick={() => {
                            this.props.setIsSideBySide(false);
                        }}
                    >
                        <FullWidth /> Full Width
                    </ViewButtonStyle>
                    <SwitchButton
                        variant="secondary"
                        disabled={isSideBySide}
                        sizeVariant="small"
                        onClick={() => {
                            this.props.switchDisplayedSide();
                        }}
                    >
                        Switch Versions
                    </SwitchButton>
                    <Icon src={Spacer} color="#999" />
                    {clicker("Phone")}
                    {clicker("Tablet")}
                    {clicker("Desktop")}
                    <Icon src={Spacer} color="#999" />
                    <CloseButton
                        size={30}
                        data-test-selector="publishCompareModal_close"
                        onClick={this.props.closeModal}
                    >
                        Close
                    </CloseButton>
                </RightSideStuff>
            </ContextHeaderStyle>
        );
    }
}

const ContextHeaderStyle = styled.div`
    display: flex;

    > * {
        width: 50%;
    }
`;

const TitleStyle = styled(Typography)`
    margin: 0 20px 5px 0;
`;

const ContextSelects = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    > select {
        font-weight: bold;
        border: none;
        background: transparent;
        margin-right: 16px;
        height: 32px;
        cursor: pointer;
    }
`;

const RightSideStuff = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    align-items: center;
    padding: 1px 0;
`;

const CloseButton = styled(Button)`
    margin-left: 10px;
`;

const ViewButtonStyle = styled.div`
    color: white;
    background-color: ${props => props.theme.colors.primary.main};
    height: 100%;
    padding: 10px;
    display: flex;
    align-content: center;
    svg {
        margin-right: 4px;
    }
    svg path {
        fill: white;
    }

    &[data-isclickable="true"] {
        background-color: transparent;
        color: #999;
        cursor: pointer;
        &:hover {
            background-color: #d4e0fd;
        }
        svg path {
            fill: #999;
        }
    }
`;

const SwitchButton = styled(Button)`
    margin-left: 10px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(ContextHeader);
