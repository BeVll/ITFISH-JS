import { apiAuth } from "../axios";
import type { UserItem } from "../components/users/types";

export class UserService {
  public static async getUsers() {
    return await apiAuth.get("/users");
  }

  public static async deactivateUser(userId: number) {
    return await apiAuth.put(`/users/${userId}/deactivate`);
  }
  public static async activateUser(userId: number) {
    return await apiAuth.put(`/users/${userId}/activate`);
  }

  public static async changeRole(userId: number, newRoleId: number) {
    return await apiAuth.put(
      `/users/${userId}/change-role?newRoleId=${newRoleId}`
    );
  }
  public static async getRoles() {
    return await apiAuth.get("/users/roles");
  }

  public static async createUser(
    username: string,
    password: string,
    roleId: number
  ) {
    return await apiAuth.post(`/users`, {
      username: username,
      password: password,
      roleId: roleId,
    });
  }
}
