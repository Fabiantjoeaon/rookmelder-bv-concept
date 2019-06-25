import "babel-polyfill";
import React, { useMemo, useEffect, useState } from "react";
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
    <Container>
      <UI />
      <Canvas>
        <Scene
          mapTexture={mapTexture}
          markerTexture={markerTexture}
          buildings={buildings}
          totalBuildings={promises.length}
        />
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

render(<App />, document.getElementById("root"));
