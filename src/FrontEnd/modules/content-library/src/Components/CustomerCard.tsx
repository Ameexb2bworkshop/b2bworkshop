import mergeToNew from "@insite/client-framework/Common/mergeToNew";
import React, { FC } from "react";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import AddressInfoDisplay, { AddressInfoDisplayStyles } from "@insite/content-library/Components/AddressInfoDisplay";
import Button, { ButtonPresentationProps } from "@insite/mobius/Button";
import { BaseAddressModel } from "@insite/client-framework/Types/ApiModels";
import styled, { css } from "styled-components";
import getColor from "@insite/mobius/utilities/getColor";
import translate from "@insite/client-framework/Translate";
import InjectableCss from "@insite/mobius/utilities/InjectableCss";
import Link, { LinkPresentationProps } from "@insite/mobius/Link";

interface OwnProps {
    customer: BaseAddressModel;
    isSelected?: boolean;
    onSelect: (shipTo: BaseAddressModel) => void;
    allowEditCustomer: boolean;
    onEdit?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, customer: BaseAddressModel) => void;
    extendedStyles?: CustomerCardStyles;
}

export interface CustomerCardStyles {
    container?: GridContainerProps;
    addressGridItem?: GridItemProps;
    address?: AddressInfoDisplayStyles;
    actionsGridItem?: GridItemProps;
    actionsWrapper?: InjectableCss;
    selectButton?: ButtonPresentationProps;
    editLink?: LinkPresentationProps;
}

export const customerCardStyles: CustomerCardStyles = {
    container: {
        css: css`
            padding: 1rem 0;
            border-bottom: 1px solid ${getColor("common.border")};
        `,
    },
    addressGridItem: { width: 6 },
    actionsGridItem: {
        width: 6,
        css: css`
            justify-content: flex-end;
        `,
    },
    actionsWrapper: {
        css: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
        `,
    },
    selectButton: { variant: "tertiary" },
    editLink: { css: css` margin-top: 1rem; ` },
};

const ActionsWrapper = styled.div<InjectableCss>` ${({ css }) => css} `;

const CustomerCard: FC<OwnProps> = ({
    customer,
    isSelected,
    allowEditCustomer,
    onEdit,
    ...otherProps
}) => {
    const [styles] = React.useState(() => mergeToNew(customerCardStyles, otherProps.extendedStyles));

    const handleEditClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => onEdit?.(event, customer);

    return (
        <GridContainer {...styles.container}>
            <GridItem {...styles.addressGridItem}>
                <AddressInfoDisplay
                    {...customer}
                    state={customer.state?.abbreviation}
                    country={customer.country?.abbreviation}
                    extendedStyles={styles.address}
                />
            </GridItem>
            <GridItem {...styles.actionsGridItem}>
                <ActionsWrapper {...styles.actionsWrapper}>
                    <Button
                        {...styles.selectButton}
                        onClick={() => otherProps.onSelect(customer)}
                        disabled={isSelected}
                        data-test-selector={`customerCard_select_${customer.id}`}
                    >
                        {isSelected ? "Selected" : "Select"}
                    </Button>
                    {allowEditCustomer && onEdit
                        && <Link
                            {...styles.editLink}
                            onClick={handleEditClick}
                            data-test-selector={`customerCard_edit_${customer.id}`}
                        >
                            {translate("Edit")}
                        </Link>
                    }
                </ActionsWrapper>
            </GridItem>
        </GridContainer>
    );
};

export default CustomerCard;