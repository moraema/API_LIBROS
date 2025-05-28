import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./ports/mysql/user.entity";
import { SecurityModule } from "src/share/security/infrestructure/security.module";
import { UsersController } from "./controllers/users.controllers";
import { UserService } from "../application/service/user.service";
import { UserRepositoryImpl } from "./ports/mysql/userRepositoryImp.port";

@Module({
    imports: [TypeOrmModule.forFeature([User]), SecurityModule],
    controllers: [UsersController],
    providers: [UserService, UserRepositoryImpl],
})
export class UserModule {} 