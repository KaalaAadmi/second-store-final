import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";
import { clearBuffer } from "../redux/cartRedux";

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const url = "https://second-store.herokuapp.com/api";

const PayButton = ({ cartItems }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleCheckout = () => {
    axios
      .post(`${url}/checkout/payment`, {
        cartItems,
        // userId: user.id,
      })
      .then((res) => {
        console.log(res);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
        dispatch(clearBuffer());
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return <Button onClick={() => handleCheckout()}>CHECKOUT NOW</Button>;
};
export default PayButton;
