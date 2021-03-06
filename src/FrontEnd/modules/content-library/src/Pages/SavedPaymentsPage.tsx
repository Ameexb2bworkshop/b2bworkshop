import AsyncComponent from "@insite/client-framework/Components/AsyncComponent";
import Zone from "@insite/client-framework/Components/Zone";
import { GetPaymentProfilesApiParameter } from "@insite/client-framework/Services/AccountService";
import ApplicationState from "@insite/client-framework/Store/ApplicationState";
import { getCurrentCountries } from "@insite/client-framework/Store/Data/Countries/CountriesSelectors";
import loadCurrentCountries from "@insite/client-framework/Store/Data/Countries/Handlers/LoadCurrentCountries";
import loadPaymentProfiles from "@insite/client-framework/Store/Data/PaymentProfiles/Handlers/LoadPaymentProfiles";
import { getPaymentProfilesDataView } from "@insite/client-framework/Store/Data/PaymentProfiles/PaymentProfilesSelectors";
import PageModule from "@insite/client-framework/Types/PageModule";
import PageProps from "@insite/client-framework/Types/PageProps";
import Page from "@insite/mobius/Page";
import * as React from "react";
import { connect, ResolveThunks } from "react-redux";

const mapStateToProps = (state: ApplicationState) => ({
    countries: getCurrentCountries(state),
    paymentProfilesDataView: getPaymentProfilesDataView(state, parameter),
});

const mapDispatchToProps = {
    loadCurrentCountries,
    loadPaymentProfiles,
};

type Props = PageProps & ResolveThunks<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

const parameter: GetPaymentProfilesApiParameter = { pageSize: 999 };

class SavedPaymentsPage extends React.Component<Props> {
    componentDidMount() {
        if (!this.props.countries) {
            this.props.loadCurrentCountries();
        }

        this.loadPaymentProfilesIfNeeded();
    }

    componentDidUpdate(): void {
        this.loadPaymentProfilesIfNeeded();
    }

    loadPaymentProfilesIfNeeded = () => {
        if (!this.props.paymentProfilesDataView.value && !this.props.paymentProfilesDataView.isLoading) {
            this.props.loadPaymentProfiles(parameter);
        }
    };

    render() {
        return (
            <Page>
                <PaymentProfilesContext.Provider value={this.props.paymentProfilesDataView}>
                    <Zone contentId={this.props.id} zoneName="Content" />
                    {this.props.countries && (
                        <AsyncComponent isWidget={true} type="SavedPayments/SavedPaymentsEditCardModal" />
                    )}
                </PaymentProfilesContext.Provider>
            </Page>
        );
    }
}

export const PaymentProfilesContext = React.createContext<ReturnType<typeof getPaymentProfilesDataView>>(
    {} as ReturnType<typeof getPaymentProfilesDataView>,
);

const pageModule: PageModule = {
    component: connect(mapStateToProps, mapDispatchToProps)(SavedPaymentsPage),
    definition: {
        hasEditableUrlSegment: true,
        hasEditableTitle: true,
        pageType: "System",
    },
};

export default pageModule;

/**
 * @deprecated Use string literal "SavedPaymentsPage" instead of this constant.
 */
export const SavedPaymentsPageContext = "SavedPaymentsPage";
