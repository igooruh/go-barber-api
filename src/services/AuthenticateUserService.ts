import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'; 

import User from '../models/UserModel';
import authConfig from '../config/auth';

interface RequestAuthenticateUser {
    email: string;
    password: string;
}

interface ResponseAuthenticateUser {
    userSession: User,
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: RequestAuthenticateUser): Promise<ResponseAuthenticateUser> {
        const userRepository = getRepository(User);

        const userSession = await userRepository.findOne({ where: { email } });

        if(!userSession) {
            throw new Error('Incorrect email/password combination');
        }

        const passwordMatched = await compare(password, userSession.password);

        if(!passwordMatched) {
            throw new Error('Incorrect email/password combination');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: userSession.id,
            expiresIn
        });

        return {
            userSession,
            token
        }
    }
}

export default AuthenticateUserService;
