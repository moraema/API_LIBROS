import { CreateBookDTOI } from "../dtol/create-book.dto";
import { UpdateBookDTOI } from "../dtol/update-book.dto";
import { UpdateQuantityDTOI } from "../dtol/update-quantity.dto";
import { BookI } from "../entities/books";

export interface BookRepositoryI {
    createBook(book: CreateBookDTOI): Promise<BookI>
    deleteBook(id: string): Promise<any>;
    updateBook(book: UpdateBookDTOI): Promise<BookI>;
    updateQuantity(book: UpdateQuantityDTOI): Promise<BookI>;
   // getAllBooks(): Promise<BookI>;
   getBookByUserId(id: string): Promise<BookI[]>;
   getBookById(id: string): Promise<BookI[]>;
}