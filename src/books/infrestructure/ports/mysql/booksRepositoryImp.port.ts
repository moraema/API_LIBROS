import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepositoryI } from "src/books/domain/repository/books.repository";
import { Book } from "./book.entity";
import { Repository } from "typeorm";
import { CreateBookDTOI } from "src/books/domain/dtol/create-book.dto";
import { BookI } from "src/books/domain/entities/books";
import { UpdateBookDTOI } from "src/books/domain/dtol/update-book.dto";
import { UpdateQuantityDTOI } from "src/books/domain/dtol/update-quantity.dto";

@Injectable()
export class BookRepositoryImpl implements BookRepositoryI {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {}

    async createBook(book: CreateBookDTOI): Promise<BookI> {
        try {
            const res = await this.bookRepository.save(book);
            return res;
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteBook(id: string): Promise<any> {
        try {
            const res = await this.bookRepository.delete(id)
            return res;
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateBook(book: UpdateBookDTOI): Promise<BookI> {
        try {
           const res = await this.bookRepository.save(book);
           return res; 
        } catch (error) {
            throw new Error(error)
        }
    }

    async getBookById(id: string): Promise<BookI[]> {
        try {
            const res = await this.bookRepository.findBy({
                id: id
            })

          if (!res) {
            throw new Error('Libro no encontrado');
          }

            return res;
        } catch (error) {
            throw new Error(error)
        }
    }


    async getBookByUserId(id: string): Promise<BookI[]> {
        try {
            const res = await this.bookRepository.findBy({
                id_user: id,
            });
            return res;
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateQuantity(updateData: { id: string, cantidad: number }): Promise<BookI> {
        try {
            const existingBook = await this.bookRepository.findOneBy({ id: updateData.id });
            if (!existingBook) {
                throw new Error('Libro no encontrado');
            }

            existingBook.cantidad = updateData.cantidad;
            const res = await this.bookRepository.save(existingBook);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    }

}