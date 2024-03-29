﻿module insite.vmiBin {
    "use strict";
    import VmiBinCollectionModel = Insite.Catalog.WebApi.V1.ApiModels.VmiBinCollectionModel;
    import VmiBinModel = Insite.Catalog.WebApi.V1.ApiModels.VmiBinModel;
    import VmiBinCountModel = Insite.Catalog.WebApi.V1.ApiModels.VmiBinCountModel;

    export interface ISearchFilter {
        filter?: string;
        binNumberFrom?: string;
        binNumberTo?: string;
        previousCountFromDate?: string;
        previousCountToDate?: string;
        sort?: string;
        isBelowMinimum?: boolean;
        numberOfPreviousOrders?: number;
        numberOfTimesMinQtyReached?: number;
        numberOfVisits?: number;
    }

    export interface IVmiBinCountFilter {
        isBelowMinimum?: boolean;
        numberOfPreviousOrders?: number;
        numberOfTimesMinQtyReached?: number;
        numberOfVisits?: number;
    }

    export interface IVmiBinService {
        getVmiBins(vmiLocationId: System.Guid, filter: ISearchFilter, pagination: PaginationModel): ng.IPromise<VmiBinCollectionModel>;
        getVmiBin(vmiLocationId: System.Guid, vmiBinId: System.Guid): ng.IPromise<VmiBinModel>;
        getVmiBinCount(filter: IVmiBinCountFilter): ng.IPromise<VmiBinCountModel>;
        deleteVmiBinCollection(vmiLocationId: System.Guid, vmiBins: VmiBinModel[]): ng.IPromise<VmiBinCollectionModel>;
        addVmiBinCollection(vmiLocationId: System.Guid, vmiBin: VmiBinModel[]): ng.IPromise<VmiBinCollectionModel>;
        addVmiBin(vmiBin: VmiBinModel): ng.IPromise<VmiBinModel>;
        updateVmiBin(vmiBin: VmiBinModel): ng.IPromise<VmiBinModel>;
    }

    export class VmiBinService implements IVmiBinService {
        serviceUri = "/api/v1/vmiLocations/{vmiLocationId}/bins";

        static $inject = ["$http", "httpWrapperService"];

        constructor(
            protected $http: ng.IHttpService,
            protected httpWrapperService: core.HttpWrapperService) {
        }

        getVmiBins(vmiLocationId: System.Guid, filter: ISearchFilter, pagination: PaginationModel): ng.IPromise<VmiBinCollectionModel> {
            return this.httpWrapperService.executeHttpRequest(
                this,
                this.$http({ url: this.serviceUri.replace("{vmiLocationId}", vmiLocationId.toString()), method: "GET", params: this.getVmiBinsParams(filter, pagination) }),
                this.getVmiBinsCompleted,
                this.getVmiBinsFailed
            );
        }

        protected getVmiBinsParams(filter: ISearchFilter, pagination: PaginationModel): any {
            const params: any = filter ? JSON.parse(JSON.stringify(filter)) : {};

            params.expand = "product";

            if (pagination) {
                params.page = pagination.page;
                params.pageSize = pagination.pageSize;
                if (!params.sort) {
                    params.sort = pagination.sortType;
                }
            }

            return params;
        }

        protected getVmiBinsCompleted(response: ng.IHttpPromiseCallbackArg<VmiBinCollectionModel>): void {
        }

        protected getVmiBinsFailed(error: ng.IHttpPromiseCallbackArg<any>): void {
        }

        getVmiBin(vmiLocationId: System.Guid, vmiBinId: System.Guid): ng.IPromise<VmiBinModel> {
            return this.httpWrapperService.executeHttpRequest(
                this,
                this.$http({
                    url: `${this.serviceUri.replace("{vmiLocationId}", vmiLocationId.toString())}/${vmiBinId}`,
                    method: "GET",
                    params: { expand: "product" }
                }),
                this.getVmiBinCompleted,
                this.getVmiBinFailed
            );
        }

        protected getVmiBinCompleted(response: ng.IHttpPromiseCallbackArg<VmiBinModel>): void {
        }

        protected getVmiBinFailed(error: ng.IHttpPromiseCallbackArg<any>): void {
        }

        getVmiBinCount(filter: IVmiBinCountFilter): ng.IPromise<VmiBinCountModel> {
            return this.httpWrapperService.executeHttpRequest(
                this,
                this.$http({
                    url: "api/v1/vmiBins/count",
                    method: "GET",
                    params: JSON.parse(JSON.stringify(filter))
                }),
                this.getVmiBinCountCompleted,
                this.getVmiBinCountFailed
            );
        }

        protected getVmiBinCountCompleted(response: ng.IHttpPromiseCallbackArg<VmiBinCountModel>): void {
        }

        protected getVmiBinCountFailed(error: ng.IHttpPromiseCallbackArg<any>): void {
        }

        deleteVmiBinCollection(vmiLocationId: System.Guid, vmiBins: VmiBinModel[]): ng.IPromise<VmiBinCollectionModel> {
            return this.httpWrapperService.executeHttpRequest(
                this,
                this.$http({
                    method: "DELETE",
                    url: `${this.serviceUri.replace("{vmiLocationId}", vmiLocationId.toString())}/batch`,
                    params: { ids: vmiBins.map(o => o.id) }
                }),
                this.deleteVmiBinCollectionCompleted,
                this.deleteVmiBinCollectionFailed
            );
        }

        protected deleteVmiBinCollectionCompleted(response: ng.IHttpPromiseCallbackArg<VmiBinCollectionModel>): void {
        }

        protected deleteVmiBinCollectionFailed(error: ng.IHttpPromiseCallbackArg<any>): void {
        }

        addVmiBinCollection(vmiLocationId: System.Guid, vmiBins: VmiBinModel[]): ng.IPromise<VmiBinCollectionModel> {
            return this.httpWrapperService.executeHttpRequest(
                this,
                this.$http({
                    url: `${this.serviceUri.replace("{vmiLocationId}", vmiLocationId.toString())}/batch`,
                    method: "POST",
                    data: vmiBins
                }),
                this.addVmiBinCollectionCompleted,
                this.addVmiBinCollectionFailed
            );
        }

        protected addVmiBinCollectionCompleted(response: ng.IHttpPromiseCallbackArg<VmiBinCollectionModel>): void {
        }

        protected addVmiBinCollectionFailed(error: ng.IHttpPromiseCallbackArg<any>): void {
        }

        addVmiBin(vmiBin: VmiBinModel): ng.IPromise<VmiBinModel> {
            return this.httpWrapperService.executeHttpRequest(
                this,
                this.$http({ method: "POST", url: this.serviceUri.replace("{vmiLocationId}", vmiBin.vmiLocationId.toString()), data: vmiBin }),
                this.addVmiBinCompleted,
                this.addVmiBinFailed);
        }

        protected addVmiBinCompleted(response: ng.IHttpPromiseCallbackArg<VmiBinModel>): void {
        }

        protected addVmiBinFailed(error: ng.IHttpPromiseCallbackArg<any>): void {
        }

        updateVmiBin(vmiBin: VmiBinModel): ng.IPromise<VmiBinModel> {
            return this.httpWrapperService.executeHttpRequest(
                this,
                this.$http({ method: "PATCH", url: vmiBin.uri, data: vmiBin }),
                this.updateVmiBinCompleted,
                this.updateVmiBinFailed);
        }

        protected updateVmiBinCompleted(response: ng.IHttpPromiseCallbackArg<VmiBinModel>): void {
        }

        protected updateVmiBinFailed(error: ng.IHttpPromiseCallbackArg<any>): void {
        }
    }

    angular
        .module("insite")
        .service("vmiBinService", VmiBinService);
}