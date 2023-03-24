import React from "react";
import Navbar from "./../components/Navbar";
import Announcement from "./../components/Announcement";
import Slider from "./../components/Slider";
import Categories from "./../components/Categories";
import Products from "./../components/Products";
import NewsLetter from "./../components/NewsLetter";
import Footer from "./../components/Footer";
import styled from "styled-components";
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
export default function Home() {
  return (
    // <ScrollContainer>
    <>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </>
    // </ScrollContainer>
  );
}
