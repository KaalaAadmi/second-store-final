import React from "react";
import Navbar from "./../components/Navbar";
import Announcement from "./../components/Announcement";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearBuffer } from "../redux/cartRedux";
import styled from "styled-components";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import MetaData from "./../components/MetaData";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100vw;
  flex-direction: column;
`;
const Image = styled.img``;
const Info = styled.div``;
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
export default function CheckoutSuccess() {
  // const cart = useSelector((state) => state.cart);
  // const dispatch = useDispatch();
  // dispatch(clearBuffer());

  return (
    // <ScrollContainer>
    <>
      <MetaData title={"Payment Successfull"} />
      <Announcement />
      <Navbar />
      <Container>
        {/* <Image src=""></Image> */}
        <CheckCircleSharpIcon
          style={{ color: "green", fontSize: "80px", marginBottom: "10px" }}
        />
        <Info>
          Your order has been accepted and will be processed. You will receive
          an email with the receipt of your order.
        </Info>
        <Info>Thank You for ordering!</Info>
      </Container>
    </>
    // </ScrollContainer>
  );
}
