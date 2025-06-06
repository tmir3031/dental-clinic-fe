import { SpecializationDto } from './specialization.model';

export interface DoctorDto {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status?: string;
  v: string;
  gender?: string;
  description: string;
  specializationDetailsListItem: SpecializationDto[];
}
