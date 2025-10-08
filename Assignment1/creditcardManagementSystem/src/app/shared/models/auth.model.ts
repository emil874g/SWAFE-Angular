export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
}

export interface GroupRegistration {
  prefix: string;
  groupNumber: number;
}
