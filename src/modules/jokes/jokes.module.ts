import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Flag } from "./entities/flag.entity";
import { JokesController } from "./jokes.controller";
import { JokesService } from "./jokes.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Flag]), AuthModule],
  controllers: [JokesController],
  providers: [JokesService]
})
export class JokesModule {}
