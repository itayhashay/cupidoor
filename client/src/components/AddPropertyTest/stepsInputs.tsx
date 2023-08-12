import {
  AddressFormSchema,
  AboutFormSchema,
  PaymentsFormSchema,
  UploadsFormSchema,
} from '../../utils/FormikSchema';

export const stepperInputFiedls = [
  ['city', 'street', 'houseNumber'],
  ['propertyCondition', 'houseArea', 'description'],
  ['price', 'tax', 'numOfPayments', 'paymentDay'],
  [], // Will be pictures
];

export const stepperSchemas = [
  AddressFormSchema,
  AboutFormSchema,
  PaymentsFormSchema,
  UploadsFormSchema,
];
