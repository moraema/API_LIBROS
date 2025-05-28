import { CreateUserDTOI } from "../dtol/create-user";
import { UserI } from "../entities/user";

export interface UserRepositoryI {
    createUser(user: CreateUserDTOI): Promise<UserI>;
    getByEmail(email: string): Promise<UserI | null>;
}