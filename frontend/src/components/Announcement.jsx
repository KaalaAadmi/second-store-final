import styled from "styled-components";
import { mobileSmall } from "../responsive";
import { mobileBig } from "./../responsive";
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  /* width: 100vw; */
  ${mobileSmall({ marginRight: "-10px" })}
  ${mobileBig({ width: "100%" })}
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Announcement;
