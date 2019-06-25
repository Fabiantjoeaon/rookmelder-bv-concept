import React, { Component } from "react";
import styled from "styled-components";

import Header from "./Header";
import Map from "./Map";
import Info from "./Info";

class UI extends Component {
  render() {
    return (
      <Container>
        <Map />
        <Info showButton />
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
`;

export default UI;
