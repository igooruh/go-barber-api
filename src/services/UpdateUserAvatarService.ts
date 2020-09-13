import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/UserModel';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface RequestUpdateUserAvatar {
    user_id: string;
    avatarFilename: string;
}


class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: RequestUpdateUserAvatar): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if(!user) {
            throw new AppError('Only authenticated users can change avatar', 401);
        }

        validateFile(user);

        user.avatar = avatarFilename;

        await userRepository.save(user);

        return user;
    }
}

const validateFile = async({ avatar }: User) => {
    if(avatar) {
        const userAvatarFilaPath = path.join(uploadConfig.directory, avatar);
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilaPath);

        fileExists(userAvatarFileExists, userAvatarFilaPath);
    }
}

const fileExists = async(file: fs.Stats, userAvatarFilaPath: string) => {
    if(file) {
        await fs.promises.unlink(userAvatarFilaPath);
    }
}

export default UpdateUserAvatarService;
