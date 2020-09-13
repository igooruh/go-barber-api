import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUsersService';
import UpdateUserService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import userDTO from '../mappers/UserMapper';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async(request, response) => {
    try{

        const { name, email, password } = request.body;

        const createUser = new CreateUserService();
        const userCreated = await createUser.execute({
            name,
            email,
            password
        });

        const user = userDTO.toDTO(userCreated);

        return response.json(user);
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch('/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async(request, response) => {

    try {
        const updateUserAvatar = new UpdateUserService();
        const updateUser = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });

        const user = userDTO.toDTO(updateUser);

        return response.json(user);
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
