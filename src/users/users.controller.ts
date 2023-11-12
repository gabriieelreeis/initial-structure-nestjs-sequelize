import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { ApiTags, ApiParam, ApiBody, ApiOkResponse } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
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

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

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
  findOne(@Param("id") id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  @ApiParam({ name: "id" })
  remove(@Param("id") id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
