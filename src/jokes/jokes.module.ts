import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {Flag} from "./entities/flag.entity";
import {JokesController} from "./jokes.controller";
import {JokesService} from "./jokes.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Flag])
    ],
    controllers: [JokesController],
    providers: [JokesService],
})
export class JokesModule {
}