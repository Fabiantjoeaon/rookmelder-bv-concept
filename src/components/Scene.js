import React, { useRef, useEffect } from "react";
import { useRender, useThree } from "react-three-fiber";
import * as THREE from "three/src/Three";

const Scene = ({ building, texture }) => {
  const container = useRef();
  const controls = useRef();
  const camera = useRef();
  const { size, setDefaultCamera } = useThree();

  useEffect(() => void setDefaultCamera(camera.current), []);
  useRender(() => controls.current.update());

  return (
    <>
      <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        fov={55}
        position={[0, 0, 40]}
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
          {building && texture && (
            <group ref={container} position={[0, 0, 0]}>
              <mesh
                geometry={new THREE.PlaneGeometry(50, 50, 25, 25)}
                position={[0, 0, 0]}
                rotation={[THREE.Math.degToRad(-90), 0, 0]}
              >
                <meshBasicMaterial attach="material">
                  <primitive attach="map" object={texture} />
                </meshBasicMaterial>
              </mesh>
              <primitive
                object={building}
                scale={new THREE.Vector3(-0.05, -0.05, -0.05)}
                position={[0, 8, 0]}
                rotation={new THREE.Euler(0, 0, 0)}
              />
            </group>
          )}
        </>
      )}
    </>
  );
};

export default Scene;
