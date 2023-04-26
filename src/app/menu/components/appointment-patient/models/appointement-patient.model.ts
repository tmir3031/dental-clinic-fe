import { UserDetailsDto } from "src/app/shared/models/user.mode"

export interface AppointmentPatientDTO{
        id: number,
        crtTms: string,
        mdfUsr: string,
        mdfTms: string,
        date: string,
        hour: string,
        status: string,
        treatment: string,
        v: number,
        doctorDetails: UserDetailsDto,
        patientDetails: UserDetailsDto        
    
}
