import { PartialType } from '@nestjs/swagger';
import { CreateWeb3Dto } from './create-web3.dto';

export class UpdateWeb3Dto extends PartialType(CreateWeb3Dto) {}
