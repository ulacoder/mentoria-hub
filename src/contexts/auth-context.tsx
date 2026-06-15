"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  grade: string;
  interests: string[];
  coins: number;
  rank: number;
  role: "student" | "mentor" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, grade: string, interests: string[], role: "student" | "mentor" | "admin") => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user session
    const storedUser = localStorage.getItem("mentoria_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("mentoria_user");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string,
    grade: string,
    interests: string[],
    role: "student" | "mentor" | "admin"
  ): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
      const userExists = existingUsers.some((u: any) => u.email === email);

      if (userExists) {
        return false; // User already exists
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        grade,
        interests,
        coins: 100, // Starting coins
        rank: 0,
        role,
      };

      // Store user credentials (in real app, this would be hashed on backend)
      const userCredentials = {
        email,
        password, // In production, this should be hashed
        userId: newUser.id,
      };

      existingUsers.push(userCredentials);
      localStorage.setItem("mentoria_users", JSON.stringify(existingUsers));

      // Store user profile separately
      const userProfiles = JSON.parse(localStorage.getItem("mentoria_user_profiles") || "{}");
      userProfiles[newUser.id] = newUser;
      localStorage.setItem("mentoria_user_profiles", JSON.stringify(userProfiles));

      // Set current user
      setUser(newUser);
      localStorage.setItem("mentoria_user", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
      const userCredential = existingUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!userCredential) {
        return false; // Invalid credentials
      }

      // Retrieve user profile
      const userProfiles = JSON.parse(localStorage.getItem("mentoria_user_profiles") || "{}");
      const userProfile = userProfiles[userCredential.userId];

      if (!userProfile) {
        return false; // Profile not found
      }

      setUser(userProfile);
      localStorage.setItem("mentoria_user", JSON.stringify(userProfile));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mentoria_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("mentoria_user", JSON.stringify(updatedUser));

    // Update user profile in storage
    const userProfiles = JSON.parse(localStorage.getItem("mentoria_user_profiles") || "{}");
    userProfiles[user.id] = updatedUser;
    localStorage.setItem("mentoria_user_profiles", JSON.stringify(userProfiles));
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
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
