import React, { useState, useRef, useEffect } from "react";
import { useRender, useThree, useUpdate } from "react-three-fiber";
import * as THREE from "three/src/Three";

const Scene = ({ buildings, texture, totalBuildings }) => {
  const [activeBuilding, setActiveBuilding] = useState(null);
  const container = useRef();
  const controls = useRef();
  const camera = useRef();
  const { size, setDefaultCamera } = useThree();

  useEffect(() => void setDefaultCamera(camera.current), []);
  useRender(() => {
    if (controls.current) controls.current.update();
  });

  const buildingAttributeMap = {
    0: {
      position: [0, 0, 0],
      scale: [0.05, 0.05, 0.05],
      rotation: [0, 0, 0]
    },
    1: {
      position: [12, 0, 4],
      scale: [0.01, 0.01, 0.01],
      rotation: [0, 0, 0]
    },
    2: {
      position: [-10, 0, 6],
      scale: [0.004, 0.004, 0.004],
      rotation: [0, THREE.Math.degToRad(90), 0]
    },
    3: {
      position: [-12, 0, -14],
      scale: [1, 1, 1],
      rotation: [0, THREE.Math.degToRad(90), 0]
    }
  };

  return (
    <>
      <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        fov={55}
        position={[0, 10, 40]}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      {camera.current && (
        <>
          <orbitControls
            ref={controls}
            args={[camera.current]}
            enableDamping
            dampingFactor={0.1}
            rotateSpeed={0.1}
          />
          <ambientLight color="lightblue" />
          <pointLight color="white" intensity={1} position={[10, 10, 10]} />
          {buildings.length === totalBuildings && texture && (
            <group ref={container}>
              <mesh
                geometry={new THREE.PlaneGeometry(50, 50, 25, 25)}
                rotation={[THREE.Math.degToRad(-90), 0, 0]}
              >
                <meshBasicMaterial attach="material">
                  <primitive attach="map" object={texture} />
                </meshBasicMaterial>
              </mesh>
              {buildings.map((building, i) => {
                const { children } = building;
                const { position, rotation, scale } = buildingAttributeMap[i];

                const wireFrameProps = {};

                for (const [index, child] of children.entries()) {
                  const shouldBeWireFramed = i === activeBuilding;
                  if (child.material)
                    wireFrameProps[
                      `children-${index}-material-wireframe`
                    ] = shouldBeWireFramed;
                }

                // TODO: setActiveBuilding()

                return (
                  <primitive
                    key={i.toString()}
                    object={building}
                    position={position}
                    rotation={rotation}
                    scale={scale}
                    material={null}
                    {...wireFrameProps}
                  />
                );
              })}
            </group>
          )}
        </>
      )}
    </>
  );
};

export default Scene;
