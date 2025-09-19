export interface User {
  email: string;
  username: string;
  avatar: string;
}

export type AuthRequestData = Pick<User, "email"> & { password: string };
