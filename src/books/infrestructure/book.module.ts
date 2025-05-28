import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./ports/mysql/book.entity";
import { BookController } from "./controllers/book.controller";
import { BookService } from "../application/service/book.service";
import { BookRepositoryImpl } from "./ports/mysql/booksRepositoryImp.port";
import { SecurityModule } from "src/share/security/infrestructure/security.module";


@Module({
    imports: [TypeOrmModule.forFeature([Book]), SecurityModule],
    controllers: [BookController],
    providers: [BookService, BookRepositoryImpl],
})
export class BooksModule {}