import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JokesModule } from "./modules/jokes/jokes.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: __dirname + "../.env"
    }),
    JokesModule,
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
