import userData from "./data/userData";
import userRepo from "./user.repo";
import userUtils from "./user.util";

const userServices = {
    seedData: async () => {
        for (const user of userData) {
            const userExist = await userRepo.checkUserByEmail(user.email);

            if (userExist.length > 0) continue;
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
