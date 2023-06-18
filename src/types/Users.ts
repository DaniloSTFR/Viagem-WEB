import { Positions } from './Positions';

export type Users = {
    uid?: string,
    email: string, 
    password?: string, 
    cpf: string, 
    fullName: string, 
    isAdmin: boolean,
    isActive: boolean,
    position: string | '',
    positionData?: Positions, 
    teams: string | '',
    company?: 'YTgh3NZ82IikUEnJBr9F',
}