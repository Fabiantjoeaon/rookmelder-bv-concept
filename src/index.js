import "babel-polyfill";
import React, { useMemo, useEffect, useState } from "react";
import * as THREE from "three/src/Three";
import { render } from "react-dom";
import { Canvas } from "react-three-fiber";

import textureAsset from "../assets/texture.jpg";
import buildingGLB from "../assets/models/building.glb";
import loadGLTFAsync from "./utils/loadGLTFAsync";
import Scene from "./components/Scene";

const App = () => {
  const [building, setBuilding] = useState(null);

  const texture = useMemo(() => new THREE.TextureLoader().load(textureAsset), [
    textureAsset
  ]);

  useEffect(() => {
    const fetchModel = async () => {
      const {
        scene: { children }
      } = await loadGLTFAsync(buildingGLB);

      setBuilding(children[0]);
    };

    fetchModel();
  }, []);

  return (
    <Canvas>
      <Scene texture={texture} building={building} />
    </Canvas>
  );
};

render(<App />, document.getElementById("root"));
