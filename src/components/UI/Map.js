import React, { Component } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

import markerTextureAsset from "../../../assets/marker.png";

class Map extends Component {
  render() {
    return (
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBfmfDu8Ipp27EmM40sMJY14-De-muqDzo" }}
          defaultCenter={{
            lat: 51.91791,
            lng: 4.48777
          }}
          defaultZoom={16}
        >
          <Marker src={markerTextureAsset} lat={51.91791} lng={4.48777} />
        </GoogleMapReact>
      </MapContainer>
    );
  }
}

const MapContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
`;

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

const Marker = styled.img`
  width: 20px;
`;

export default Map;
