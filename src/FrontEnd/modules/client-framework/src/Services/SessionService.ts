import { get, patch, ApiParameter, del, ServiceResult } from "@insite/client-framework/Services/ApiService";
import { BillToModel, SessionModel, ShipToModel } from "@insite/client-framework/Types/ApiModels";
import { fetch } from "@insite/client-framework/ServerSideRendering";

export interface UpdateSessionApiParameter extends ApiParameter {
    session: Partial<Session>;
}

export interface GetSessionApiParameter extends ApiParameter {
}

export interface ForgotPasswordApiParameter extends ApiParameter {
    userName: string;
}

export interface ResetPasswordApiParameter extends ApiParameter {
    userName: string,
    newPassword: string,
    resetToken: string,
}

export interface CreateSessionApiParameter {
    userName: string;
    password: string;
    rememberMe: boolean;
    returnUrl?: string | undefined;
    isGuest?: boolean;
    accessToken: string;
}

export type Session = Omit<SessionModel, "billTo" | "shipTo"> & {
    billToId?: string;
    shipToId?: string;
};

const sessionsUrl = "/api/v1/sessions";

export async function createSession(parameter: CreateSessionApiParameter): Promise<ServiceResult<Session>> {
    const { accessToken, ...otherProps } = parameter;

    const response = await fetch(sessionsUrl, {
        method: "POST",
        headers: {
            // tslint:disable-next-line:prefer-template
            authorization: `Bearer ${parameter.accessToken}`,
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(otherProps),
    });

    if (response.status < 200 || response.status >= 300) {
        let errorMessage: string;
        let errorJson: any;
        if (response.headers.get("Content-Type")?.startsWith("application/json")) {
            errorJson = await response.json() as { message: string };
            errorMessage = errorJson.message;
        } else {
            errorMessage = await response.text();
        }
        return {
            successful: false,
            errorMessage,
        };
    }

    const sessionModel = await (response.json() as Promise<SessionModel>);
    cleanSession(sessionModel);
    return {
        successful: true,
        result: sessionModel,
    };
}

export async function getSession(parameter: GetSessionApiParameter) {
    const session = await get<SessionModel>("/api/v1/sessions/current", parameter);
    cleanSession(session);
    return session;
}

export async function updateSession(parameter: UpdateSessionApiParameter) {
    const patchedSession = {
        ...parameter.session,
    };
    if (patchedSession.billToId) {
        (patchedSession as SessionModel).billTo = { id: patchedSession.billToId } as BillToModel;
        delete patchedSession.billToId;
    }
    if (patchedSession.shipToId) {
        (patchedSession as SessionModel).shipTo = { id: patchedSession.shipToId } as ShipToModel;
        delete patchedSession.shipToId;
    }
    const session = await patch<SessionModel>("/api/v1/sessions/current", patchedSession);
    cleanSession(session);
    return session;
}

export async function forgotPassword(parameter: ForgotPasswordApiParameter): Promise<ServiceResult<Session>> {
    try {
        const session = await patch<SessionModel>("/api/v1/sessions/current", {
            ...parameter,
            resetPassword: true,
        });
        cleanSession(session);
        return {
            successful: true,
            result: session,
        };
    } catch (error) {
        if ("status" in error && error.status === 400 && error.errorJson && error.errorJson.message) {
            return {
                successful: false,
                errorMessage: error.errorJson.message,
            };
        }
        throw error;
    }
}

export async function resetPassword(parameter: ResetPasswordApiParameter): Promise<ServiceResult<Session>> {
    try {
        const session = await patch<SessionModel>("/api/v1/sessions/current", {
            ...parameter,
            resetPassword: true,
        });
        cleanSession(session);
        return {
            successful: true,
            result: session,
        };
    } catch (error) {
        if ("status" in error && error.status === 400 && error.errorJson && error.errorJson.message) {
            return {
                successful: false,
                errorMessage: error.errorJson.message,
            };
        }
        throw error;
    }
}

export function deleteSession() {
    return del("/api/v1/sessions/current", status => status === 204 || status === 401);
}

function cleanSession(session: SessionModel) {
    if (session.billTo) {
        (session as Session).billToId = session.billTo.id;
        delete session.billTo;
    }

    if (session.shipTo) {
        (session as Session).shipToId = session.shipTo.id;
        delete session.shipTo;
    }
}