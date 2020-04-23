import { Handler, createHandlerChainRunner } from "@insite/client-framework/HandlerCreator";

type HandlerType = Handler<void>;

export const ClearFormErrors: HandlerType = props => {
    props.dispatch({
        type: "Pages/CheckoutShipping/SetShippingAddressFormErrors",
        formErrors: {},
    });
};

export const chain = [
    ClearFormErrors,
];

const resetShippingAddressFormValidation = createHandlerChainRunner(chain, "ResetShippingAddressFormValidation");
export default resetShippingAddressFormValidation;