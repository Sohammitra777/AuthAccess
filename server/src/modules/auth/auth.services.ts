import authRepo from "./auth.repo";

const authServices = {
    signup: async (email: string, password: string) => {
        const result = await authRepo.checkUserExist(email);

        if (result.length > 0)
            return {
                success: false,
                status: 409,
                message: "User already exist",
            };

        const createdNewUserData = await authRepo.createNewUser(
            email,
            password
        );

        return {
            success: true,
            status: 201,
            message: "signup successful",
            data: createdNewUserData[0],
        };
    },
};

export default authServices;
