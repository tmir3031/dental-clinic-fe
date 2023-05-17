export interface RegisterDoctor {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  password?: string;
  description: string;
  specializationIds: number[];
  gender?: string;
  status?: string;
  v?: string;
}


