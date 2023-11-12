import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      isActive: createUserDto.isActive,
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userModel.findAll();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userModel.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async findOneBy(data: {}): Promise<User> {
    const user: User = await this.userModel.findOne({
      where: data,
    });
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
