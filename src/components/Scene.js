import React, { useRef } from "react";
import { useRender, useThree } from "react-three-fiber";
import * as THREE from "three/src/Three";

const Scene = ({ building, texture }) => {
  const container = useRef();
  const { camera } = useThree;
  console.log(container);
  useRender(() => {
    // container.current.rotation.y += 0.01;
  });

  return (
    <>
      <ambientLight color="lightblue" />
      <pointLight color="white" intensity={1} position={[10, 10, 10]} />
      <object3D ref={container}>
        <mesh
          geometry={new THREE.PlaneGeometry(1000, 1000, 250, 250)}
          position={[0, -100, -750]}
          rotation={new THREE.Euler(250, 0, 0)}
        >
          <meshBasicMaterial attach="material">
            <primitive attach="map" object={texture} />
          </meshBasicMaterial>
        </mesh>
        {building && (
          <primitive
            object={building}
            scale={new THREE.Vector3(-0.05, -0.05, -0.05)}
            position={[0, 0, -20]}
            rotation={new THREE.Euler(250, 0, 0)}
          />
        )}
      </object3D>
    </>
  );
};

export default Scene;
