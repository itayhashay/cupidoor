import Typography from "@mui/material/Typography";
import { PaymentsCond } from "../../types/paymentsCond";
import { PaymentProperty } from "./styles";

const PaymentCalculator = (paymentsCond: PaymentsCond) => {
    return (
        <>
        <PaymentProperty>
            <Typography sx={{ fontWeight: '400', fontSize: '18px', marginRight: '8px'}}>
                Rent:
            </Typography>
            <Typography sx={{ fontWeight: '100'}}>
                {paymentsCond.rent}₪
            </Typography>
        </PaymentProperty>
        <PaymentProperty>
            <Typography sx={{ fontWeight: '400', fontSize: '18px', marginRight: '8px'}}>
                Property tax:
            </Typography>
            <Typography sx={{ fontWeight: '100'}}>
                {paymentsCond.propertyTax}₪
            </Typography>
        </PaymentProperty>
        <PaymentProperty>
            <Typography sx={{ fontWeight: '400', fontSize: '18px', marginRight: '8px'}}>
                House committee:
            </Typography>
            <Typography sx={{ fontWeight: '100'}}>
                {paymentsCond.houseCommittee}₪
            </Typography>
        </PaymentProperty>
        <PaymentProperty>
            <Typography sx={{ fontWeight: '400', fontSize: '18px', marginRight: '8px'}}>
                Number of payments:
            </Typography>
            <Typography sx={{ fontWeight: '100'}}>
                {paymentsCond.numOfPayments}
            </Typography>
        </PaymentProperty>
        <PaymentProperty>
            <Typography sx={{ fontWeight: '400', fontSize: '18px', marginRight: '8px'}}>
                Payment day:
            </Typography>
            <Typography sx={{ fontWeight: '100'}}>
            {`Every ${paymentsCond.paymentDay}th of the month`}
            </Typography>
        </PaymentProperty>
    </>
    );
}
 
export default PaymentCalculator;