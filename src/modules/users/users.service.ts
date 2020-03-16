import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}
