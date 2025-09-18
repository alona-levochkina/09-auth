export interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
}

export type AuthRequestData = Pick<User, "email"> & { password?: string };
