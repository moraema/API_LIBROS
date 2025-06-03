import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(OmitType(CreateBookDto, ['id_user'] as const)) {}
