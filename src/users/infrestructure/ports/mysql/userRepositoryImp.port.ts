import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepositoryI } from "src/users/domain/repository/users.repository";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTOI } from "src/users/domain/dtol/create-user";
import { UserI } from "src/users/domain/entities/user";

@Injectable()
export class UserRepositoryImpl implements UserRepositoryI {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(user: CreateUserDTOI): Promise<UserI> {
        try {
            const res = await this.userRepository.save(user)
            return res
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByEmail(email: string): Promise<UserI | null> {
        try {
            const res = await this.userRepository.findOne({ where: { email } });
            return res;
        } catch (error) {
            throw new Error(error);
        }
    }
}