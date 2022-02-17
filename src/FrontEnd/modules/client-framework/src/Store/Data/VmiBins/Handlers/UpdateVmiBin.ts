import { ApiHandler, createHandlerChainRunner } from "@insite/client-framework/HandlerCreator";
import { ServiceResult } from "@insite/client-framework/Services/ApiService";
import { patchVmiBin, UpdateVmiBinApiParameter } from "@insite/client-framework/Services/VmiBinsService";
import { VmiBinModel } from "@insite/client-framework/Types/ApiModels";

type HandlerType = ApiHandler<UpdateVmiBinApiParameter, ServiceResult<VmiBinModel>>;

export const PopulateApiParameter: HandlerType = props => {
    props.apiParameter = { ...props.parameter };
};

export const RequestDataFromApi: HandlerType = async props => {
    props.apiResult = await patchVmiBin(props.apiParameter);
};

export const DispatchResetVmiBins: HandlerType = props => {
    if (props.apiResult.successful) {
        props.dispatch({
            type: "Data/VmiBins/Reset",
        });
    }
};

export const chain = [PopulateApiParameter, RequestDataFromApi, DispatchResetVmiBins];

const updateVmiBin = createHandlerChainRunner(chain, "UpdateVmiBin");
export default updateVmiBin;
