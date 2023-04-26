import { UserDetailsDto } from "./user.mode";

export interface AppointmentDto {
    id?: number;
    crtTms: string;
    mdfUsr: string;
    mdfTms: string;
    date: string;
    hour: string;
    status?: string;
    v: string;
    doctorDetails: UserDetailsDto;
    patientDetails: UserDetailsDto;
  }

  export interface AppointmentRequest{
    date?: string;
    hour?: string;
    doctorId?: string;
  }
