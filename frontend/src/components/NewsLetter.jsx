import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { mobile, mobileSmall } from "../responsive";
import { newsletter } from "./../redux/apiCalls";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { mobileBig } from "./../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${mobileSmall({ marginRight: "-10px" })}
  ${mobileBig({ width: "100%" })}
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobileSmall({ fontSize: "60px !important" })}
  ${mobile({ fontSize: "70px" })}
  ${mobileBig({ fontSize: "80px" })}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
  ${mobileSmall({ fontSize: "21px" })}
  ${mobileBig({ fontSize: "27px" })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
  ${mobileBig({ width: "70%" })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const notify = (value) =>
    toast(`${value}`, { position: "bottom-center", theme: "dark" });
  function handleClick(event) {
    event.preventDefault();
    if (email === "") notify("Please enter your email!");
    else newsletter(dispatch, { email });
  }
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input
          placeholder="Your Email ID"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleClick}>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
}
