import User from '../models/UserModel';

export default class {
    public static toDTO(user: User): any {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
    }
}
