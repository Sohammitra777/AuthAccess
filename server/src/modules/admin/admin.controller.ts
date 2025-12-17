import { Request, Response } from "express";
import adminServices from "./admin.services";
import utils from "../../shared/shared.util";

const adminController = {
    getUsers: async (req: Request, res: Response) => {
        const serviceResult = await adminServices.getUsers();
        utils.success(res, serviceResult, serviceResult.status);
    },

    createUser: async (req: Request, res: Response) => {
        const serviceResult = await adminServices.createUser(req.body);

        if (!serviceResult.success)
            return utils.error(
                res,
                { message: serviceResult.message, user: serviceResult.data },
                serviceResult.status
            );

        utils.success(
            res,
            { message: serviceResult.message, user: serviceResult.data },
            serviceResult.status
        );
    },

    updateUser: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const serviceResult = await adminServices.updateUser(id, req.body);

        utils.success(
            res,
            { message: serviceResult.message, user: serviceResult.data },
            serviceResult.status
        );
    },

    deleteUser: async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const serviceResult = await adminServices.deleteUser(id);
        if (!serviceResult.success)
            return utils.error(
                res,
                { message: serviceResult.message },
                serviceResult.status
            );

        utils.success(
            res,
            { message: serviceResult.message, user: serviceResult.data },
            serviceResult.status
        );
    },
};

export default adminController;
