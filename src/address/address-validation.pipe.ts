import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import Web3Utils from 'src/web3/web3.utils';

@Injectable()
export default class AddressValidationPipe implements PipeTransform {
  transform(address: string, metadata: ArgumentMetadata) {
    if (!Web3Utils.isValidAddress(address)) {
      throw new BadRequestException('Invalid address format');
    }
  }
}
