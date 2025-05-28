import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDTOI } from "src/users/domain/dtol/create-user";

export class CreateUserDto implements CreateUserDTOI {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'example@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'John',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}