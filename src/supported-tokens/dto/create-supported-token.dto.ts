import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportedTokenDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsString()
  address: string;

  @IsNotEmpty()
  decimals: number;
}
