import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Entity } from 'typeorm';

@Entity({ name: 'blocks' })
export class CreateBlockDto {
  @ApiProperty({
    example: 123456798,
  })
  @IsInt()
  number: number;
}
