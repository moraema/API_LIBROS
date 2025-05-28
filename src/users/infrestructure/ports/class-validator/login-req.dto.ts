import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { CreateBookDTOI } from "src/books/domain/dtol/create-book.dto";

export class loginReqDto  {
    @ApiProperty({
        example: 'example@gmail.com',
        description: 'Correo electronico'
    })
    @IsEmail({}, { message: 'Debe ser un correo electronico válido'})
    @IsNotEmpty({ message: 'El correo electronico es requerido'})
    email: string

    @ApiProperty({
        example: "password123",
        description: 'Contraseña del usuario'
    })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string

}