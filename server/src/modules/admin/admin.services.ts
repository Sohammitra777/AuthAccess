import adminRepo from "./admin.repo";
import { User } from "./admin.types";

const adminServices = {
    getUsers: async () => {
        const repoResult = await adminRepo.getUsers();

        if (repoResult.length === 0)
            return {
                success: false,
                status: 200,
                message: "No user exist",
                data: repoResult,
            };

        return {
            success: true,
            status: 200,
            message: "User array",
            data: repoResult,
        };
    },

    createUser: async (adminUser: Omit<User, "id">) => {
        const findByEmailResult = await adminRepo.findByEmail(adminUser.email);

        if (findByEmailResult.length > 0)
            return {
                success: false,
                status: 409,
                message: "User already exists",
                data: findByEmailResult[0],
            };

        const createUserResult = await adminRepo.createUser(adminUser);
        return {
            success: true,
            status: 201,
            message: "User created",
            data: createUserResult[0],
        };
    },

    updateUser: async (id: string, adminUser: Pick<User, "email" | "role">) => {
        const repoResult = await adminRepo.updateUser(id, adminUser);

        return {
            success: true,
            status: 200,
            message: "Data updated successfully",
            data: repoResult[0],
        };
    },

    deleteUser: async (id: string) => {
        const findUserById = await adminRepo.findById(id);
        if (findUserById.length === 0)
            return {
                success: false,
                status: 404,
                message: "User does not exist",
            };

        const deleteUserById = await adminRepo.deleteUser(id);

        return {
            success: true,
            status: 200,
            message: "User deleted successfully",
            data: deleteUserById[0],
        };
    },
};

export default adminServices;
