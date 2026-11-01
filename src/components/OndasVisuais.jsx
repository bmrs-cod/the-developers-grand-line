
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OndasVisuais({ tema = "claro" }) {
  const ondas = useRef([]);
  const modoNoite = tema === "escuro";

  const dados = useMemo(() => {
    return Array.from({ length: 65 }, (_, i) => {
      const x = ((i * 17.3) % 80) - 40;
      const z = ((i * 11.7) % 65) - 30;

      return {
        x,
        z,
        escala: 0.55 + ((i * 7) % 10) / 10,
        velocidade: 0.3 + (i % 5) * 0.08,
        fase: i * 0.7,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    const tempo = clock.getElapsedTime();

    ondas.current.forEach((onda, i) => {
      if (!onda) return;

      const item = dados[i];

      const x =
        item.x + Math.sin(tempo * 0.3 + item.fase) * 0.4;

      const z =
        item.z + Math.cos(tempo * 0.2 + item.fase) * 0.3;

      onda.position.x = x;
      onda.position.z = z;

      // Mantém a espuma acompanhando as ondas do oceano
      const altura =
        Math.sin(x * 0.45 + tempo * 0.9) * 0.2 +
        Math.cos(-z * 0.35 + tempo * 0.7) * 0.14 +
        Math.sin((x - z) * 0.6 + tempo * 1.2) * 0.06;

      onda.position.y = -0.55 + altura + 0.055;

      // Espuma um pouco mais visível durante a noite
      const brilho =
        (Math.sin(tempo * item.velocidade + item.fase) + 1) *
        0.18;

      onda.material.opacity = modoNoite
        ? 0.55 + brilho
        : 0.4 + brilho;
    });
  });

  return (
    <group>
      {dados.map((item, i) => (
        <mesh
          key={i}
          ref={(elemento) => {
            ondas.current[i] = elemento;
          }}
          position={[item.x, -0.45, item.z]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[item.escala, item.escala * 0.55, 1]}
        >
          <torusGeometry
            args={[1.25, 0.045, 6, 28, Math.PI * 0.85]}
          />

          <meshBasicMaterial
            color={modoNoite ? "#cceeff" : "#f2ffff"}
            transparent
            opacity={modoNoite ? 0.7 : 0.55}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default OndasVisuais;
