
import { Users } from './Users';

export type Teams = {
    uid?: string,
    nameTeams: string, 
    descriptionTeams: string, 
    teamEmployeesUsers?: Users[],
    teamEmployees: string[];
    company: string,
}