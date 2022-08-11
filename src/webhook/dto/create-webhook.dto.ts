import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { IsAddress } from 'src/address/entities/address.validator';

export class CreateWebhookDto {
  @ApiProperty({
    example: 'W3D Software',
  })
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty({
    example: 'USDT',
  })
  @IsNotEmpty()
  @IsString()
  coin: string;

  @ApiProperty({
    example: '0x204735322b9c7fe94e47b74980531f725c1def48',
  })
  @IsNotEmpty()
  @IsAddress()
  address: string;

  @ApiProperty({
    example: 'http://localhost.com:3000/webhook/receive',
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({
    example: 6,
  })
  @IsInt()
  numConfirmations: number;
}
