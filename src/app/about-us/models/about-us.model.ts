import { SpecializationDto } from "../../shared/models/specialization.model";

export interface EmployeeDto {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    specializationDetails: SpecializationDto;
    email: string;
    totalVacationDays: string;
    role: string;
    contractStartDate: string;
    v: string;
    status?: string;
  }
  