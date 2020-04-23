import mergeToNew from "@insite/client-framework/Common/mergeToNew";
import React from "react";
import { BillToModel, CountryModel, StateModel } from "@insite/client-framework/Types/ApiModels";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import Typography, { TypographyPresentationProps } from "@insite/mobius/Typography";
import translate from "@insite/client-framework/Translate";
import CheckboxGroup, { CheckboxGroupComponentProps } from "@insite/mobius/CheckboxGroup";
import Checkbox, { CheckboxPresentationProps } from "@insite/mobius/Checkbox";
import AddressInfoDisplay, { AddressInfoDisplayStyles } from "@insite/content-library/Components/AddressInfoDisplay";
import TextField, { TextFieldPresentationProps } from "@insite/mobius/TextField";
import Select, { SelectPresentationProps } from "@insite/mobius/Select";
import { css } from "styled-components";

interface OwnProps {
    useBillTo: boolean;
    onUseBillToChange:  (event: React.SyntheticEvent<Element, Event>, value: boolean) => void;
    billTo: BillToModel | undefined;
    address1: string;
    onAddress1Change: (event: React.ChangeEvent<HTMLInputElement>) => void;
    address1Error?: string;
    country: string;
    onCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    countryError?: string;
    state: string;
    onStateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    stateError?: string;
    city: string;
    onCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    cityError?: string;
    postalCode: string;
    onPostalCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    postalCodeError?: string;
    availableCountries: CountryModel[];
    availableStates?: StateModel[] | null;
    extendedStyles?: CreditCardBillingAddressEntryStyles;
}

export interface CreditCardBillingAddressEntryStyles {
    container?: GridContainerProps;
    headingGridItem?: GridItemProps;
    heading?: TypographyPresentationProps;
    useBillingAddressGridItem?: GridItemProps;
    useBillingAddressCheckboxGroup?: CheckboxGroupComponentProps;
    useBillingAddressCheckbox?: CheckboxPresentationProps;
    billingAddressGridItem?: GridItemProps;
    billingAddressLabel?: TypographyPresentationProps;
    billingAddress?: AddressInfoDisplayStyles;
    address1GridItem?: GridItemProps;
    address1Text?: TextFieldPresentationProps;
    countryGridItem?: GridItemProps;
    countrySelect?: SelectPresentationProps;
    stateGridItem?: GridItemProps;
    stateSelect?: SelectPresentationProps;
    cityGridItem?: GridItemProps;
    cityText?: TextFieldPresentationProps;
    postalCodeGridItem?: GridItemProps;
    postalCodeText?: TextFieldPresentationProps;
}

export const creditCardBillingAddressEntryStyles: CreditCardBillingAddressEntryStyles = {
    container: { gap: 10 },
    headingGridItem: { width: 12 },
    heading: { variant: "h5" },
    useBillingAddressGridItem: { width: 12 },
    billingAddressGridItem: {
        width: 12,
        css: css` flex-direction: column; `,
    },
    billingAddressLabel: { weight: 600 },
    address1GridItem: { width: 12 },
    countryGridItem: { width: 12 },
    stateGridItem: { width: 12 },
    cityGridItem: { width: 12 },
    postalCodeGridItem: { width: 12 },
};

const CreditCardBillingAddressEntry = ({
    useBillTo,
    billTo,
    ...otherProps
}: OwnProps) => {
    const [styles] = React.useState(() => mergeToNew(creditCardBillingAddressEntryStyles, otherProps.extendedStyles));

    if (!billTo) {
        return null;
    }

    return (
        <GridContainer {...styles.container}>
            <GridItem {...styles.headingGridItem}>
                <Typography {...styles.heading} as="h2">{translate("Credit Card Address")}</Typography>
            </GridItem>
            <GridItem {...styles.useBillingAddressGridItem}>
                <CheckboxGroup {...styles.useBillingAddressCheckboxGroup}>
                    <Checkbox
                        {...styles.useBillingAddressCheckbox}
                        checked={useBillTo}
                        onChange={otherProps.onUseBillToChange}
                        data-test-selector="checkoutReviewAndSubmit_useBillingAddress"
                    >
                        {translate("Use billing address")}
                    </Checkbox>
                </CheckboxGroup>
            </GridItem>
            {useBillTo
                ? <GridItem {...styles.billingAddressGridItem}>
                    <Typography {...styles.billingAddressLabel}>{translate("Billing Address")}</Typography>
                    <AddressInfoDisplay
                        {...billTo}
                        state={billTo.state?.name}
                        country={billTo.country?.name}
                        extendedStyles={styles.billingAddress}
                    />
                </GridItem>
                : <>
                    <GridItem {...styles.address1GridItem}>
                        <TextField
                            {...styles.address1Text}
                            label={translate("Address")}
                            value={otherProps.address1}
                            onChange={otherProps.onAddress1Change}
                            required
                            maxLength={30}
                            error={otherProps.address1Error}
                            data-test-selector="checkoutReviewAndSubmit_creditCardBillingAddress1"
                        />
                    </GridItem>
                    <GridItem {...styles.countryGridItem}>
                        <Select
                            {...styles.countrySelect}
                            label={translate("Country")}
                            value={otherProps.country}
                            onChange={otherProps.onCountryChange}
                            required
                            error={otherProps.countryError}
                            data-test-selector="checkoutReviewAndSubmit_creditCardBillingCountry"
                        >
                            <option value="">{translate("Select Country")}</option>
                            {otherProps.availableCountries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem {...styles.stateGridItem}>
                        <Select
                            {...styles.stateSelect}
                            label={translate("State")}
                            value={otherProps.state}
                            onChange={otherProps.onStateChange}
                            required
                            error={otherProps.stateError}
                            data-test-selector="checkoutReviewAndSubmit_creditCardBillingState"
                        >
                            <option value="">{translate("Select State")}</option>
                            {otherProps.availableStates?.map(state => (
                                <option key={state.id} value={state.id}>{state.name}</option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem {...styles.cityGridItem}>
                        <TextField
                            {...styles.cityText}
                            label={translate("City")}
                            value={otherProps.city}
                            onChange={otherProps.onCityChange}
                            required
                            maxLength={30}
                            error={otherProps.cityError}
                            data-test-selector="checkoutReviewAndSubmit_creditCardBillingCity"
                        />
                    </GridItem>
                    <GridItem {...styles.postalCodeGridItem}>
                        <TextField
                            {...styles.postalCodeText}
                            label={translate("Postal Code")}
                            value={otherProps.postalCode}
                            onChange={otherProps.onPostalCodeChange}
                            required
                            maxLength={30}
                            error={otherProps.postalCodeError}
                            data-test-selector="checkoutReviewAndSubmit_creditCardBillingPostalCode"
                        />
                    </GridItem>
                </>
            }
        </GridContainer>
    );
};

export default CreditCardBillingAddressEntry;