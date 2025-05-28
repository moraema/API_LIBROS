import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./share/config/configService";
import { BooksModule } from "./books/infrestructure/book.module";
import { UserModule } from "./users/infrestructure/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configService.get('HOST'),
      port: configService.get('PORT'),
      username: configService.get('USERDB'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UserModule,
    BooksModule
  ],
})
export class AppModule {}
