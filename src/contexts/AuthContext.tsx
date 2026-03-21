import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api, setTokens, clearTokens } from "@/lib/api";

type UserRole = "USER" | "ADMIN";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
  ) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
  isUser: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          // CORRECTED ENDPOINT: Changed from /auth/me to /users/me
          // This matches your UsersController @Get('me')
          const userData = await api<User>("/users/me");

          if (userData.role !== "USER") {
            // If an Admin tries to use the User portal, kick them out
            clearTokens();
            setUser(null);
          } else {
            setUser(userData);
          }
        } catch (err) {
          console.error("Session restoration failed:", err);
          clearTokens();
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.user.role === "ADMIN") {
        return {
          error: { message: "Unauthorized. Please use the Admin Portal." },
        };
      }

      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
  ) => {
    try {
      const data = await api<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          name: `${firstName} ${lastName}`.trim(),
          role: "USER",
        }),
      });

      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      clearTokens();
      setUser(null);
    }
  };

  const isAdmin = () => user?.role === "ADMIN";
  const isUser = () => user?.role === "USER";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin,
        isUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
