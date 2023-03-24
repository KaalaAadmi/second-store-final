import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./../components/Navbar";
import Announcement from "./../components/Announcement";
import Products from "./../components/Products";
import NewsLetter from "./../components/NewsLetter";
import Footer from "./../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import MetaData from "./../components/MetaData";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 10px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
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
export default function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  function handleFilters(event) {
    const value = event.target.value;
    setFilters({
      ...filters,
      [event.target.name]: value,
    });
  }
  // console.log(filters);
  return (
    // <ScrollContainer>
    <>
      <MetaData title={"Products"} />
      <Container>
        <Announcement />
        <Navbar />
        <Title>{cat}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <Option disabled selected>
                Color
              </Option>
              <Option>white</Option>
              <Option>red</Option>
              <Option>blue</Option>
              <Option>black</Option>
              <Option>yellow</Option>
              <Option>green</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
              <Option disabled selected>
                Size
              </Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              {/* <Option>XXL</Option> */}
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <NewsLetter />
        <Footer />
      </Container>
    </>
    // </ScrollContainer>
  );
}
