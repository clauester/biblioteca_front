import { Libro } from "src/app/interfaces/Libro";
import { Usuario } from "./Usuario";

export interface Prestamo{
    id?: number,
    libro: Libro,
    usuario: Usuario,
    fecha_prestamo: Date
    fecha_devolucion: Date,
    estado: string
}