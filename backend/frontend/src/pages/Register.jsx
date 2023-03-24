import React from "react";
import styled from "styled-components";
import { mobile, mobileSmall } from "../responsive";
import Navbar from "./../components/Navbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register } from "./../redux/apiCalls";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { mobileBig } from "./../responsive";
import MetaData from "./../components/MetaData";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobileSmall({ width: "103.5vw" })}
  ${mobileBig({ width: "100%", height: "100vh" })}
`;
const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Login = styled.span`
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 10px;
  ${mobile({ padding: "20px 0 0 30px" })}
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
export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const dispatch = useDispatch();
  const { newUser, error } = useSelector((state) => state.user);
  // const user = { name, email, password };
  // console.log(user);
  let forward = false;
  if (newUser !== null) {
    forward = true;
  }
  const notify = (value) =>
    toast(`${value}`, { position: "bottom-center", theme: "dark" });
  function handleClick(event) {
    event.preventDefault();
    if (name === "") notify("Name cannot be empty!");
    else if (email === "") notify("Email cannot be empty!");
    else if (password === "") notify("Password cannot be empty!");
    else if (password !== confirmPassword) notify("Passwords must match!");
    else register(dispatch, { name, email, password });
  }
  return (
    // <ScrollContainer>
    <>
      <MetaData title={"Register"} />
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Agreement>
              By creating an account,Iconsent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleClick}>Create</Button>
            {forward && <Navigate to="/login" />}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Login>Already have an account? LogIn</Login>
            </Link>
            {error && <Error>Something went wrong...</Error>}
          </Form>
        </Wrapper>
      </Container>
    </>
    // </ScrollContainer>
  );
}
