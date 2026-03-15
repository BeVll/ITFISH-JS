export interface UserItem {
  id: number;
  username: string;
  role?: {
    id: number;
    name: string;
  };
  isActive: boolean;
}

export interface EditUserRoleRequest {
  newRoleId: number;
}

export interface RoleItem {
  id: number;
  name: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  confirmPassword: string;
  roleId: number;
}
