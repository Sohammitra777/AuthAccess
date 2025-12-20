import { createContext } from "react";
import type { AuthContextType } from "../domain/auth.types";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
