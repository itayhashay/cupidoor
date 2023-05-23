import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Apartment } from "../../types/apartment";
import { HOUSES, HOUSES_IMAGES, HOUSE_INIT } from "../../utils/mock";
import DryDetails from "./DryDetails";
import { Container, ElementsLineOne, RentContainer, Image, ImageContainer, DryDetailsContainer, Frame, ElementsLineTwo, SubFrame } from "./styles";
import PaymentCalculator from "./PaymentCalculator";
import LandlordSection from "./LandlordSection";


const ApartmentDetails = () => {
    const [apartmentInfo, setApartmentInfo] = useState<Apartment>(HOUSE_INIT);
    const params = useParams();

    useEffect(() => {
        const fetchApartmentData = async (id: number) => {
            const apartmentData: Apartment | undefined = HOUSES.find(house => house.id === id);
            return apartmentData || HOUSE_INIT;
          };
      
        const apartmentId: number = parseInt(params.id || "");
    
        if(apartmentId)
            fetchApartmentData(apartmentId).then(apartment => setApartmentInfo(apartment))
        else
            console.log("error")
    }, [params.id])

    return ( // TODO: Change last updated mock.
        <Container>
            <Typography variant="h6">
                Apartment Details
            </Typography>
            <Frame>
                <ElementsLineOne>
                    <ImageContainer>
                        <Image alt="Paella dish" src={HOUSES_IMAGES[apartmentInfo.id-1]} />
                    </ImageContainer>
                    <DryDetailsContainer>
                        <DryDetails apartmentInfo={apartmentInfo}/>
                    </DryDetailsContainer>
                    <RentContainer>
                            <Typography variant="h4">
                                {`${apartmentInfo.rent}₪`}
                            </Typography>
                            <Typography variant="subtitle1">
                                {"Last updated: Today"}
                            </Typography>
                        </RentContainer>
                </ElementsLineOne>
                <ElementsLineTwo>
                    <Box sx={{ width: "50%", height: 'auto', display: "flex", flexDirection: "column"}}>
                        <SubFrame>
                            <Typography variant="h6">Description</Typography>
                            <Typography variant="subtitle1">{apartmentInfo.description}</Typography>
                        </SubFrame>
                        <SubFrame>
                            <Typography variant="h6">Meet the landlord</Typography>
                            <LandlordSection landlord={apartmentInfo.landlord} apartmentId={apartmentInfo.id}/>
                        </SubFrame>
                    </Box>
                    <Box sx={{ width: "50%", height: 'auto'}}>
                        <SubFrame>
                            <Typography variant="h6">Payments calculator</Typography>
                            <PaymentCalculator {...apartmentInfo.paymentsCond}/>
                        </SubFrame>
                    </Box>
                </ElementsLineTwo>
            </Frame>
        </Container>
    );
}
 
export default ApartmentDetails;