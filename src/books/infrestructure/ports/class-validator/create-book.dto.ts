import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBookDTOI } from 'src/books/domain/dtol/create-book.dto';


export class CreateBookDto implements CreateBookDTOI {
  @ApiProperty({
    description: 'Título del libro',
    example: 'El Principito',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    description: 'Autor del libro',
    example: 'Antoine de Saint-Exupéry',
  })
  @IsString()
  @IsNotEmpty()
  autor: string;

  @ApiProperty({
    description: 'Estado del libro (ej. "Leído", "Por leer", "Leyendo")',
    example: 'Leído',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'URL de la imagen del libro',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imagen_url?: string;

  @ApiProperty({ 
    description: 'Notas sobre el libro',
    example: 'Un libro fascinante sobre la vida y la amistad.',
    required: false,
   })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;

  @ApiProperty({
    description: 'ID del usuario que creó el libro',
    example: '624fa3f7-fef7-4a68-97af-6ca1298cef62',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() =>  String)
  id_user: string;
}
