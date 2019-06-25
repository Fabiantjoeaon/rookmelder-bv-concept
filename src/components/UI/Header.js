import React from "react";
import styled from "styled-components";

import logo from "../../../assets/logo.png";

export default () => (
  <HeaderContainer>
    <Logo src={logo} />
  </HeaderContainer>
);

const HeaderContainer = styled.div`
  background-color: #03187e;
  width: 100%;
  display: flex;
  height: 75px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 25px;
`;

const Logo = styled.img`
  width: 250px;
  height: 50px;
`;
