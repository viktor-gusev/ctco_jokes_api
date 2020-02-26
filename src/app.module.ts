import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {JokesModule} from "./jokes/jokes.module";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        JokesModule,
        AuthModule,
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
