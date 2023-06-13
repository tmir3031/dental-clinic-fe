export interface Item {
  label: string;
  status: boolean;
}

export interface PatientDTO {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  password: string;
  allergies: string;
  phone: string;
  chronicDiseases: string;
  dateOfBirth: string;
  gender?: string;
  status?: string;
  v: string;
}

export interface UpdatePatientDTO {
  firstName: string;
  lastName: string;
  allergies?: string;
  phone?: string;
  chronicDiseases?: string;
  gender?: string;
  v?: number;
}
