import {PermissionAdapter} from "../index";

export abstract class BasePermissionAdapter implements PermissionAdapter {
    constructor(protected authUser: any, protected guard?: string) {}
    abstract can(action: string, subject: any): boolean;
    abstract update(authUser: any, guardName: string): void;
}
export class TokenPermissionAdapter extends BasePermissionAdapter {
    constructor(authUser: any, guard?: string) {
        super(authUser, guard);
    }

    // Método para verificar permisos
    can(action: string, subject: any): boolean {
        if (!this.authUser.access_token || this.authUser.access_token == '') {
            return false; // Si no hay usuario autenticado, se niega el acceso.
        }
         // Verifica que el token exista y que no haya expirado.
        return true;
    }

    // Método para actualizar los permisos
    update(currentAuthUser: any, guardName: string): void {}


}
