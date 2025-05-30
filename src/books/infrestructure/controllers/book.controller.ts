import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookService } from "src/books/application/service/book.service";
import { CreateBookDto } from "../ports/class-validator/create-book.dto";
import { UpdateBookDto } from "../ports/class-validator/update-book.dto";
import { UpdateQuantityDto } from "../ports/class-validator/update-quantity.dto";
import { SecurityModule } from "src/share/security/infrestructure/security.module";
import { SecurityGuard } from "src/share/security/application/guards/security.guard";

@UseGuards(SecurityGuard)
@ApiTags('Books')
@ApiBearerAuth('JWT-auth')
@Controller('books')
export class BookController {
    constructor(
        @Inject(BookService) private readonly bookService: BookService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo libro'})
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Libro creado exitosamente' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado'})
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de libros' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado'})
    @ApiOperation({ summary: 'Obtener los libros por id'})
    finOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookService.findOne(id);
    }

    @Get('user/:id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Libro encontrado' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Libro no encontrado' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado'})
    @ApiOperation({ summary: 'Obtener los libors por el usuario'})
    finOneByUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookService.findByUserId(id);
    }

    @Patch(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Libro actualizado exitosamente' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Libro no encontrado' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado'})
    @ApiOperation({ summary: 'Actualizar datos del libro'})
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBookDto: UpdateBookDto,
    ) {
        return this.bookService.update(id, updateBookDto);
    }

    @Patch('quantity/:id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Cantidad de libros actualizada exitosamente' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Libro no encontrado' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado'})
    @ApiOperation({ summary: 'Actualizar cantidad de libros'})
    updateQuantity(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateQuantityDto: UpdateQuantityDto,
    ) {
        return this.bookService.updateQuantity(id, updateQuantityDto);
    } 
    
    @Delete(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Libro elimiando exitosamente' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Libro no encontrado' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'No autorizado'})
    @ApiOperation({ summary: 'Eliminar un libro'})
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookService.remove(id);
    }

}