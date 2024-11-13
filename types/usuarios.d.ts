declare global {
    type ApplicationUser = {
        Id: string,
        Name: string,
        LastName: string,
        UserName: string,
        Email: string,
        PhoneNumber: string,
        AgenteAsociado?: number | null
    }

    type UserRegistration = {
        Name: string,
        LastName: string,
        Email: string,
        Password: string,
        AgenteAsociado?: number | null
    }

    type UserUpdate = {
        Id: string,
        Name: string,
        LastName: string,
        Email: string,
    }
    type UserAsociable = {
        Id: string,
        UserName:string,
        FullName: string
    }
    type ApplicationPreference<T> = {
        TipoPreferencia: string,
        Preferencia: T,
    }
}

export { ApplicationUser, UserRegistration, UserUpdate, UsersAsociables, ApplicationPreference };