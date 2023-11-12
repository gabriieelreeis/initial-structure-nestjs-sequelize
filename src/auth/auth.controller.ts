import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiParam, ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("token")
  @ApiOkResponse({
    schema: {
      example: {
        access_token: "Bearer",
      },
    },
  })
  async signIn(
    @Body() signIn: { email: string; password: string }
  ): Promise<{ access_token: string }> {
    const auth: { access_token: string } = await this.authService.signIn(
      signIn.email,
      signIn.password
    );
    return auth;
  }
}
