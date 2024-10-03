import UserModel from './user.model';

export interface DB {
    users: typeof UserModel;
};