export interface Item {
    label: string;
    status: boolean;
}

export interface PatientDTO{
    id?: string;
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: string,
    password: string,
    allergies: string,
    phone: string,
    diseases: string,
    dateOfBirth: string
    status?: string;
    v: string;
}
