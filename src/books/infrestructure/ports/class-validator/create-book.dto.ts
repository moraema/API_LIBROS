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
    description: 'Fecha de publicación del libro',
    example: '14-05-1943',
  })
  @IsString()
  @IsNotEmpty()
  fecha_publicacion: Date;

  @ApiProperty({ 
    description: 'Categoria del libro: Terror, fantasia',
    example: 'Fantasía',
   })
  @IsString()
  categoria: string;

  @ApiProperty({
    description: 'Descripcion del libro (resumen)',
    example: 'Un piloto se estrella en el desierto del Sahara y conoce a un joven príncipe de otro planeta. El príncipe comparte sus experiencias y sabiduría, ofreciendo una perspectiva única sobre la vida y las relaciones.'
  })
  @IsString()
  descripcion: string

  @ApiProperty({
    description: 'cantidad de libros que hay',
    example: 40
  })
  @IsNumber()
  cantidad: number;

  @ApiProperty({
    description: "Ubicacion donde se encuetra el libro",
    example: 'Estante 3A, piso 2'
  })
  @IsString()
  ubicacion: string;

  @ApiProperty({
    description: 'URL de la imagen del libro',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imagen_url?: string;


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
