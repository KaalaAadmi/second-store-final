import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { mobile, mobileSmall, mobileBig } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}; /* ${mobile({ backgroundColor: "red" })} */
  border-bottom: 1px solid #eee;
  ${mobileSmall({ marginRight: "-10px" })}
  ${mobileBig({ width: "100%" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  /* ${mobile({ display: "none" })}; */
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-left: 25px;
  ${mobile({ marginLeft: "15px" })};
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  ${mobile({ marginLeft: "15px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "5px" })}
`;

export default function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  let isLoggedIn = true;
  if (!user) {
    isLoggedIn = false;
  }
  return (
    <Container
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 4,
      }}
    >
      <Wrapper>
        <Left>
          <Language>EN</Language>
          {/* <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>secondStore.</Logo>
          </Link>
        </Center>
        <Right>
          {!isLoggedIn ? (
            <>
              {/* <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>LOGIN</MenuItem>
              </Link> */}
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>
            </>
          ) : (
            <Link
              to="/logout"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>
                <LogoutButton />
              </MenuItem>
            </Link>
          )}
          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}
