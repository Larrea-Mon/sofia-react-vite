import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
} from 'reactstrap';
import Jumbotron from '../../uielements/jumbotron/Jumbotron';
import Formsy from "formsy-react";
import Select from "react-select";
import InputMask from "react-input-mask"; // <-- updated import
import { selectCountriesData, selectShipmentData, cardTypesData } from "./data";
import InputValidation from "../../../components/InputValidation/InputValidation";
import Widget from "../../../components/Widget/Widget";
import s from "./Wizard.module.scss";

const theme = (theme) => ({
  ...theme,
  borderRadius: 8,
  spacing: {
    ...theme.spacing,
    controlHeight: 45,
  },
  colors: {
    ...theme.colors,
    primary25: '#f7f8fb',
    primary: '#4d53e0',
  },
})
const steps = 4;
const StepsComponents = {
  Step1: function Step1() {
    return (
      <fieldset>
        <FormGroup>
          <Label for="username">Username</Label>
          <InputValidation
            type="text"
            id="username"
            name="username"
            trigger="change"
            validations={{ isAlphanumeric: true }}
            validationError={{ isAlphanumeric: 'Username must contain symbols without spaces' }}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <InputValidation
            type="text"
            id="email"
            name="email"
            trigger="change"
            validations={{ isEmail: true }}
            validationError={{ isEmail: 'Please provide your E-mail' }}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <InputValidation
            type="password"
            id="password"
            name="password"
            validations={{ isAlpha: true }}
            required
            validationError={{ isAlpha: 'Please provide your address' }}
          />
        </FormGroup>
      </fieldset>
    );
  },
  Step2: function Step2() {
    return (
      <fieldset>
        <FormGroup>
          <Label for="country-select">Destination Country</Label>
          <Select
            className="customized-select"
            options={selectCountriesData}
            theme={theme}
          />
          <p className="help-block body-3 muted">Please choose your country destination</p>
        </FormGroup>
        <FormGroup>
          <Label for="courier">Choose shipping option</Label>
          <Select
            className="customized-select"
            options={selectShipmentData}
            theme={theme}
          />
          <p className="help-block body-3 muted">Please choose your shipping option</p>
        </FormGroup>
        <FormGroup>
          <Label for="destination">Destination Zip Code</Label>
          <InputMask
            className="form-control"
            id="destination"
            mask="999999"
            maskChar=""
          >
            {(inputProps) => <input {...inputProps} type="text" size="6" />}
          </InputMask>
          <p className="help-block body-3 muted">Please provide your Destination Zip Code</p>
        </FormGroup>
        <FormGroup>
          <Label for="dest-address">Destination Address</Label>
          <InputValidation type="text" id="dest-address" name="dest-address" />
          <p className="help-block body-3 muted">Please provide the destination address</p>
        </FormGroup>
      </fieldset>
    )
  },
  Step3: function Step3() {
    return (
      <fieldset>
        <FormGroup>
          <Label for="name">Cardholder name</Label>
          <InputValidation type="text" id="name" name="name" />
        </FormGroup>
        <FormGroup>
          <Label for="credit-card-type">Choose shipping service</Label>
          <Select
            className="selectCustomization"
            options={cardTypesData}
            theme={theme}
          />
        </FormGroup>
        <FormGroup>
          <Label for="card-number">Card Number</Label>
          <InputMask
            className="form-control"
            id="card-number"
            name="card-number"
            mask="9999 9999 9999 9999"
            maskChar=""
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </FormGroup>
        <FormGroup>
          <Label for="expiration-date">Expiration Date</Label>
          <InputMask
            className="form-control"
            id="expiration-date"
            name="expiration-date"
            mask="99 / 99"
            maskChar=""
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </FormGroup>
      </fieldset>
    )
  },
  Step4: function Step4() {
    return (
      <div className="p-5 mb-4 bg-transparent rounded-3">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-flex align-items-center mt-2 text-white">
            Thank you!
          </h1>
          <div className="body-1 text-white">
            Dear customer,
            thank you for your purchase with Flatlogic!
            In your mailbox you will find the invoice for your purchase.
          </div>
        </div>
      </div>
    )
  }
}

export default function Wizard() {

  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25)

  const isActive = (step) => {
    return step <= currentStep;
  }

  const nextStep = () => {
    let newStep = currentStep;
    if (newStep === steps) {
      newStep = 1;
    } else {
      newStep += 1;
    }
    setCurrentStep(newStep);
    setProgress((100 / steps) * newStep)
  }

  const previousStep = () => {
    let newStep = currentStep;
    if (currentStep === 1) {
      newStep = 1;
    } else {
      newStep -= 1;
    }
    setCurrentStep(newStep);
    setProgress((100 / steps) * newStep)
  }

  return (
    <div>
      <Row>
        <Col>
          <Row className="gutter mb-4">
            <Col lg={8}>
              <Widget className="widget-p-md">
                <div className="headline-1">Form Wizard</div>
                <p className="mb-4 body-3 muted">An example of complete wizard form in widget.</p>
                <ul className={s.progressbar}>
                  <li className={`${s.account} ${isActive(1) && s.active}`}><strong>Account</strong></li>
                  <li className={`${s.personal} ${isActive(2) && s.active}`}><strong>Shipping</strong></li>
                  <li className={`${s.payment} ${isActive(3) && s.active}`}><strong>Payment</strong></li>
                  <li className={`${s.confirm} ${isActive(4) && s.active}`}><strong>Finish</strong></li>
                </ul>
                <div className={`bg-light-gray p-3 ${s.formBlock} ${currentStep === 4 && s.jumbotronBg}`}>
                  {/* FORMSY START
                  <Formsy>
                    {currentStep === 1 && <StepsComponents.Step1 />}
                    {currentStep === 2 && <StepsComponents.Step2 />}
                    {currentStep === 3 && <StepsComponents.Step3 />}
                    {currentStep === 4 && <StepsComponents.Step4 />}
                  </Formsy> FORMSY END
                  */}
                </div>
                <div className="mt-3 d-flex justify-content-between">
                  <Button
                    className="d-flex align-items-center"
                    disabled={currentStep === 1}
                    color="primary"
                    onClick={previousStep}
                  >
                    <i className="fa fa-angle-left mr-1" />
                    &nbsp;Previous
                  </Button>
                  <div>
                    {currentStep < steps &&
                      <Button
                        type="submit"
                        className="d-flex align-items-center"
                        color="primary"
                        onClick={nextStep}
                      >
                        Next
                        <i className="fa fa-angle-right ml-1" />
                      </Button>
                    }
                    {currentStep === steps &&
                      <Button
                        className="d-flex align-items-center"
                        color="success"
                        onClick={nextStep}
                      >
                        Finish
                      </Button>
                    }
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
