import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useEffect, useState } from 'react';
import { FormProps } from './constant';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function PriorityForm({activeStep, setAnswer, value} : FormProps) {
    const [selectedPriority, setSelectedPriority] = useState<number | null>(value);

    useEffect(() => {
        setSelectedPriority(value);
    }, [activeStep, value]);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
        <Typography sx={{textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "rgba(0, 0, 0, 0.6)", marginBottom: "5px"}}>{"How important is it to you?"}</Typography>
        <Box sx={{ width: "100%", display: "flex", alignItems: "center",
    justifyContent: "center" }}>
            <Typography sx={{ mr: 2 }}>{"not important"}</Typography>
            <StyledRating
            size='large'
            name="highlight-selected-only"
            value={selectedPriority}
            onChange={(_event, newValue) => {
                setAnswer(activeStep, newValue);
            }}
            IconContainerComponent={IconContainer}
            getLabelText={(value: number) => customIcons[value].label}
            highlightSelectedOnly
            />
            <Typography sx={{ ml: 2 }}>{"very important"}</Typography>
        </Box>
    </Box>
  );
}
