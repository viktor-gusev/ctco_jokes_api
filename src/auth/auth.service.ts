import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/user.entity";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user: User = await this.usersService.findOne(username);
        const isValid = await this.comparePassword(user, pass);
        if (isValid) {
            const {password, salt, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.userId};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async comparePassword(user: User, password: string): Promise<boolean> {
        if (!user || !password)
            return false;
        const result = await bcrypt.compare(password + user.salt, user.password);
        return result;
    }
}
