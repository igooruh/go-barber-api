import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/UserModel';
import AppError from '../errors/AppError';

interface RequestUser {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: RequestUser): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: { email }
        });

        if(checkUserExists) {
            throw new AppError('Email adress already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(user);
        
        return user;
    }
}

export default CreateUserService;
