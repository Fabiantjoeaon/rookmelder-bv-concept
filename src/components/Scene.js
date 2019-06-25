import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRender, useThree } from "react-three-fiber";
import * as THREE from "three/src/Three";

import createTextSpriteMaterial from "../utils/createTextSpriteMaterial";

const testApartmentNumbers = [
  { number: 46, position: [0, 4, 3] },
  { number: 32, position: [0, 5, -4] },
  { number: 18, position: [2, 2, 4] },
  { number: 66, position: [-2, 5, 4] },
  { number: 77, position: [4, 9, 4] },
  { number: 60, position: [0, 5, 3] },
  { number: 346, position: [0, 7, -4] }
];

const Scene = ({ buildings, mapTexture, markerTexture, totalBuildings }) => {
  const [activeBuilding, setActiveBuilding] = useState(null);
  const container = useRef();
  const controls = useRef();
  const camera = useRef();
  const { size, setDefaultCamera } = useThree();

  useEffect(() => void setDefaultCamera(camera.current), []);
  useRender(() => {
    if (controls.current) controls.current.update();
  });

  const wireFrameProps = useMemo(() => {
    const wireFrameProps = {};
    buildings.map((building, i) => {
      wireFrameProps[i] = {};
      const { children } = building;

      for (const [index, child] of children.entries()) {
        const shouldBeWireFramed = i === activeBuilding;

        if (child.material)
          wireFrameProps[i][
            `children-${index}-material-wireframe`
          ] = shouldBeWireFramed;
      }
    });
    return wireFrameProps;
  }, [activeBuilding]);

  const [lineGeo, lineMat] = useMemo(() => {
    const geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(0, 0, 5));
    geo.vertices.push(new THREE.Vector3(1, 2, 5));
    geo.vertices.push(new THREE.Vector3(2, 4, 5));

    const mat = new THREE.LineBasicMaterial({ lineWidth: 6, color: 0x0000ff });

    return [geo, mat];
  });

  const buildingAttributeMap = {
    0: {
      position: [0, 0, 0],
      scale: [0.013, 0.013, 0.013],
      rotation: [0, 0, 0]
    },
    1: {
      position: [12, 0, 4],
      scale: [0.05, 0.05, 0.05],
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
        position={[0, 30, 40]}
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
          {buildings.length === totalBuildings && mapTexture && (
            <group ref={container}>
              <mesh
                geometry={new THREE.PlaneGeometry(50, 50, 25, 25)}
                rotation={[THREE.Math.degToRad(-90), 0, 0]}
              >
                <meshBasicMaterial attach="material">
                  <primitive attach="map" object={mapTexture} />
                </meshBasicMaterial>
              </mesh>
              {buildings.map((building, i) => {
                const { position, rotation, scale } = buildingAttributeMap[i];

                return (
                  <group key={i.toString()}>
                    {activeBuilding === i && (
                      <group>
                        {testApartmentNumbers.map(({ position, number }) => (
                          <sprite position={position}>
                            <spriteMaterial
                              attach="material"
                              map={createTextSpriteMaterial(number.toString(), {
                                fontsize: 160
                              })}
                            />
                          </sprite>
                        ))}
                      </group>
                    )}
                    <primitive
                      object={building}
                      position={position}
                      onClick={() => {
                        setActiveBuilding(0);
                      }}
                      rotation={rotation}
                      scale={scale}
                      {...wireFrameProps[i]}
                    />
                    <line geometry={lineGeo} material={lineMat} />
                    {markerTexture && (
                      <sprite position={[0, 5, 3]}>
                        <spriteMaterial attach="material" map={markerTexture} />
                      </sprite>
                    )}
                  </group>
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
