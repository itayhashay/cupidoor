import { Oval } from "react-loader-spinner";
import { SpinnerContainer } from "./styles";

const Spinner = ({ isVisible }: {isVisible? : boolean}) => {
  const { color, secondaryColor, size, stroke } = {
    color: "#1976d2",
    secondaryColor: "#006bb73b",
    size: 100,
    stroke: 3,
  };
  return (
    <SpinnerContainer>
      <Oval
        height={size}
        width={size}
        color={color}
        visible={isVisible || true}
        secondaryColor={secondaryColor}
        strokeWidth={stroke}
        strokeWidthSecondary={stroke}
      />
    </SpinnerContainer>
  );
};

export default Spinner;
