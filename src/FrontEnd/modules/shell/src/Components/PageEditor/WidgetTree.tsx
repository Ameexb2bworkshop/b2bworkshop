import * as React from "react";
import { connect } from "react-redux";
import ShellState from "@insite/shell/Store/ShellState";
import styled from "styled-components";

interface OwnProps {
    readonly id: string;
}

const mapStateToProps = (state: ShellState, ownProps: OwnProps) => {
    return {
        widgetIdsByParentIdAndZone: state.currentPage.widgetIdsByParentIdAndZone,
        widgetsById: state.currentPage.widgetsById,
    };
};

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const WidgetTree: React.FC<Props> = ({ widgetIdsByParentIdAndZone, id, widgetsById }) => {
    const zones = widgetIdsByParentIdAndZone[id];

    if (!zones) {
        return  null;
    }

    return <ul>
        {Object.keys(zones).map(zoneName =>
            <li key={zoneName}>
                <ZoneNameStyle>{zoneName}</ZoneNameStyle>
                <ChildrenStyle>
                    {zones[zoneName].map(id =>
                        <li key={id}>{widgetsById[id].type}
                            <WidgetTree id={id}
                                        widgetsById={widgetsById}
                                        widgetIdsByParentIdAndZone={widgetIdsByParentIdAndZone} />
                        </li>,
                    )}
                </ChildrenStyle>
            </li>,
        )}
    </ul>;
};

export default connect(mapStateToProps)(WidgetTree);

const ZoneNameStyle = styled.span`
    font-style: italic;
`;

const ChildrenStyle = styled.ul`
    li { padding-left: 10px; }
`;