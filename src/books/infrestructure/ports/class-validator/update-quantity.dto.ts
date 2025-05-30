import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateQuantityDto {
    @ApiProperty({
        description: 'Cantidad a agregar o quitar de libros (números negativos para quitar)',
        example: 1
    })
    @IsNumber()
    cantidad: number;
} 