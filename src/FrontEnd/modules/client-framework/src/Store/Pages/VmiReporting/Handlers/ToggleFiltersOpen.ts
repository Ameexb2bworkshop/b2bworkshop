import { createHandlerChainRunnerOptionalParameter, Handler } from "@insite/client-framework/HandlerCreator";

export const ToggleOrdersFilter: Handler = props => {
    props.dispatch({
        type: "Pages/VmiReporting/ToggleFiltersOpen",
    });
};

export const chain = [ToggleOrdersFilter];

const toggleFiltersOpen = createHandlerChainRunnerOptionalParameter(chain, {}, "ToggleFiltersOpen");
export default toggleFiltersOpen;
