import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {Category} from "./category.entity";
import {Flag} from "./flag.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Flag])
    ],
    controllers: [],
    providers: [],
})
export class JokesModule {
}
