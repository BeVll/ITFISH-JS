import { api } from "../axios";
import type { LoginResponse } from "./types";

export class AuthService {
  public static async login(username: string, password: string) {
    return await api.post<LoginResponse>("/auth/login", { username, password });
  }

  public static async register(username: string, password: string) {
    return await api.post("/auth/register", { username, password });
  }
}
