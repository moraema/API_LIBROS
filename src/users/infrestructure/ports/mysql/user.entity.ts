import { UserI } from "src/users/domain/entities/user";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User implements UserI {
    @PrimaryGeneratedColumn('uuid')
    id: string;
 
    @Column({ nullable: false, type: 'varchar', length: 255 })
    email: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    password: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    name: string;

    @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;
}