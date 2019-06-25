import React, { Component } from "react";
import styled from "styled-components";

import Header from "./Header";
import Map from "./Map";

class UI extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Map />
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
`;

export default UI;
