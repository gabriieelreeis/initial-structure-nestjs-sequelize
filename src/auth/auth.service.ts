import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
@Dependencies(UsersService)
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneBy({ email, password: pass });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: `${user.firstName} ${user.lastName}`,
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
