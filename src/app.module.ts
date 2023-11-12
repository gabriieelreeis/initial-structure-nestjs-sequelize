import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module";
import { UsersService } from "./users/users.service";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "nest",
      autoLoadModels: true,
      synchronize: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 5,
      },
    ]),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
