import React from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import mock from "../profileMockData.js";
import { styled } from '@mui/material/styles';

const stepsData = mock.timelineWidget.timelineData;

const Root = styled('div')(({ theme }) => ({
  width: '100%',
}));

const IconContainer = styled('div')(({ theme }) => ({
  '& svg': {
    width: 32,
    height: 32,
  },
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${StepConnector.classes.active}`]: {
    '& .MuiStepConnector-line': {
      backgroundColor: '#4D53E0',
    },
  },
  [`&.${StepConnector.classes.completed}`]: {
    '& .MuiStepConnector-line': {
      backgroundColor: '#4D53E0',
    },
  },
  '.MuiStepConnector-line': {
    border: 0,
    width: 3,
    backgroundColor: '#4D53E0',
    borderRadius: 0,
  },
  '.MuiStepConnector-vertical': {
    padding: 0,
    marginLeft: 14,
    marginTop: -8,
    marginBottom: -8,
    '& span': {
      minHeight: 40,
    },
  },
}));

export default function TasksStepper() {
  const [activeStep, setActiveStep] = React.useState(3);

  const handleClick = (e) => {
    setActiveStep(e)
  }

  return (
    <Root>
      <Stepper activeStep={activeStep} orientation="vertical" connector={<ColorlibConnector />}>
        {stepsData.map((item, index) => (
          <Step key={index} onClick={() => handleClick(index)}>
            <StepLabel className={IconContainer.className}>
              <div key={index} className="d-flex flex-row align-self-baseline ml-3">
                <img src={item.img} alt="item pic"/>
                <div className="d-flex flex-column ml-3">
                  <p className="body-2">{item.title}</p>
                  <p className="body-3 muted">{item.label}</p>
                </div>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Root>
  )
}

