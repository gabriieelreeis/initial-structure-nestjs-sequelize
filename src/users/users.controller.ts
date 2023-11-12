import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import {
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      type: "User",
      example: {
        isActive: true,
        id: 2,
        firstName: "Usuário",
        lastName: "Teste",
        updatedAt: "2023-11-11T03:26:15.372Z",
        createdAt: "2023-11-11T03:26:15.372Z",
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  async findAll(): Promise<User[]> {
    var users: User[] = await this.usersService.findAll();

    users = users.map((user) => {
      const { password, ...userData } = user.dataValues || user;
      return userData;
    }) as User[];

    return users;
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiParam({ name: "id" })
  @ApiOkResponse({
    schema: {
      example: {
        isActive: true,
        id: 2,
        firstName: "Usuário",
        lastName: "Teste",
        updatedAt: "2023-11-11T03:26:15.372Z",
        createdAt: "2023-11-11T03:26:15.372Z",
      },
    },
  })
  @ApiBearerAuth()
  async findOne(@Param("id") id: number): Promise<User> {
    const user: User = await this.usersService.findOne(id);

    const { password, ...userData } = user.dataValues || user;

    return userData;
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiParam({ name: "id" })
  @ApiBearerAuth()
  remove(@Param("id") id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
