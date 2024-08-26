import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column( { nullable: true } )
    avatar: string;

    @ManyToMany(() => Role, { eager: true })
    @JoinTable()
    roles: Role[]
}
