import { Rol } from "./Rol";

export interface Usuario{
    id: number,
    cedula?: string,
    nombres?: string,
    apellidos?: string,
    correo_electronico?: string,
    rol?: Rol
}