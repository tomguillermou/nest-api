import { Request } from 'express';

import { User } from 'src/users';

export interface RequestWithUser extends Request {
    user: User;
}
