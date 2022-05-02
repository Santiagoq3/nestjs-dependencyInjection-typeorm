import { Entity,Column,PrimaryColumn } from "typeorm";

@Entity()
export class UserEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    email: string;
    

    @Column()
    password: string;
}