import React, { Component } from "react";
import styled from "styled-components";

import Header from "./Header";
import Map from "./Map";

class InfoBlock extends Component {
  render() {
    return (
      <InformationContainer>
        <AdressContainer>
          <Title>Adres:</Title>
          <Text>Wijnhaven 107</Text>
        </AdressContainer>
        <BuildingInformationContainer>
          <Title size={15}>
            Etages: <Text>7</Text>
          </Title>
          <Title size={15}>
            Personenliften: <Text>4</Text>
          </Title>
          <Title size={15}>
            Brandliften: <Text>3</Text>
          </Title>
          <Title size={15}>
            Watertoevoer: <Text>3</Text>
          </Title>
          <Title size={15}>
            Nooduitgang: <Text>8</Text>
          </Title>
        </BuildingInformationContainer>
        <Button onClick={() => console.log("navigating")}>3D tekening</Button>
      </InformationContainer>
    );
  }
}

const InformationContainer = styled.div`
  position: absolute;
  align-self: flex-end;
  padding: 50px;
  width: 275px;
  background-color: #03187e;
  justify-content: center;
  align-items: center;
  right: 100px;
  top: 200px;
`;

const AdressContainer = styled.div``;

const BuildingInformationContainer = styled.div`
  margin-top: 40px;
`;

const Title = styled.h2`
  color: #f7f7f7;
  margin: 5px 0;
  font-size: ${props => props.size}px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.span`
  color: #f7f7f7;
`;

const Button = styled.button`
  background-color: #c8ad51;
  padding: 12px;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  margin-top: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
  border: none;
`;

export default InfoBlock;
