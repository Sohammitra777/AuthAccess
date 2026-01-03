import { adminApi } from "../api/admin.api";

type ApiSuccess = {
  success: true;
  message: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
};

export type User = {
  id: string;
  email: string;
  password: string;
  role: string;
};

const adminServices = {
  getAllUser: async (): Promise<User[]> => {
    const result = await adminApi.get("/users");
    const users = result.data;
    return users.data;
  },

  createNewAdminOrUser: async (user: Omit<User, "id">): Promise<ApiSuccess> => {
    const { email, password, role } = user;
    const result = await adminApi.post("/users", { email, password, role });
    return result.data;
  },

  updateUser: async (
    id: string,
    user?: Partial<User>,
  ): Promise<ApiSuccess | null> => {
    if (!user) return null;

    const { email, password, role } = user;

    const payload = {
      ...(email !== undefined && { email }),
      ...(password !== undefined && { password }),
      ...(role !== undefined && { role }),
    };

    const result = await adminApi.put(`/users/${id}`, payload);
    return result.data;
  },

  deleteUser: async (id: string): Promise<ApiSuccess> => {
    const result = await adminApi.delete(`/users/${id}`);
    return result.data;
  },
};

export default adminServices;
