import React, { type ReactNode } from "react";
import { useAuth } from "./providers/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  console.log("user", user);
  return user ? children : <Navigate to="/login" />;
}
