import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';

export const schema = Yup.object().shape({
  firstName: Yup.string().required('First name is a required field'),
  lastName: Yup.string().required('Last name is a required field'),
  email: Yup.string().required('Email is a required field').email('Invalid email format'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
  phone: Yup.string().required('Phone number is a required field'),
  age: Yup.string().required('Age is a required field'),
  role: Yup.string().required('Role is a required field'),
});

export const roles = [
  { value: 'landlord', label: 'Landlord' },
  { value: 'tenant', label: 'Tenant' },
  { value: 'both', label: 'Both' },
];

export const CustomHelperText = styled(FormHelperText)({
  color: 'red',
});

export const loginScheme = Yup.object().shape({
  email: Yup.string().required('Email is a required field').email('Invalid email format'),
  password: Yup.string().required('Password is a required field'),
});

const wordCountValidator = (value: string | undefined) => {
  if (!value) return false;
  const wordCount = value.trim().split(/\s+/).length;
  return wordCount <= 120;
};

export const userDetailsScheme = Yup.object().shape({
  firstName: Yup.string().required('First name is a required field'),
  lastName: Yup.string().required('Last name is a required field'),
  age: Yup.number()
    .required('Age is a required field')
    .min(18, 'You must be at least 18 years old!')
    .max(120, 'Please enter a valid age!'),
  email: Yup.string().required('Email is a required field').email('Invalid email format'),
  phone: Yup.string().required('Phone number is a required field'),
  description: Yup.string().test(
    'description-max-word-count',
    'Description must be a maximum of 120 words',
    wordCountValidator,
  ),
  role: Yup.string().required('Role is a required field'),
});

export const userPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
    .required('New password is a required field')
    .min(8, 'New password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Confirm password is a required field'),
});

export const AddressFormSchema = Yup.object().shape({
  city: Yup.string()
    .required('City is required')
    .min(2, 'Please enter a valid city name')
    .max(90, 'Please enter a valid city name'),
  street: Yup.string()
    .required('Street is required')
    .min(2, 'Please enter a valid streey name')
    .max(90, 'Please enter a valid street name'),
  houseNumber: Yup.number()
    .required('House number is required')
    .min(1,"Please enter a valid house number")
    .max(1000000000, 'Please enter a valid house number'),
});

export const AboutFormSchema = Yup.object().shape({
  propertyCondition: Yup.string().required('Property condition is required'),
  houseArea: Yup.number().required('House area is required').min(1, 'Please enter a valid house area'),
  description: Yup.string()
    .required('Description is required')
    .min(2, 'Description should contain at least 2 words'),
    rooms: Yup.number().required('Rooms is required').min(1, 'Please enter a valid number of rooms'),
    floor: Yup.number().required('Floor is required').min(-1, 'Please enter a valid floor number'),
    balconies: Yup.number().required('Balconies is required').min(0, 'Please enter a valid number of balconies'),
    parkings: Yup.number().required('Parkings is required').min(0, 'Please enter a valid number of parkings'),
});

export const PaymentsFormSchema = Yup.object().shape({
  price: Yup.number().required('Price is required').min(1, 'Please enter a valid price'),
  tax: Yup.number().required('Tax is required').min(1, 'Please enter a valid tax value'),
  numOfPayments: Yup.number()
    .required('Number of payments is required')
    .min(1, 'At least 1 payment')
    .max(12, 'The max is 12 as a year'),
  paymentDay: Yup.number()
    .required('Payment day is required')
    .min(1, 'At least the 1st of every month')
    .max(31, 'There is no more than 31 days in month'),
});

export const UploadsFormSchema = Yup.object().shape({
  // files: [],
});

export const ApartmentSchema = Yup.object()
  .shape(AddressFormSchema.fields)
  .shape(AboutFormSchema.fields)
  .shape(PaymentsFormSchema.fields)
  .shape(UploadsFormSchema.fields);