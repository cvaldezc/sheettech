export interface IAuthGuard {
    sub: { auth: string, isAdmin: string };
    iat: string,
    exp: number
}