import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LogService {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    date: Date
}

