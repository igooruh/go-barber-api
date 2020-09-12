import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import userDTO from '../mappers/UserMapper';

const sessionsRouter = Router();

sessionsRouter.post('/', async(request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { userSession, token } = await authenticateUser.execute({
            email,
            password
        });

        const user = userDTO.toDTO(userSession);

        return response.json({ user, token });
    } catch(err) {
        return response.status(400).json({ error: err.message});
    }
});

export default sessionsRouter;
