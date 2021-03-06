/** Compile-time constant; when true, it's a production build, otherwise false. */
declare const IS_PRODUCTION: boolean;

/** Compile-time constant; when true, code will run server-side, otherwise false. */
declare const IS_SERVER_SIDE: boolean;

/** Compile-time constant; the date/time of the build presented as a number that directly corresponds to a JavaScript `Date`. */
declare const BUILD_DATE: number;

declare const BLUEPRINT_NAME: string;

declare module "@optimizely/design-tokens/dist/fonts/src/Inter-roman.var.woff2";
declare module "@optimizely/design-tokens/dist/fonts/src/Inter-italic.var.woff2";
declare module "@optimizely/design-tokens/dist/brand-assets/brand-logo.svg";
declare module "react-oui-icons";

declare module "@optimizely/design-tokens/dist/js/colors" {
    export const brandPrimaryColor: string;
    export const brandErrorColor: string;
    export const brandBackgroundPrimaryColor: string;
    export const brandBackgroundSecondaryColor: string;
    export const brandBackgroundDisabledColor: string;
    export const brandTextPrimaryColor: string;
    export const brandTextSecondaryColor: string;
    export const brandTextDisabledColor: string;
    export const brandPrimaryColor: string;
    export const brandErrorColor: string;
    export const brandBackgroundPrimaryColor: string;
    export const brandBackgroundSecondaryColor: string;
    export const brandBackgroundDisabledColor: string;
    export const brandTextPrimaryColor: string;
    export const brandTextSecondaryColor: string;
    export const brandTextDisabledColor: string;
    export const alertNeutralBackgroundColor: string;
    export const alertNeutralBorderColor: string;
    export const alertNeutralTextColor: string;
    export const alertBadBackgroundColor: string;
    export const alertBadBorderColor: string;
    export const alertBadTextColor: string;
    export const alertGoodBackgroundColor: string;
    export const alertGoodBorderColor: string;
    export const alertGoodTextColor: string;
    export const alertWarningBackgroundColor: string;
    export const alertWarningBorderColor: string;
    export const alertWarningTextColor: string;
    export const avatarBackgroundColor: string;
    export const avatarBorderColor: string;
    export const avatarIconColor: string;
    export const badgeDefaultBackgroundColor: string;
    export const badgeDefaultLabelColor: string;
    export const badgeDraftBackgroundColor: string;
    export const badgeDraftLabelColor: string;
    export const badgeLiveBackgroundColor: string;
    export const badgeLiveLabelColor: string;
    export const badgePlainBackgroundColor: string;
    export const badgePlainLabelColor: string;
    export const badgeBadBackgroundColor: string;
    export const badgeBadLabelColor: string;
    export const badgePrimaryBackgroundColor: string;
    export const badgePrimaryLabelColor: string;
    export const blockListBorderColor: string;
    export const blockListDividerColor: string;
    export const blockListBackgroundColor: string;
    export const blockListTextHeaderColor: string;
    export const blockListTextHeaderLinkColor: string;
    export const blockListTextItemColor: string;
    export const blockListTextDescriptionColor: string;
    export const borderUserInputColor: string;
    export const borderDividerColor: string;
    export const borderDisabledColor: string;
    export const butterbarBackgroundColor: string;
    export const butterbarBorderColor: string;
    export const butterbarTextColor: string;
    export const buttonPrimaryActiveBackgroundColor: string;
    export const buttonPrimaryActiveBorderColor: string;
    export const buttonPrimaryActiveLabelColor: string;
    export const buttonPrimaryDisabledBackgroundColor: string;
    export const buttonPrimaryDisabledBorderColor: string;
    export const buttonPrimaryDisabledLabelColor: string;
    export const buttonPrimaryHoverBackgroundColor: string;
    export const buttonPrimaryHoverBorderColor: string;
    export const buttonPrimaryHoverLabelColor: string;
    export const buttonPrimaryFocusBackgroundColor: string;
    export const buttonPrimaryFocusBorderColor: string;
    export const buttonPrimaryFocusLabelColor: string;
    export const buttonPrimaryPressedBackgroundColor: string;
    export const buttonPrimaryPressedBorderColor: string;
    export const buttonPrimaryPressedLabelColor: string;
    export const buttonOutlinedActiveBackgroundColor: string;
    export const buttonOutlinedActiveBorderColor: string;
    export const buttonOutlinedActiveLabelColor: string;
    export const buttonOutlinedDisabledBackgroundColor: string;
    export const buttonOutlinedDisabledBorderColor: string;
    export const buttonOutlinedDisabledLabelColor: string;
    export const buttonOutlinedHoverBackgroundColor: string;
    export const buttonOutlinedHoverBorderColor: string;
    export const buttonOutlinedHoverLabelColor: string;
    export const buttonOutlinedFocusBackgroundColor: string;
    export const buttonOutlinedFocusBorderColor: string;
    export const buttonOutlinedFocusLabelColor: string;
    export const buttonOutlinedPressedBackgroundColor: string;
    export const buttonOutlinedPressedBorderColor: string;
    export const buttonOutlinedPressedLabelColor: string;
    export const buttonDangerContainedActiveBackgroundColor: string;
    export const buttonDangerContainedActiveBorderColor: string;
    export const buttonDangerContainedActiveLabelColor: string;
    export const buttonDangerContainedDisabledBackgroundColor: string;
    export const buttonDangerContainedDisabledBorderColor: string;
    export const buttonDangerContainedDisabledLabelColor: string;
    export const buttonDangerContainedHoverBackgroundColor: string;
    export const buttonDangerContainedHoverBorderColor: string;
    export const buttonDangerContainedHoverLabelColor: string;
    export const buttonDangerContainedFocusBackgroundColor: string;
    export const buttonDangerContainedFocusBorderColor: string;
    export const buttonDangerContainedFocusLabelColor: string;
    export const buttonDangerContainedPressedBackgroundColor: string;
    export const buttonDangerContainedPressedBorderColor: string;
    export const buttonDangerContainedPressedLabelColor: string;
    export const buttonDangerOutlinedActiveBackgroundColor: string;
    export const buttonDangerOutlinedActiveBorderColor: string;
    export const buttonDangerOutlinedActiveLabelColor: string;
    export const buttonDangerOutlinedDisabledBackgroundColor: string;
    export const buttonDangerOutlinedDisabledBorderColor: string;
    export const buttonDangerOutlinedDisabledLabelColor: string;
    export const buttonDangerOutlinedHoverBackgroundColor: string;
    export const buttonDangerOutlinedHoverBorderColor: string;
    export const buttonDangerOutlinedHoverLabelColor: string;
    export const buttonDangerOutlinedFocusBackgroundColor: string;
    export const buttonDangerOutlinedFocusBorderColor: string;
    export const buttonDangerOutlinedFocusLabelColor: string;
    export const buttonDangerOutlinedPressedBackgroundColor: string;
    export const buttonDangerOutlinedPressedBorderColor: string;
    export const buttonDangerOutlinedPressedLabelColor: string;
    export const cardBackgroundColor: string;
    export const cardBorderColor: string;
    export const cardHeaderTitleColor: string;
    export const cardHeaderIconColor: string;
    export const cardHeaderDividerColor: string;
    export const cardBodyTextColor: string;
    export const checkboxCheckedActiveBackgroundColor: string;
    export const checkboxCheckedActiveIconColor: string;
    export const checkboxCheckedActiveLabelColor: string;
    export const checkboxCheckedActiveDescriptionColor: string;
    export const checkboxCheckedDisabledBackgroundColor: string;
    export const checkboxCheckedDisabledIconColor: string;
    export const checkboxCheckedDisabledLabelColor: string;
    export const checkboxCheckedDisabledDescriptionColor: string;
    export const checkboxCheckedHoverBackgroundColor: string;
    export const checkboxCheckedHoverIconColor: string;
    export const checkboxCheckedHoverLabelColor: string;
    export const checkboxCheckedHoverDescriptionColor: string;
    export const checkboxCheckedFocusBackgroundColor: string;
    export const checkboxCheckedFocusIconColor: string;
    export const checkboxCheckedFocusLabelColor: string;
    export const checkboxCheckedFocusDescriptionColor: string;
    export const checkboxUncheckedActiveBackgroundColor: string;
    export const checkboxUncheckedActiveBorderColor: string;
    export const checkboxUncheckedActiveLabelColor: string;
    export const checkboxUncheckedActiveDescriptionColor: string;
    export const checkboxUncheckedDisabledBackgroundColor: string;
    export const checkboxUncheckedDisabledBorderColor: string;
    export const checkboxUncheckedDisabledLabelColor: string;
    export const checkboxUncheckedDisabledDescriptionColor: string;
    export const checkboxUncheckedHoverBackgroundColor: string;
    export const checkboxUncheckedHoverBorderColor: string;
    export const checkboxUncheckedHoverLabelColor: string;
    export const checkboxUncheckedHoverDescriptionColor: string;
    export const checkboxUncheckedFocusBackgroundColor: string;
    export const checkboxUncheckedFocusBorderColor: string;
    export const checkboxUncheckedFocusLabelColor: string;
    export const checkboxUncheckedFocusDescriptionColor: string;
    export const codeTextColor: string;
    export const codeBackgroundColor: string;
    export const codeNumberTextColor: string;
    export const codeNumberBackgroundColor: string;
    export const codeNumberBorderColor: string;
    export const datePickerBorderColor: string;
    export const datePickerBackgroundColor: string;
    export const datePickerIconColor: string;
    export const datePickerTextColor: string;
    export const datePickerMonthTitleColor: string;
    export const datePickerWeekTitleColor: string;
    export const datePickerDaySelectedTextColor: string;
    export const datePickerDaySelectedBackgroundColor: string;
    export const datePickerDayHoverTextColor: string;
    export const datePickerDayHoverBackgroundColor: string;
    export const datePickerDayFocusTextColor: string;
    export const datePickerDayFocusBackgroundColor: string;
    export const datePickerDayRangeSelectedTextColor: string;
    export const datePickerDayRangeSelectedBackgroundColor: string;
    export const datePickerDayRangeHoverTextColor: string;
    export const datePickerDayRangeHoverBackgroundColor: string;
    export const datePickerDayRangeFocusTextColor: string;
    export const datePickerDayRangeFocusBackgroundColor: string;
    export const datePickerDisabledTextColor: string;
    export const dialogBackgroundColor: string;
    export const dialogHeaderTitleColor: string;
    export const dialogHeaderIconColor: string;
    export const dialogBodySubtitleColor: string;
    export const dialogBodyTextColor: string;
    export const dialogFooterDividerColor: string;
    export const dialogFooterBackgroundColor: string;
    export const discloseIconColor: string;
    export const discloseTitleColor: string;
    export const discloseTitleHoverColor: string;
    export const discloseTitleFocusColor: string;
    export const dropdownDefaultActiveBackgroundColor: string;
    export const dropdownDefaultActiveBorderColor: string;
    export const dropdownDefaultActiveLabelColor: string;
    export const dropdownDefaultActivePlaceholderColor: string;
    export const dropdownDefaultActiveNoteColor: string;
    export const dropdownDefaultActiveIconColor: string;
    export const dropdownDefaultDisabledBackgroundColor: string;
    export const dropdownDefaultDisabledBorderColor: string;
    export const dropdownDefaultDisabledLabelColor: string;
    export const dropdownDefaultDisabledPlaceholderColor: string;
    export const dropdownDefaultDisabledNoteColor: string;
    export const dropdownDefaultDisabledIconColor: string;
    export const dropdownDefaultHoverBackgroundColor: string;
    export const dropdownDefaultHoverBorderColor: string;
    export const dropdownDefaultHoverLabelColor: string;
    export const dropdownDefaultHoverPlaceholderColor: string;
    export const dropdownDefaultHoverNoteColor: string;
    export const dropdownDefaultHoverIconColor: string;
    export const dropdownDefaultFocusBackgroundColor: string;
    export const dropdownDefaultFocusBorderColor: string;
    export const dropdownDefaultFocusLabelColor: string;
    export const dropdownDefaultFocusPlaceholderColor: string;
    export const dropdownDefaultFocusNoteColor: string;
    export const dropdownDefaultFocusIconColor: string;
    export const dropdownErrorActiveBackgroundColor: string;
    export const dropdownErrorActiveBorderColor: string;
    export const dropdownErrorActiveLabelColor: string;
    export const dropdownErrorActivePlaceholderColor: string;
    export const dropdownErrorActiveNoteColor: string;
    export const dropdownErrorActiveIconColor: string;
    export const dropdownErrorDisabledBackgroundColor: string;
    export const dropdownErrorDisabledBorderColor: string;
    export const dropdownErrorDisabledLabelColor: string;
    export const dropdownErrorDisabledPlaceholderColor: string;
    export const dropdownErrorDisabledNoteColor: string;
    export const dropdownErrorDisabledIconColor: string;
    export const dropdownErrorHoverBackgroundColor: string;
    export const dropdownErrorHoverBorderColor: string;
    export const dropdownErrorHoverLabelColor: string;
    export const dropdownErrorHoverPlaceholderColor: string;
    export const dropdownErrorHoverNoteColor: string;
    export const dropdownErrorHoverIconColor: string;
    export const dropdownErrorFocusBackgroundColor: string;
    export const dropdownErrorFocusBorderColor: string;
    export const dropdownErrorFocusLabelColor: string;
    export const dropdownErrorFocusPlaceholderColor: string;
    export const dropdownErrorFocusNoteColor: string;
    export const dropdownErrorFocusIconColor: string;
    export const emptyStateTitleColor: string;
    export const emptyStateDescriptionColor: string;
    export const filterPickerBorderColor: string;
    export const filterPickerBackgroundColor: string;
    export const filterPickerSearchIconColor: string;
    export const filterPickerSearchTextColor: string;
    export const filterPickerGroupHeaderTextColor: string;
    export const filterPickerItemIconColor: string;
    export const filterPickerItemTextColor: string;
    export const filterPickerItemDescriptionTextColor: string;
    export const filterPickerItemHoverIconColor: string;
    export const filterPickerItemHoverTextColor: string;
    export const filterPickerItemHoverDescriptionColor: string;
    export const filterPickerItemFocusIconColor: string;
    export const filterPickerItemFocusTextColor: string;
    export const filterPickerItemFocusDescriptionColor: string;
    export const footerBackgroundColor: string;
    export const footerBorderColor: string;
    export const iconBaseColor: string;
    export const iconDisabledColor: string;
    export const inputDefaultActiveBackgroundColor: string;
    export const inputDefaultActiveBorderColor: string;
    export const inputDefaultActiveLabelColor: string;
    export const inputDefaultActivePlaceholderColor: string;
    export const inputDefaultActiveValueColor: string;
    export const inputDefaultActiveNoteColor: string;
    export const inputDefaultDisabledBackgroundColor: string;
    export const inputDefaultDisabledBorderColor: string;
    export const inputDefaultDisabledLabelColor: string;
    export const inputDefaultDisabledPlaceholderColor: string;
    export const inputDefaultDisabledValueColor: string;
    export const inputDefaultDisabledNoteColor: string;
    export const inputDefaultHoverBackgroundColor: string;
    export const inputDefaultHoverBorderColor: string;
    export const inputDefaultHoverLabelColor: string;
    export const inputDefaultHoverPlaceholderColor: string;
    export const inputDefaultHoverValueColor: string;
    export const inputDefaultHoverNoteColor: string;
    export const inputDefaultFocusBackgroundColor: string;
    export const inputDefaultFocusBorderColor: string;
    export const inputDefaultFocusLabelColor: string;
    export const inputDefaultFocusPlaceholderColor: string;
    export const inputDefaultFocusValueColor: string;
    export const inputDefaultFocusNoteColor: string;
    export const inputErrorActiveBackgroundColor: string;
    export const inputErrorActiveBorderColor: string;
    export const inputErrorActiveLabelColor: string;
    export const inputErrorActivePlaceholderColor: string;
    export const inputErrorActiveValueColor: string;
    export const inputErrorActiveNoteColor: string;
    export const inputErrorDisabledBackgroundColor: string;
    export const inputErrorDisabledBorderColor: string;
    export const inputErrorDisabledLabelColor: string;
    export const inputErrorDisabledPlaceholderColor: string;
    export const inputErrorDisabledValueColor: string;
    export const inputErrorDisabledNoteColor: string;
    export const inputErrorHoverBackgroundColor: string;
    export const inputErrorHoverBorderColor: string;
    export const inputErrorHoverLabelColor: string;
    export const inputErrorHoverPlaceholderColor: string;
    export const inputErrorHoverValueColor: string;
    export const inputErrorHoverNoteColor: string;
    export const inputErrorFocusBackgroundColor: string;
    export const inputErrorFocusBorderColor: string;
    export const inputErrorFocusLabelColor: string;
    export const inputErrorFocusPlaceholderColor: string;
    export const inputErrorFocusValueColor: string;
    export const inputErrorFocusNoteColor: string;
    export const inputRangeLabelColor: string;
    export const inputRangeBorderColor: string;
    export const inputRangeScaleBackgroundColor: string;
    export const inputRangeScaleFillColor: string;
    export const inputRangeHandleBackgroundColor: string;
    export const inputRangeHandleDimpleBackgroundColor: string;
    export const inputTextAreaDefaultActiveBackgroundColor: string;
    export const inputTextAreaDefaultActiveBorderColor: string;
    export const inputTextAreaDefaultActiveLabelColor: string;
    export const inputTextAreaDefaultActivePlaceholderColor: string;
    export const inputTextAreaDefaultActiveNoteColor: string;
    export const inputTextAreaDefaultHoverBackgroundColor: string;
    export const inputTextAreaDefaultHoverBorderColor: string;
    export const inputTextAreaDefaultHoverLabelColor: string;
    export const inputTextAreaDefaultHoverPlaceholderColor: string;
    export const inputTextAreaDefaultHoverNoteColor: string;
    export const inputTextAreaDefaultFocusBackgroundColor: string;
    export const inputTextAreaDefaultFocusBorderColor: string;
    export const inputTextAreaDefaultFocusLabelColor: string;
    export const inputTextAreaDefaultFocusPlaceholderColor: string;
    export const inputTextAreaDefaultFocusNoteColor: string;
    export const inputTextAreaErrorActiveBackgroundColor: string;
    export const inputTextAreaErrorActiveBorderColor: string;
    export const inputTextAreaErrorActiveLabelColor: string;
    export const inputTextAreaErrorActivePlaceholderColor: string;
    export const inputTextAreaErrorActiveNoteColor: string;
    export const inputTextAreaErrorHoverBackgroundColor: string;
    export const inputTextAreaErrorHoverBorderColor: string;
    export const inputTextAreaErrorHoverLabelColor: string;
    export const inputTextAreaErrorHoverPlaceholderColor: string;
    export const inputTextAreaErrorHoverNoteColor: string;
    export const inputTextAreaErrorFocusBackgroundColor: string;
    export const inputTextAreaErrorFocusBorderColor: string;
    export const inputTextAreaErrorFocusLabelColor: string;
    export const inputTextAreaErrorFocusPlaceholderColor: string;
    export const inputTextAreaErrorFocusNoteColor: string;
    export const inputTextAreaDisabledBackgroundColor: string;
    export const inputTextAreaDisabledBorderColor: string;
    export const inputTextAreaDisabledLabelColor: string;
    export const inputTextAreaDisabledPlaceholderColor: string;
    export const inputTextAreaDisabledNoteColor: string;
    export const linkDefaultTextColor: string;
    export const linkDefaultIconColor: string;
    export const linkDefaultDisabledTextColor: string;
    export const linkDefaultDisabledIconColor: string;
    export const linkDefaultHoverTextColor: string;
    export const linkDefaultHoverIconColor: string;
    export const linkDefaultFocusTextColor: string;
    export const linkDefaultFocusIconColor: string;
    export const linkDarkLabelColor: string;
    export const linkDarkIconColor: string;
    export const linkDarkDisabledLabelColor: string;
    export const linkDarkDisabledIconColor: string;
    export const linkDarkHoverLabelColor: string;
    export const linkDarkHoverIconColor: string;
    export const linkDarkFocusedLabelColor: string;
    export const linkDarkFocusedIconColor: string;
    export const linkMutedLabelColor: string;
    export const linkMutedIconColor: string;
    export const linkMutedDisabledLabelColor: string;
    export const linkMutedDisabledIconColor: string;
    export const linkMutedHoverLabelColor: string;
    export const linkMutedHoverIconColor: string;
    export const linkMutedFocusLabelColor: string;
    export const linkMutedFocusIconColor: string;
    export const linkBadNewsLabelColor: string;
    export const linkBadNewsIconColor: string;
    export const linkBadNewsDisabledLabelColor: string;
    export const linkBadNewsDisabledIconColor: string;
    export const linkBadNewsHoverLabelColor: string;
    export const linkBadNewsHoverIconColor: string;
    export const linkBadNewsFocusLabelColor: string;
    export const linkBadNewsFocusIconColor: string;
    export const linkReverseLabelColor: string;
    export const linkReverseIconColor: string;
    export const linkReverseDisabledLabelColor: string;
    export const linkReverseDisabledIconColor: string;
    export const linkReverseHoverLabelColor: string;
    export const linkReverseHoverIconColor: string;
    export const linkReverseFocusLabelColor: string;
    export const linkReverseFocusIconColor: string;
    export const navBarBackgroundColor: string;
    export const navBarBorderColor: string;
    export const navBarDividerColor: string;
    export const navBarProjectNameColor: string;
    export const navBarItemNameTextColor: string;
    export const navBarItemNameIconColor: string;
    export const navBarItemNameHoverTextColor: string;
    export const navBarItemNameHoverIconColor: string;
    export const navBarItemNameHoverBackgroundColor: string;
    export const navBarItemNameFocusTextColor: string;
    export const navBarItemNameFocusIconColor: string;
    export const navBarItemNameFocusBackgroundColor: string;
    export const navBarAccountTextColor: string;
    export const navBarAccountAvatarBorderColor: string;
    export const navBarAccountAvatarBackgroundColor: string;
    export const navBarAccountHoverTextColor: string;
    export const navBarAccountFocusTextColor: string;
    export const navBarCopyRightTextColor: string;
    export const paginationLinkColor: string;
    export const paginationLinkHoverColor: string;
    export const paginationLinkFocusColor: string;
    export const paginationLinkSelectedColor: string;
    export const paginationLinkDisabledColor: string;
    export const paginationLabelColor: string;
    export const pillWellBackgroundColor: string;
    export const pillWellBorderColor: string;
    export const pillPrimaryBackgroundColor: string;
    export const pillPrimaryLabelColor: string;
    export const pillPrimaryDraggableIconColor: string;
    export const pillPrimaryDismissibleIconColor: string;
    export const pillSecondaryBackgroundColor: string;
    export const pillSecondaryLabelColor: string;
    export const pillSecondaryDraggableIconColor: string;
    export const pillSecondaryDismissibleIconColor: string;
    export const pillTertiaryBackgroundColor: string;
    export const pillTertiaryLabelColor: string;
    export const pillTertiaryDraggableIconColor: string;
    export const pillTertiaryDismissibleIconColor: string;
    export const pillErrorBackgroundColor: string;
    export const pillErrorLabelColor: string;
    export const pillErrorDraggableIconColor: string;
    export const pillErrorDismissibleIconColor: string;
    export const popoverBackgroundColor: string;
    export const popoverBorderColor: string;
    export const popoverTitleColor: string;
    export const popoverTextColor: string;
    export const progressBarBackgroundColor: string;
    export const progressBarFillColor: string;
    export const progressDotsDarkColor: string;
    export const progressDotsMediumColor: string;
    export const progressDotsLightColor: string;
    export const radioButtonCheckedActiveBackgroundColor: string;
    export const radioButtonCheckedActiveIconColor: string;
    export const radioButtonCheckedActiveLabelColor: string;
    export const radioButtonCheckedActiveDescriptionColor: string;
    export const radioButtonCheckedDisabledBackgroundColor: string;
    export const radioButtonCheckedDisabledIconColor: string;
    export const radioButtonCheckedDisabledLabelColor: string;
    export const radioButtonCheckedDisabledDescriptionColor: string;
    export const radioButtonCheckedHoverBackgroundColor: string;
    export const radioButtonCheckedHoverIconColor: string;
    export const radioButtonCheckedHoverLabelColor: string;
    export const radioButtonCheckedHoverDescriptionColor: string;
    export const radioButtonCheckedFocusBackgroundColor: string;
    export const radioButtonCheckedFocusIconColor: string;
    export const radioButtonCheckedFocusLabelColor: string;
    export const radioButtonCheckedFocusDescriptionColor: string;
    export const radioButtonUncheckedActiveBackgroundColor: string;
    export const radioButtonUncheckedActiveIconColor: string;
    export const radioButtonUncheckedActiveLabelColor: string;
    export const radioButtonUncheckedActiveDescriptionColor: string;
    export const radioButtonUncheckedDisabledBackgroundColor: string;
    export const radioButtonUncheckedDisabledIconColor: string;
    export const radioButtonUncheckedDisabledLabelColor: string;
    export const radioButtonUncheckedDisabledDescriptionColor: string;
    export const radioButtonUncheckedHoverBackgroundColor: string;
    export const radioButtonUncheckedHoverIconColor: string;
    export const radioButtonUncheckedHoverLabelColor: string;
    export const radioButtonUncheckedHoverDescriptionColor: string;
    export const radioButtonUncheckedFocusBackgroundColor: string;
    export const radioButtonUncheckedFocusIconColor: string;
    export const radioButtonUncheckedFocusLabelColor: string;
    export const radioButtonUncheckedFocusDescriptionColor: string;
    export const selectActiveLabelColor: string;
    export const selectActiveRequiredColor: string;
    export const selectActiveOptionalColor: string;
    export const selectActivePlaceholderColor: string;
    export const selectActiveBorderColor: string;
    export const selectActiveIconColor: string;
    export const selectHoverLabelColor: string;
    export const selectHoverRequiredColor: string;
    export const selectHoverOptionalColor: string;
    export const selectHoverPlaceholderColor: string;
    export const selectHoverBorderColor: string;
    export const selectHoverIconColor: string;
    export const selectDisabledLabelColor: string;
    export const selectDisabledRequiredColor: string;
    export const selectDisabledOptionalColor: string;
    export const selectDisabledPlaceholderColor: string;
    export const selectDisabledBorderColor: string;
    export const selectDisabledIconColor: string;
    export const sidebarBackgroundColor: string;
    export const sidebarBorderColor: string;
    export const sidebarHeaderTextColor: string;
    export const sidebarBodyTextColor: string;
    export const spinnerBorderColor: string;
    export const spinnerHighlightColor: string;
    export const stepsCompleteTextColor: string;
    export const stepsCompleteIconBackgroundColor: string;
    export const stepsCompleteIconBorderColor: string;
    export const stepsInProgressTextColor: string;
    export const stepsInProgressIconBackgroundColor: string;
    export const stepsInProgressIconBorderColor: string;
    export const stepsNotStartedTextColor: string;
    export const stepsNotStartedIconBackgroundColor: string;
    export const stepsNotStartedIconBorderColor: string;
    export const summaryBarBorderColor: string;
    export const summaryBarHeaderTitleColor: string;
    export const summaryBarHeaderLabelColor: string;
    export const summaryBarContentTitleColor: string;
    export const summaryBarContentTextColor: string;
    export const summaryBarContentIconColor: string;
    export const summaryBarContentBadTextColor: string;
    export const summaryBarContentGoodTextColor: string;
    export const summaryBarContentNeutralTextColor: string;
    export const switchOnActiveBackgroundColor: string;
    export const switchOnActiveLabelColor: string;
    export const switchOnActiveIconColor: string;
    export const switchOnDisabledBackgorundColor: string;
    export const switchOnDisabledLabelColor: string;
    export const switchOnDisabledIconColor: string;
    export const switchOffActiveBackgroundColor: string;
    export const switchOffActiveLabelColor: string;
    export const switchOffActiveIconColor: string;
    export const switchOffDisabledBackgroundColor: string;
    export const switchOffDisabledLabelColor: string;
    export const switchOffDisabledIconColor: string;
    export const tableBackgroundColor: string;
    export const tableBorderColor: string;
    export const tableHeaderTextColor: string;
    export const tableHeaderBorderColor: string;
    export const tableHeaderIconColor: string;
    export const tableHeaderFocusTextColor: string;
    export const tableHeaderFocusIconColor: string;
    export const tableHeaderHoverTextColor: string;
    export const tableHeaderHoverIconColor: string;
    export const tableRowTextColor: string;
    export const tableRowLinkColor: string;
    export const tableRowHoverBackgroundColor: string;
    export const tableRowSelectedBackgroundColor: string;
    export const tableDiscloseBackgroundColor: string;
    export const tableDiscloseIconColor: string;
    export const tableDiscloseBorderColor: string;
    export const tableDiscloseHeaderTextColor: string;
    export const tableDiscloseHeaderBorderColor: string;
    export const tableDiscloseRowTextColor: string;
    export const tableDiscloseRowLinkColor: string;
    export const tableDiscloseRowHoverBackgroundColor: string;
    export const tableDiscloseRowSelectedBackgroundColor: string;
    export const tabsBackgroundColor: string;
    export const tabsBorderColor: string;
    export const tabsActiveTextColor: string;
    export const tabsDisabledTextColor: string;
    export const tabsHoverTextColor: string;
    export const tabsSelectedBorderColor: string;
    export const tabsSelectedTextColor: string;
    export const tileActiveBackgroundColor: string;
    export const tileActiveBorderColor: string;
    export const tileActiveTextTitleColor: string;
    export const tileActiveTextDescriptionColor: string;
    export const tileActiveTextLabelColor: string;
    export const tileActiveIconGrabColor: string;
    export const tileActiveIconAlertColor: string;
    export const tileActiveIconActionColor: string;
    export const tileHoverBackgroundColor: string;
    export const tileHoverBorderColor: string;
    export const tileHoverTextTitleColor: string;
    export const tileHoverTextDescriptionColor: string;
    export const tileHoverTextLabelColor: string;
    export const tileHoverIconGrabColor: string;
    export const tileHoverIconAlertColor: string;
    export const tileHoverIconActionColor: string;
    export const tileSelectedBackgroundColor: string;
    export const tileSelectedBorderColor: string;
    export const tileSelectedTextTitleColor: string;
    export const tileSelectedTextDescriptionColor: string;
    export const tileSelectedTextLabelColor: string;
    export const tileSelectedIconGrabColor: string;
    export const tileSelectedIconAlertColor: string;
    export const tileSelectedIconActionColor: string;
    export const tooltipBackgroundColor: string;
    export const tooltipTextColor: string;
    export const brandBlueExtraLight: string;
    export const brandBlueLight: string;
    export const brandBlueBase: string;
    export const brandBlueDark: string;
    export const brandPurpleExtraLight: string;
    export const brandPurpleLight: string;
    export const brandPurpleBase: string;
    export const brandPurpleDark: string;
    export const smokeExtraLight: string;
    export const smokeLight: string;
    export const smokeBase: string;
    export const smokeDark: string;
    export const greyExtraLight: string;
    export const greyLight: string;
    export const greyBase: string;
    export const greyDark: string;
    export const purpleExtraLight: string;
    export const purpleLight: string;
    export const purpleBase: string;
    export const purpleDark: string;
    export const magentaExtraLight: string;
    export const magentaLight: string;
    export const magentaBase: string;
    export const magentaDark: string;
    export const pinkExtraLight: string;
    export const pinkLight: string;
    export const pinkBase: string;
    export const pinkDark: string;
    export const redExtraLight: string;
    export const redLight: string;
    export const redBase: string;
    export const redDark: string;
    export const orangeExtraLight: string;
    export const orangeLight: string;
    export const orangeBase: string;
    export const orangeDark: string;
    export const yellowExtraLight: string;
    export const yellowLight: string;
    export const yellowBase: string;
    export const yellowDark: string;
    export const greenExtraLight: string;
    export const greenLight: string;
    export const greenBase: string;
    export const greenDark: string;
    export const aquaBlueExtraLight: string;
    export const aquaBlueLight: string;
    export const aquaBlueBase: string;
    export const aquaBlueDark: string;
    export const blueExtraLight: string;
    export const blueLight: string;
    export const blueBase: string;
    export const blueDark: string;
    export const neutralColorsWhite: string;
    export const neutralColorsBlack: string;
}

declare module "@optimizely/design-tokens/dist/js/typography" {
    export const letterSpacingXxs: string;
    export const letterSpacingXs: string;
    export const letterSpacingCaption: string;
    export const letterSpacingBody: string;
    export const letterSpacingHeader5: string;
    export const letterSpacingHeader4: string;
    export const letterSpacingHeader3: string;
    export const letterSpacingHeader2: string;
    export const letterSpacingHeader1: string;
    export const fontSizesXxs: string;
    export const fontSizesXs: string;
    export const fontSizesCaption: string;
    export const fontSizesBody: string;
    export const fontSizesHeader5: string;
    export const fontSizesHeader4: string;
    export const fontSizesHeader3: string;
    export const fontSizesHeader2: string;
    export const fontSizesHeader1: string;
    export const lineHeightsXxs: string;
    export const lineHeightsXs: string;
    export const lineHeightsCaption: string;
    export const lineHeightsBody: string;
    export const lineHeightsHeader5: string;
    export const lineHeightsHeader4: string;
    export const lineHeightsHeader3: string;
    export const lineHeightsHeader2: string;
    export const lineHeightsHeader1: string;
    export const fontWeightsExtraLight: string;
    export const fontWeightsLight: string;
    export const fontWeightsRegular: string;
    export const fontWeightsMedium: string;
    export const fontFamiliesInter: string;
    export const fontFamiliesFontInter: string;
    export const header1FontFamily: string;
    export const header1FontWeight: string;
    export const header1LineHeight: string;
    export const header1FontSize: string;
    export const header1LetterSpacing: string;
    export const header3FontFamily: string;
    export const header3FontWeight: string;
    export const header3LineHeight: string;
    export const header3FontSize: string;
    export const header3LetterSpacing: string;
    export const header4FontFamily: string;
    export const header4FontWeight: string;
    export const header4LineHeight: string;
    export const header4FontSize: string;
    export const header4LetterSpacing: string;
    export const captionFontFamily: string;
    export const captionFontWeight: string;
    export const captionLineHeight: string;
    export const captionFontSize: string;
    export const captionLetterSpacing: string;
    export const xsFontFamily: string;
    export const xsFontWeight: string;
    export const xsLineHeight: string;
    export const xsFontSize: string;
    export const xsLetterSpacing: string;
    export const xxsFontFamily: string;
    export const xxsFontWeight: string;
    export const xxsLineHeight: string;
    export const xxsFontSize: string;
    export const xxsLetterSpacing: string;
    export const header5FontFamily: string;
    export const header5FontWeight: string;
    export const header5LineHeight: string;
    export const header5FontSize: string;
    export const header5LetterSpacing: string;
    export const header2FontFamily: string;
    export const header2FontWeight: string;
    export const header2LineHeight: string;
    export const header2FontSize: string;
    export const header2LetterSpacing: string;
    export const bodyFontFamily: string;
    export const bodyFontWeight: string;
    export const bodyLineHeight: string;
    export const bodyFontSize: string;
    export const bodyLetterSpacing: string;
}
