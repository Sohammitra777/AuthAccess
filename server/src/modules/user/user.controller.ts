import { Request, Response } from "express";
import userServices from "./user.services";
import utils from "../../shared/shared.util";

const userController = {
    
    seedData: async (req: Request, res: Response) => {
        await userServices.seedData();
        utils.success(res, { message: "seeding complete" });
    },

    deleteUser: async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await userServices.deleteuser(id);

        if (!result.success)
            utils.error(res, { message: result.message }, result.status);

        utils.success(res, { message: result.message });
    },
};

export default userController;
