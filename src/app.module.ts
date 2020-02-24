import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {TypeOrmModule} from '@nestjs/typeorm';
import {JokesModule} from "./entities/jokes.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        JokesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
