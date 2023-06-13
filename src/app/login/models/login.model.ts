export enum Role {
  ADMIN = 'ROLE_ADMIN',
  DOCTOR = 'ROLE_DOCTOR',
  USER = 'ROLE_USER',
}
export interface User {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  refreshTokenExpiresIn: string;
  userDetails: {
    role: Role;
    username: string;
    userId: string;
  };
}
