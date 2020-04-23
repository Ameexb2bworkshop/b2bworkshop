import * as React from "react";
import styled, { css } from "styled-components";
import { FormFieldProps } from "@insite/mobius/FormField";
import { CheckboxProps } from "@insite/mobius/Checkbox";
import Clickable from "@insite/mobius/Clickable";
import Typography from "@insite/mobius/Typography";
import Popover from "@insite/mobius/Popover";
import FieldSetPresentationProps from "@insite/mobius/utilities/fieldSetProps";
import getColor from "@insite/mobius/utilities/getColor";
import uniqueId from "@insite/mobius/utilities/uniqueId";

type Props = {
    title: string;
    insideForm?: boolean;
};

const MenuHeader = styled.div`
    background: ${getColor("common.accentContrast")};
    height: 60px;
    padding: 18px 30px;
`;

const ConfigBody = styled.div`
    padding: 20px 30px 30px;
`;

export const configFormFieldStyles: Partial<FormFieldProps> = {
    labelPosition: "left",
    labelProps: {
        transform: "initial",
        weight: 300,
        css: css`
            text-transform: initial;
            text-align: left;
        `,
    },
};

export const configCheckboxStyles: Partial<CheckboxProps> & FieldSetPresentationProps<CheckboxProps> = {
    labelPosition: "left",
    variant: "toggle",
    typographyProps: {
        weight: 300,
        size: 18,
        css: css`
            text-transform: initial;
            text-align: left;
            margin-right: 10px;
        `,
    },
    css: css`
        margin-left: 0;
        height: 40px;
    `,
};

class ConfigMenu extends React.Component<Props> {
    state = { controlsId: uniqueId() };
    element = React.createRef<HTMLDivElement>();

    render() {
        return (
            <Popover
                xPosition="start"
                contentBodyProps={{
                    css: css`
                        background: #eee;
                        border-radius: 8px;
                    `,
                    _height: "1200px",
                    _width: 400,
                    as: "span",
                }}
                knownHeight={40}
                popoverTrigger={(
                    <Clickable style={{ width: "100%" }} css={css`
                        ${this.props.insideForm && "margin-top: 10px;"}
                        &:hover {
                            color: ${({ theme }) => theme.colors.primary.main};
                        }
                    `}>
                        <Typography
                            variant="h3"
                            css={css` margin: 9.5px 0 9.5px 0; `}
                        >
                            {this.props.title}
                        </Typography>
                    </Clickable>
                )}
                zIndexKey="menu"
                insideRefs={[this.element]}
                transitionDuration="short"
            >
                <MenuHeader>
                    <Typography size={20} weight={500} as="h2" color="common.accent" css={css` margin: 0; `}>
                        {this.props.title} Settings
                    </Typography>
                </MenuHeader>
                <ConfigBody>{this.props.children}</ConfigBody>
            </Popover>
        );
    }
}

export default ConfigMenu;