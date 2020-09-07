import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/UserModel';

interface UseRequest {
    name: string;
    email: string;
    password: string; 
}

class CreateUserService {
    public async execute({ name, email, password }: UseRequest): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: { email }
        });

        if(checkUserExists) {
            throw new Error('Email adress already used.');
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
