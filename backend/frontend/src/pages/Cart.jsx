import React from "react";
import styled from "styled-components";
import Navbar from "./../components/Navbar";
import Announcement from "./../components/Announcement";
import Footer from "./../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile, mobileSmall } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import PayButton from "./../components/PayButton";
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { mobileBig } from "./../responsive";
import MetaData from "./../components/MetaData";
import {
  removeFromCart,
  decreaseCart,
  increaseCart,
  clearCart,
  clearBuffer,
} from "../redux/cartRedux";

const Container = styled.div`
  width: 100vw;
  /* ${mobileSmall({ width: "103.5vw" })} */
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}/* ${mobileBig({ padding: "20px" })} */
    /* ${mobileBig({ width: "100%" })} */
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobileSmall({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })}
  ${mobileBig({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobileSmall({ flexDirection: "column" })}
  ${mobile({ flexDirection: "column" })}
  ${mobileBig({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  display: flex;
  flex: 2;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-left: 25%; */
  /* background-color: red; */
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
  ${mobileBig({ margin: "10px 30px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
  ${mobileBig({ marginBottom: "40px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 10px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Remove = styled.button``;

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
  ${mobile({ display: "none" })}
  ${mobileBig({ display: "none" })}
  ${mobileSmall({ display: "none" })}
`;

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  let hasItem = false;
  const number = cart.products.length;
  if (number > 0) hasItem = true;
  const dispatch = useDispatch();
  function handleRemoveFromCart(cartItem) {
    dispatch(removeFromCart(cartItem));
  }
  function handleDecreaseCart(cartItem) {
    dispatch(decreaseCart(cartItem));
  }
  function handleIncreaseCart(cartItem) {
    dispatch(increaseCart(cartItem));
  }
  function handleClearCart() {
    dispatch(clearCart());
  }
  React.useEffect(() => {}, [cart.products]);
  if (cart.products.length > 0) hasItem = true;
  console.log(cart.products);
  return (
    // <ScrollContainer>
    <>
      <MetaData title={"Cart"} />
      <Container>
        <Announcement />
        <Navbar />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <Link to="/products/">
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
            <TopTexts>
              {/* <TopText>Shopping Bag({cart.quantity})</TopText> */}
              {/* <TopText>Your Wishlist (0)</TopText> */}
            </TopTexts>
            {/* <Link to="/"> */}
            <TopButton
              type="filled"
              disabled={!hasItem}
              onClick={handleClearCart}
            >
              EMPTY CART
            </TopButton>
            {/* </Link> */}
          </Top>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <>
                  <Product>
                    <div
                    // style={{
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   alignItems: "center",
                    // }}
                    >
                      <ProductDetail
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {console.log(product)}
                        <Link
                          to={`/product/${product._id}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            flex: 2,
                            display: "flex",
                          }}
                        >
                          <Image src={product.img} />
                          <Details>
                            <ProductName>
                              <b>Product:</b> {product.title}
                            </ProductName>
                            <ProductId>
                              <b>ID:</b> {product._id}
                            </ProductId>
                            <ProductColor color={product.color} />
                            <ProductSize>
                              <b>Size:</b>
                              {product.size}
                              {/* {product.size.map((item) => { */}
                              {/* return item.size; })} */}
                            </ProductSize>
                          </Details>
                        </Link>

                        <div
                          onClick={() => handleRemoveFromCart(product)}
                          style={{ cursor: "pointer", marginLeft: "40px" }}
                        >
                          Remove
                        </div>
                      </ProductDetail>
                    </div>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDecreaseCart(product)}
                        >
                          <RemoveIcon />
                        </div>
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => handleIncreaseCart(product)}
                        >
                          <AddIcon />
                        </div>
                      </ProductAmountContainer>
                      <ProductPrice>
                        ₹ {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>
                  ₹ {cart.products.length > 0 ? cart.total - 50 : 0}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>₹ 50</SummaryItemPrice>
              </SummaryItem>
              {/* <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹ -5.90</SummaryItemPrice>
            </SummaryItem> */}
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              {/* <Button>CHECKOUT NOW</Button> */}
              {/* <PayButton cartItems={cart.product} /> */}
              {hasItem && <PayButton cartItems={cart.products} />}
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </>
    // </ScrollContainer>
  );
}
