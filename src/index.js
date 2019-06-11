import "babel-polyfill";
import React, { useMemo, useEffect, useState } from "react";
import * as THREE from "three/src/Three";
import { render } from "react-dom";
import { Canvas, extend } from "react-three-fiber";

import textureAsset from "../assets/texture.jpg";

import loadGLTFAsync from "./utils/loadGLTFAsync";
import Scene from "./components/Scene";
import * as resources from "./resources/index";

extend(resources);

const promises = [
  loadGLTFAsync(require("../assets/models/building_1.glb")),
  loadGLTFAsync(require("../assets/models/building_2.glb")),
  loadGLTFAsync(require("../assets/models/building_3.glb")),
  loadGLTFAsync(require("../assets/models/building_4.glb"))
];

const App = () => {
  const [buildings, setBuildings] = useState([]);

  const texture = useMemo(() => new THREE.TextureLoader().load(textureAsset), [
    textureAsset
  ]);

  useEffect(() => {
    const fetchModels = async () => {
      const res = await Promise.all(promises);

      const sceneChildren = res.map(({ scene: { children } }) => children[0]);

      setBuildings(sceneChildren);
    };

    fetchModels();
  }, []);

  return (
    <Canvas>
      <Scene
        texture={texture}
        buildings={buildings}
        totalBuildings={promises.length}
      />
    </Canvas>
  );
};

render(<App />, document.getElementById("root"));
