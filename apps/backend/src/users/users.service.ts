
import { Injectable } from '@nestjs/common';
import { User } from '../schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encodePassword } from '../utils/bcrypt';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    async createUser(user) {
        const hash = encodePassword(user.password);
        const newUser = new this.userModel({ ...user, hash });
        await newUser.save()
        return newUser;
    }

    async findOne(username: string) {
        return this.userModel.find(user => user.username === username);
    }
}
