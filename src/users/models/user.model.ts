import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column
  @ApiProperty()
  firstName: string;

  @Column
  @ApiProperty()
  lastName: string;

  @Column
  @ApiProperty()
  email: string;

  @Column
  @ApiProperty()
  password: string;

  @Column({ defaultValue: true })
  @ApiProperty({ default: true })
  isActive: boolean;
}
