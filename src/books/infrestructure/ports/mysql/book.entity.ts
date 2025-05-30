import { BookI } from "src/books/domain/entities/books";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "books"})
export class Book implements BookI {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false, type: 'varchar', length: 255 })
    titulo: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    autor: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    fecha_publicacion: Date;

    @Column({ nullable: true, type: 'varchar', length: 255 })
    categoria: string;

    @Column({ nullable: true, type: 'varchar', length: 255 })
    descripcion: string;

    @Column({ nullable: true, type: 'int' })
    cantidad: number;

    @Column({ nullable: true, type: 'varchar', length: 255 })
    ubicacion: string; 
    
    @Column({ nullable: true, type: 'varchar', length: 255 })
    imagen_url?: string;

    @Column({  nullable: true, type: 'varchar', length: 255 })
    id_user?: string;
}