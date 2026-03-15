"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BrowserRouter, Link } from "react-router-dom";
import CustomRoutes from "../CustomRoutes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers() {
  const queryClient = new QueryClient();

  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ToastContainer />

        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <CustomRoutes />
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
