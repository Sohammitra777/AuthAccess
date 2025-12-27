import { createContext } from "react";
import type { AuthContextType } from "./auth.types";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
