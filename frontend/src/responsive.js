import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) and (min-width: 360px) {
      ${props}
    }
  `;
};
export const mobileSmall = (props) => {
  return css`
    @media only screen and (max-width: 340px) and (min-width: 320px) {
      ${props}
    }
  `;
};
export const mobileBig = (props) => {
  return css`
    @media only screen and (max-width: 625px) and (min-width: 400px) {
      ${props}
    }
  `;
};
