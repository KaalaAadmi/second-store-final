import styled from "styled-components";
import { categories } from "../data";
import { mobile, mobileSmall } from "../responsive";
import CategoryItem from "./CategoryItem";
import { mobileBig } from "./../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
  ${mobileSmall({ marginRight: "-10px" })}
  ${mobileBig({ width: "100%", flexDirection: "column", padding: "0px" })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
