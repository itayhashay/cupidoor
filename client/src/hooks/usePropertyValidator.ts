import { AboutProps, ApartmentAddress, PaymentsProps } from '../components/AddProperty/types';

const usePropertyValidator = () => {
  
  const addressFormValidate = (data: ApartmentAddress) => {
    return {
        city: data.city === '' && 'City is requierd',
        street: data.street === '' && 'Street is requierd',
        houseNumber: (data.houseNumber <= 0 || data.houseNumber === undefined) && 'Valid House number is requierd'
    };
  };

  const aboutFormValidate = (data: AboutProps) => {
    return {
        propertyCondition: data.propertyCondition === '' && 'Property condition is requierd',
        houseArea: (data.houseArea <= 0 || data.houseArea === undefined) && 'Valid House area is requierd',
        description: data.description === '' && 'Description is requierd',
    };
  };

  const paymentsFormValidate = (data: PaymentsProps) => {
    return {
        price: (data.price <= 0 || data.price === undefined) && 'Valid price is requierd',
        numOfPayments: (data.numOfPayments === undefined || data.numOfPayments > 12 || data.numOfPayments < 1) && 'Valid number of payments is requierd',
        entranceDate: (data.entranceDate === null) && 'Entrance date is requierd',
    };
  };


  const validateStep = (activeStep: number, data: any) => {
    switch (activeStep) {
        case 0:
            return addressFormValidate(data);
        case 1:
            return aboutFormValidate(data);
        case 2:
            return paymentsFormValidate(data);
        default:
            return {}
    }
  }


  return {
    validateStep,
  };
};

export default usePropertyValidator;
