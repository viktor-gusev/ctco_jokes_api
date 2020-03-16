import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", length: 255 })
  name: string;
  @Column({ type: "boolean", default: false, name: "is_banned" })
  isBanned: boolean;
}
