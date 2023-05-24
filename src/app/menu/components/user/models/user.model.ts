export interface UserAccountDto{
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    role: string
}

export interface UserFilter{
    search: string,
    role: string
}