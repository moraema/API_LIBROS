import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { UserRepositoryI } from "src/users/domain/repository/users.repository";
import { CreateUserDto } from "src/users/infrestructure/ports/class-validator/user-create.dto";
import { UserRepositoryImpl } from "src/users/infrestructure/ports/mysql/userRepositoryImp.port";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "src/users/infrestructure/ports/class-validator/update-user.dto";
import { TokenRepositoryImp } from "src/share/security/infrestructure/jwt/tokenRepository.imp";
import { TokenRepositoryI } from "src/share/security/domain/repository/token.repository";

@Injectable()
export class UserService {
    constructor (
        @Inject(UserRepositoryImpl)
        private readonly _userRepository: UserRepositoryI,
        @Inject(TokenRepositoryImp)
        private readonly _tokenRepository: TokenRepositoryI,
    ) {}

    async createUser(createUser: CreateUserDto){
        try {
            const isExistingUser = await this._userRepository.getByEmail(
               createUser.email,
            );
            if (isExistingUser) {
                throw new ConflictException("El correo ya existe");
            }
            const password = createUser.password;
            const hashedPassword = await this.hasPassword(password);

            const reqUserDto: CreateUserDto = {
                ...createUser,
                password: hashedPassword,
            };
            const res = await this._userRepository.createUser(reqUserDto);
            return res;
        } catch (error) {
            const status = error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

            throw new HttpException(
                error.message || 'Internal en el server',
                status
            )
        }
    }

    async login(userReq: UpdateUserDto) {
        try {
            const { email, password } = userReq;
            if (!email || !password) {
                throw new NotAcceptableException('Credenciales incompletas');
            }
            const user = await this._userRepository.getByEmail(email);
            if (!user) {
                throw new NotAcceptableException('Credenciales incorrectas');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new NotAcceptableException('Credenciales incorrectas');
            }

            const payload = {
             id: user.id,
             name: user.name,
            };

            const token = await this._tokenRepository.sign(payload)

            return {
                id: user.id,
                name: user.name,
                token,
            };
        } catch (error) {
            throw new HttpException(
                error,
                error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }


    private async hasPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
}