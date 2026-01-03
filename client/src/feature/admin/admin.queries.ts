import { useQuery } from "@tanstack/react-query";
import adminServices from "../../core/services/admin.services";

export const useAdminFetchUserData = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: adminServices.getAllUser,
  });
};
