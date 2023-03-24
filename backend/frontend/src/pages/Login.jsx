import React, { useState } from "react";
import styled from "styled-components";
import { mobile, mobileSmall } from "../responsive";
import { login } from "./../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Navbar from "./../components/Navbar";
// import {Link}
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
// import Sanitize from 'react-sanitize-input'
import { mobileBig } from "./../responsive";
import MetaData from "./../components/MetaData";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobileSmall({ width: "103.5vw" })}
  ${mobileBig({ width: "100%", height: "100vh" })}
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  ${mobileBig({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Links = styled.a`
  margin: 5px 0;
  font-size: 12px;
  /* text-decoration: underlined; */
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;
const ScrollContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  ::-webkit-scrollbar {
    width: 6px;
    border-left: 1px solid #e6ecf8;
  }
  ::-webkit-scrollbar-thumb {
    background-color: teal;
    border-radius: 30px;
  }
`;
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector((state) => state.user);
  // const user = { email, password };
  const notify = (value) =>
    toast(`${value}`, { position: "bottom-center", theme: "dark" });
  let forward = false;
  if (currentUser !== null) {
    forward = true;
  }
  const handleClick = (e) => {
    e.preventDefault();
    if (email === "") notify("Please enter your email!");
    else if (password === "") notify("Please enter your password!");
    else login(dispatch, { email, password });
  };
  return (
    // <ScrollContainer>
    <>
      <MetaData title={"Login"} />
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            {forward && <Navigate to="/login" />}
            {error && <Error>Something went wrong...</Error>}
            <Link
              to="/forgotPassword"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Links>DO YOU NOT REMEMBER YOUR PASSWORD?</Links>
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Links>CREATE A NEW ACCOUNT</Links>
            </Link>
          </Form>
        </Wrapper>
      </Container>
    </>
    // </ScrollContainer>
  );
}
