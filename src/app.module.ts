import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {JokesModule} from "./jokes/jokes.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        JokesModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
