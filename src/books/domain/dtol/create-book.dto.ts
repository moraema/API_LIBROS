export interface CreateBookDTOI {
    titulo: string;
    autor: string;
    status: string;
    imagen_url?: string;
    notes?: string;
    id_user?: string;
}