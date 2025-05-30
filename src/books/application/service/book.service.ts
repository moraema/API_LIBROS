import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BookRepositoryI } from "src/books/domain/repository/books.repository";
import { CreateBookDto } from "src/books/infrestructure/ports/class-validator/create-book.dto";
import { UpdateBookDto } from "src/books/infrestructure/ports/class-validator/update-book.dto";
import { BookRepositoryImpl } from "src/books/infrestructure/ports/mysql/booksRepositoryImp.port";
import { CreateBookDTOI } from "src/books/domain/dtol/create-book.dto";
import { UpdateBookDTOI } from "src/books/domain/dtol/update-book.dto";
import { UpdateQuantityDTOI } from "src/books/domain/dtol/update-quantity.dto";
import { BookI } from "src/books/domain/entities/books";

@Injectable()
export class BookService {
    constructor(
        @Inject(BookRepositoryImpl)
        private readonly _booksRepository: BookRepositoryI,
    ) {}

    async create(createBookDto: CreateBookDto) {
        try {
            return await this._booksRepository.createBook(createBookDto);
        } catch (error) {
            throw new HttpException(
                error, 
                error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }

    async findOne(id: string){
        try {
            return (await this._booksRepository.getBookById(id)) ?? null;
        } catch (error) {
            throw new HttpException(
                error,
                error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }


    async findByUserId(id: string){
        try {
            return (await this._booksRepository.getBookByUserId(id)) ?? null;
        } catch (error) {
            throw new HttpException(
                error,
                error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }

    async update(id: string, updateBookDto: UpdateBookDto) {
        try {
            const isExisting = await this._booksRepository.getBookById(id);
            if (!isExisting) {
                throw new NotFoundException("Producto no encontrado")
            }
            const reqProduct = {
                id: id,
                ...updateBookDto
            };
            return await this._booksRepository.updateBook(reqProduct);
        } catch (error) {
            throw new HttpException(
                error,
                error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }


    async updateQuantity(id: string, updateQuantityDto: UpdateQuantityDTOI): Promise<BookI> {
        try {
            const book = await this._booksRepository.getBookById(id);
            if (!book || book.length === 0) {
                throw new Error('Libro no encontrado');
            }

            const currentBook = book[0];
            const currentQuantity = Number(currentBook.cantidad);
            const quantityToAdd = Number(updateQuantityDto.cantidad);
            const newQuantity = currentQuantity + quantityToAdd;

            if (newQuantity < 0) {
                throw new Error('La cantidad final no puede ser negativa');
            }

            const updateData = {
                id,
                cantidad: newQuantity
            };

            return await this._booksRepository.updateQuantity(updateData);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async remove(id: string) {
        try {
            const res = await this._booksRepository.deleteBook(id);
            if (res?.affected <= 0) {
                throw new NotFoundException('Producto no encontrado')
            }
        } catch (error) {
            throw new HttpException(
                error,
                error.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }


}