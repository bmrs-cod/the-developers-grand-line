
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Nuvem({ position, escala = 1, modoNoite = false }) {
  return (
    <group position={position} scale={escala}>
      {[
        [-1.1, 0, 0, 0.9],
        [0, 0.25, 0, 1.2],
        [1.1, 0, 0, 0.9],
        [0.6, 0.65, -0.1, 0.75],
      ].map(([x, y, z, tamanho], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[tamanho, 12, 8]} />
          <meshStandardMaterial
            color={modoNoite ? "#728aa8" : "#ffffff"}
            transparent
            opacity={modoNoite ? 0.55 : 0.75}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Nuvens3D({ tema = "claro" }) {
  const nuvens = useRef([]);
  const modoNoite = tema === "escuro";

  useFrame(({ clock }) => {
    const tempo = clock.getElapsedTime();

    nuvens.current.forEach((nuvem, i) => {
      if (!nuvem) return;

      const velocidade = 0.15 + i * 0.05;

      nuvem.position.x =
        -26 + ((tempo * velocidade + i * 13) % 52);
    });
  });

  return (
    <group>
      {[
        { x: -20, y: 12, z: -24, s: 2 },
        { x: -5, y: 15, z: -30, s: 2.8 },
        { x: 15, y: 11, z: -26, s: 1.8 },
        { x: 25, y: 17, z: -38, s: 3 },
      ].map((item, i) => (
        <group
          key={i}
          ref={(elemento) => {
            nuvens.current[i] = elemento;
          }}
          position={[item.x, item.y, item.z]}
        >
          <Nuvem
            position={[0, 0, 0]}
            escala={item.s}
            modoNoite={modoNoite}
          />
        </group>
      ))}
    </group>
  );
}

export default Nuvens3D;
