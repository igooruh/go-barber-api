import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';

import User from '../models/UserModel';

interface RequestAuthenticateUser {
    email: string;
    password: string;
}

interface ResponseAuthenticateUser {
    user: User
}

class AuthenticateUserService {
    public async execute({ email, password }: RequestAuthenticateUser): Promise<ResponseAuthenticateUser> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if(!user) {
            throw new Error('Incorrect email/password combination');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new Error('Incorrect email/password combination');
        }

        return {
            user
        }
    }
}

export default AuthenticateUserService;
