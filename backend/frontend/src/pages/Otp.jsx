import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { mobile, mobileSmall } from "../responsive";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { checkOtp } from "./../redux/apiCalls";
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
  ${mobile({ width: "60%" })}
  ${mobileBig({ width: "60%" })}
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
  /* width: 40%; */
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
export default function Otp() {
  const [otp, setOtp] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const notify = (value) =>
    toast(`${value}`, { position: "bottom-center", theme: "dark" });
  const { mailSend, error, clearBuffer } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // let nextPage = false;
  function handleClick(e) {
    e.preventDefault();
    // clearBuffer(dispatch);
    if (otp === "")
      notify("Please enter the OTP you have received in your email!");
    else {
      checkOtp(dispatch, otp);
      setNextPage(true);
    }
  }
  return (
    // <ScrollContainer>
    <>
      <MetaData title={"OTP Request"} />
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CHECK OTP</Title>
          <Form>
            <Input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
            <Button onClick={handleClick}>CHECK OTP</Button>
            {nextPage && <Navigate to="/setPassword" />}
            {error && <Error>Something went wrong...</Error>}
          </Form>
        </Wrapper>
      </Container>
    </>
    // </ScrollContainer>
  );
}
