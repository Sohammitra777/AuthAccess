import { hash } from "argon2";

const authUtils = {
    hashPassword: async (password: string) => {
        return await hash(password);
    },
};

export default authUtils; 
