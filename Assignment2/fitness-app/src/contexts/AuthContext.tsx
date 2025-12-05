"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User, AuthState, LoginDto } from "@/types";
import apiService from "@/services/api";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  UserId: string;
  Role: string;
  exp: number;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "fitness_app_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const fetchUser = useCallback(async (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userId = parseInt(decoded.UserId);
      const user = await apiService.getUser(userId);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem(TOKEN_KEY);
          apiService.setToken(null);
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return;
        }

        // Set token immediately before any API calls
        apiService.setToken(storedToken);
        const user = await fetchUser(storedToken);
        setAuthState({
          user,
          token: storedToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem(TOKEN_KEY);
        apiService.setToken(null);
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      apiService.setToken(null);
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [fetchUser]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials: LoginDto) => {
    try {
      const response = await apiService.login(credentials);
      const token = response.jwt;

      if (!token) {
        throw new Error("No token received");
      }

      // Set token immediately after login
      apiService.setToken(token);
      localStorage.setItem(TOKEN_KEY, token);
      const user = await fetchUser(token);

      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    apiService.setToken(null);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const refreshUser = async () => {
    if (authState.token) {
      try {
        const user = await fetchUser(authState.token);
        setAuthState((prev) => ({ ...prev, user }));
      } catch (error) {
        console.error("Error refreshing user:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
