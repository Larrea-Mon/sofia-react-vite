import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import hasToken from "../../../services/authService";
import loginImage from "../../../assets/registerImage.svg";
import SofiaLogo from "../../../components/Icons/SofiaLogo.jsx";
import GoogleIcon from "../../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../../components/Icons/AuthIcons/LinkedinIcon.js";
import { registerUser } from "../../../actions/register.js";

const Register = (props) => {
  const [state, setState] = useState({ email: '', password: ''} )
  const navigate = useNavigate();
  const location = useLocation();

  const changeCred = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const doRegister = (event) => {
    event.preventDefault();
    props.dispatch(registerUser(state, navigate))
  }

  const { from } = (location.state && location.state.from) || { from: { pathname: '/template' } }

  if (hasToken()) {
    // If already authenticated, redirect
    return <Navigate to={from} replace />
  }

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Register</p>
                <div className="logo-block">
                  <SofiaLogo />
                  <p className="mb-0">SOFIA</p>
                </div>
              </div>
              <form onSubmit={doRegister}>
                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={state.email}
                    onChange={changeCred}
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Password</FormText>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={state.password}
                    onChange={changeCred}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button className="rounded-pill my-3" type="submit" color="secondary-red">Register</Button>
                </div>
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                <div className="d-flex align-items-center my-3">
                  <p className="social-label mb-0">Register with</p>
                  <div className="socials">
                    <a href="https://flatlogic.com/"><GoogleIcon /></a>
                    <a href="https://flatlogic.com/"><TwitterIcon /></a>
                    <a href="https://flatlogic.com/"><FacebookIcon /></a>
                    <a href="https://flatlogic.com/"><GithubIcon /></a>
                    <a href="https://flatlogic.com/"><LinkedinIcon /></a>
                  </div>
                </div>
                <Link to="/login">Already have an account? Login here</Link>
              </form>
            </Widget>
          </Col>
          <Col xs={0} lg={6} className="right-column">
            <div>
              <img src={loginImage} alt="Register page" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.register.isFetching,
    isRegistered: state.register.isRegistered,
    errorMessage: state.register.errorMessage,
  };
}

export default connect(mapStateToProps)(Register);
