import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "./../redux/apiCalls";
import { mobile } from "./../responsive";

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  /* display: flex; */
  ${mobile({ fontSize: "12px" })};
`;
export default function Logout() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    try {
      logout(dispatch);
    } catch (error) {
      console.log(error.stack);
    }
  };
  return <Button onClick={handleClick}>LOGOUT</Button>;
}
