import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 255, unique: true})
    username: string;
    @Column({type: 'varchar', length: 255})
    password: string;
    @Column({type: 'varchar', length: 255})
    salt: string;
}
