import { userApi } from "../api/user.api";

const userServices = {
    seedData: async () => {
        const result = await userApi.post("/seed");
        return result.data;
    },
    deleteUser: async (id: string) => {
        await userApi.delete("/" + id);
    },
};

export default userServices;
