export interface CreateBookDTOI {
    titulo: string;
    autor: string;
    fecha_publicacion: Date;
    categoria: string;
    descripcion: string;
    cantidad: number;
    ubicacion: string;
    imagen_url?: string;
    id_user?: string;
}