import { Router } from 'express';

import CreateUserService from '../services/CreateUsersService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import userDTO from '../mappers/UserMapper';

const usersRouter = Router();

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

usersRouter.patch('/avatar', ensureAuthenticated, async(request, response) => {
    
});

export default usersRouter;
