import { UserDetailsDto } from 'src/app/shared/models/user.mode';

export interface AppointmentAdminDTO {
  id: number;
  date: string;
  hour: string;
  doctorDetails: UserDetailsDto;
  patientDetails: UserDetailsDto;
}
