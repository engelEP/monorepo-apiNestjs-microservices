import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

@Entity()
export class Asset {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    controller: string;

    @ManyToMany(() => Role, { eager: true })
    @JoinTable()
    roles: Role[]
}
