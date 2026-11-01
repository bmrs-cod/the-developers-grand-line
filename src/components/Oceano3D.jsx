
import { useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Oceano3D({ tema = "claro" }) {
  const modoNoite = tema === "escuro";

  const geometria = useMemo(() => {
    return new THREE.PlaneGeometry(100, 100, 64, 64);
  }, []);

  useEffect(() => {
    return () => geometria.dispose();
  }, [geometria]);

  useFrame(({ clock }) => {
    const tempo = clock.getElapsedTime();
    const posicoes = geometria.attributes.position;

    for (let i = 0; i < posicoes.count; i++) {
      const x = posicoes.getX(i);
      const y = posicoes.getY(i);

      // Ondas principais
      const onda1 =
        Math.sin(x * 0.45 + tempo * 0.9) * 0.2;

      // Ondas secundárias
      const onda2 =
        Math.cos(y * 0.35 + tempo * 0.7) * 0.14;

      // Ondulações menores
      const onda3 =
        Math.sin((x + y) * 0.6 + tempo * 1.2) * 0.06;

      posicoes.setZ(i, onda1 + onda2 + onda3);
    }

    posicoes.needsUpdate = true;
    geometria.computeVertexNormals();
  });

  return (
    <mesh
      geometry={geometria}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.55, 0]}
    >
      <meshStandardMaterial
        color={modoNoite ? "#064365" : "#087eb5"}
        roughness={modoNoite ? 0.25 : 0.35}
        metalness={modoNoite ? 0.25 : 0.12}
        side={THREE.DoubleSide}
        flatShading={false}
      />
    </mesh>
  );
}

export default Oceano3D;
