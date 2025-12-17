import { Response } from "express";

const utils = {
    success: (res: Response, payload: object, status: number = 200) => {
        res.status(status).json({
            success: true,
            ...payload,
        });
    },

    error: (res: Response, payload: object, status: number = 400) => {
        return res.status(status).json({
            success: false,
            ...payload,
        });
    },
};

export default utils;
