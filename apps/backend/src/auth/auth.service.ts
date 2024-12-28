
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../schemas/User.schema';
import { verifyPassword } from '../utils/bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,  private jwtService: JwtService) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ username });
        if (user && verifyPassword(pass, user.hash)) {
            const payload = { sub: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email };
            const accessToken = await this.jwtService.signAsync(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException();
        }
    }
}
