import { UserDetailsDto } from 'src/app/shared/models/user.mode';

export interface TreatmentDetailsDTO {
  date: string;
  treatment: string;
  doctorDetails: UserDetailsDto;
}
