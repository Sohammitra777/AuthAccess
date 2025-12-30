import { hash } from "argon2";

const userUtils = {
    hashPassword: async (password: string) => {
        return await hash(password);
    },
};

export default userUtils;
