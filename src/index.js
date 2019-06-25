import "babel-polyfill";
import React, { useMemo, useEffect, useState } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import * as THREE from "three/src/Three";
import { render } from "react-dom";
import { Canvas, extend } from "react-three-fiber";
import styled from "styled-components";

import mapTextureAsset from "../assets/texture.jpg";
import markerTextureAsset from "../assets/marker.png";

import loadGLTFAsync from "./utils/loadGLTFAsync";
import Scene from "./components/Scene";
import * as resources from "./resources/index";

import UI from "./components/UI";
import Header from "./components/UI/Header";
import Info from "./components/UI/Info";

extend(resources);

const promises = [
  loadGLTFAsync(require("../assets/models/building_1.glb")),
  loadGLTFAsync(require("../assets/models/building_2.glb")),
  loadGLTFAsync(require("../assets/models/building_3.glb")),
  loadGLTFAsync(require("../assets/models/building_4.glb"))
];

const App = () => {
  const [buildings, setBuildings] = useState([]);

  const mapTexture = useMemo(
    () => new THREE.TextureLoader().load(mapTextureAsset),
    [mapTextureAsset]
  );
  const markerTexture = useMemo(
    () => new THREE.TextureLoader().load(markerTextureAsset),
    [markerTextureAsset]
  );

  useEffect(() => {
    const fetchModels = async () => {
      const res = await Promise.all(promises);

      const sceneChildren = res.map(({ scene: { children } }) => children[0]);

      setBuildings(sceneChildren);
    };

    fetchModels();
  }, []);

  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route
            path="/building"
            render={() => (
              <Container>
                <Info />
                <StyledCanvas>
                  <Scene
                    mapTexture={mapTexture}
                    markerTexture={markerTexture}
                    buildings={buildings}
                    totalBuildings={promises.length}
                  />
                </StyledCanvas>
              </Container>
            )}
          />
          <Route path="*" component={UI} />
        </Switch>
      </Router>
    </>
  );
};

const StyledCanvas = styled(Canvas)`
  height: 100%;
`;

const Container = styled.div`
  position: relative;
`;

render(<App />, document.getElementById("root"));
