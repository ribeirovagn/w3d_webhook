import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import Web3Utils from 'src/web3/web3.utils';

@ValidatorConstraint()
export class IsEthereumAddress implements ValidatorConstraintInterface {
  validate(address) {
    if (!Web3Utils.isValidAddress(address)) {
      return false;
    }
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return `.${args.property} invalid address format`;
  }
}

export function IsAddress() {
  return (o: object, propertyName: string) => {
    registerDecorator({
      target: o.constructor,
      propertyName,
      validator: IsEthereumAddress,
    });
  };
}
