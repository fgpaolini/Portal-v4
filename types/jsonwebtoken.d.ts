import 'jwt-decode';

declare module 'jwt-decode' {
    export interface JwtPayload {
        role?: string;
    }
}