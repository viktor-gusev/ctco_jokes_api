import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { JokesModule } from "./modules/jokes/jokes.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [TypeOrmModule.forRoot(), JokesModule, AuthModule, UsersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
