"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { api } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  loginAsDemo: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = api.auth.getToken();
    const savedUser = localStorage.getItem("cvforge_user");

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore
        }
      }
      // Optionally verify with me endpoint
      api.auth.me().then((me) => {
        setUser(me);
        localStorage.setItem("cvforge_user", JSON.stringify(me));
      }).catch(() => {
        // Token might be expired or backend in offline demo mode
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await api.auth.login(email, pass);
    if (res.token) {
      setToken(res.token);
      if (res.user) {
        setUser(res.user);
        localStorage.setItem("cvforge_user", JSON.stringify(res.user));
      }
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    await api.auth.register(name, email, pass);
    await login(email, pass);
  };

  const loginAsDemo = () => {
    const demoUser: User = {
      userId: "demo-user-101",
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      role: "User",
    };
    setUser(demoUser);
    setToken("demo-jwt-token");
    localStorage.setItem("cvforge_user", JSON.stringify(demoUser));
    localStorage.setItem("cvforge_jwt", "demo-jwt-token");
  };

  const logout = () => {
    api.auth.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user || !!token,
        isLoading,
        login,
        register,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
