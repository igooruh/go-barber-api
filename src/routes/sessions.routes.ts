import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import userDTO from '../mappers/UserMapper';

const sessionsRouter = Router();

sessionsRouter.post('/', async(request, response) => {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { userSession, token } = await authenticateUser.execute({
        email,
        password
    });

    const user = userDTO.toDTO(userSession);

    return response.json({ user, token });
});

export default sessionsRouter;
