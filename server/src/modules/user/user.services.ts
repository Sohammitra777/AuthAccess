import adminRepo from "../admin/admin.repo";
import userData from "./data/userData";
import userRepo from "./user.repo";
import userUtils from "./user.util";

const userServices = {
    seedData: async () => {
        await userRepo.deleteAllUsers();

        for (const user of userData) {
            const hash = await userUtils.hashPassword(user.password);
            await userRepo.createUser(user.email, hash, user.role);
        }
    },

    deleteuser: async (userId: string) => {
        const userExist = await userRepo.checkUserbyId(userId);

        if (userExist.length < 1) {
            return {
                success: false,
                status: 400,
                message: "User does not exist",
            };
        }

        const refreshTokenExists = await userRepo.checkRefreshToken(userId);
        if (refreshTokenExists.length > 0) {
            await userRepo.removeRefreshToken(userId);
        }
        await userRepo.deleteUserById(userId);

        return {
            success: true,
            message: "User deleted successfully",
        };
    },
};

export default userServices;
