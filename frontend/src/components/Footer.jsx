import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { mobile, mobileSmall } from "../responsive";
import { mobileBig } from "./../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })} /* ${mobileSmall({
    width: "103.5vw",
  })} */
  ${mobileBig({ flexDirection: "column", alignItems: "center" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* ${mobileBig({ flex: 2 })} */
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
  ${mobileBig({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
  ${mobileBig({ paddingLeft: "69px" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  /* display: flex; */
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;
const style = {
  textDecoration: "none",
  color: "black",
};
export default function Footer() {
  return (
    <Container>
      <Left>
        <Logo>sSs.</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available,but the
          majority have suffered alteration in some form,by injected humour,or
          randomised words which don't look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="#3b5999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="#e4405f">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="#e60023">
            <PinterestIcon />
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            <TwitterIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <Link to="/" style={style}>
            <ListItem>Home</ListItem>
          </Link>
          <Link to="/products/" style={style}>
            <ListItem>All</ListItem>
          </Link>
          <Link to="/products?cat=man" style={style}>
            <ListItem>Men</ListItem>
          </Link>
          <Link to="/products?cat=woman" style={style}>
            <ListItem>Women</ListItem>
          </Link>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: "10px" }} /> Main Nahi Bataunga
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} /> +919594958505
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon style={{ marginRight: "10px" }} />{" "}
          contact@ssstore.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}
