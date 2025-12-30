import { userApi } from "../api/user.api";

const userServices = {
    deleteUser: async (id: string) => {
        await userApi.delete("/" + id);
    },
};

export default userServices;
