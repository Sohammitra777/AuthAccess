import { Response } from "express";
import { AuthFailureResponse, AuthSuccessResponse } from "./auth.types";
import utils from "../../shared/shared.util";

const authResponse = {
    success: (res: Response, payload: AuthSuccessResponse, status: number) => {
        return utils.success<AuthSuccessResponse>(res, payload, status);
    },

    error: (res: Response, payload: AuthFailureResponse, status: number) => {
        return utils.error<AuthFailureResponse>(res, payload, status);
    },
};

export default authResponse;
