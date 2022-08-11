import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Entity } from 'typeorm';
import { CreateBlockDto } from './create-block.dto';

@Entity({ name: 'blocks' })
export class UpdateBlockDto extends PartialType(CreateBlockDto) {
  @ApiProperty({
    example: 123456799,
  })
  @IsInt()
  number: number;
}
