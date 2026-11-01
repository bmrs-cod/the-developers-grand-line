
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const sombra = "#366d82";
const sombraEscura = "#244e65";

function Zunesha() {
  return (
    <group scale={1.25}>
      {/* Corpo de elefante */}
      <mesh position={[0, 4.1, 0]} scale={[2.3, 1.7, 1.5]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color={sombra} flatShading />
      </mesh>

      {/* Quatro pernas longas */}
      {[-1.3, 1.3].map((x) =>
        [-0.75, 0.75].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 1.7, z]}>
            <cylinderGeometry args={[0.36, 0.5, 3.4, 7]} />
            <meshStandardMaterial color={sombraEscura} />
          </mesh>
        ))
      )}

      {/* Cabeça */}
      <mesh position={[2.1, 4.7, 0]} scale={[0.9, 1.15, 1.0]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color={sombra} />
      </mesh>

      {/* Orelhas */}
      {[-1, 1].map((lado) => (
        <mesh key={lado} position={[1.8, 4.7, lado * 1.0]} scale={[0.2, 0.85, 0.75]}>
          <sphereGeometry args={[1, 10, 8]} />
          <meshStandardMaterial color={sombraEscura} />
        </mesh>
      ))}

      {/* Tromba */}
      <mesh position={[2.8, 3.45, 0]} rotation={[0, 0, -0.16]}>
        <cylinderGeometry args={[0.2, 0.32, 2.7, 8]} />
        <meshStandardMaterial color={sombra} />
      </mesh>

      {/* Árvores sobre as costas */}
      {[-1, 0, 1].map((x) => (
        <group key={x} position={[x, 5.9, 0]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.7, 6]} />
            <meshStandardMaterial color={sombraEscura} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.55, 1.2, 7]} />
            <meshStandardMaterial color={sombraEscura} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function NavioMarinha() {
  return (
    <group scale={0.9}>
      <mesh position={[0, 0.5, 0]} scale={[2.3, 0.45, 0.8]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color={sombraEscura} />
      </mesh>

      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 3.2, 8]} />
        <meshStandardMaterial color={sombraEscura} />
      </mesh>

      <mesh position={[0, 2.2, 0]}>
        <planeGeometry args={[1.9, 2.0]} />
        <meshStandardMaterial color="#a1c3cb" side={2} />
      </mesh>

      <mesh position={[0.5, 3.55, 0]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshBasicMaterial color="#dbe5e7" side={2} />
      </mesh>
    </group>
  );
}

function FiguraMisteriosa() {
  return (
    <group scale={1.2}>
      {/* Silhueta com capa */}
      <mesh position={[0, 1.4, 0]}>
        <coneGeometry args={[0.95, 3.1, 8]} />
        <meshStandardMaterial color="#202e47" />
      </mesh>

      <mesh position={[0, 3.1, 0]}>
        <sphereGeometry args={[0.48, 12, 8]} />
        <meshStandardMaterial color="#202e47" />
      </mesh>

      {/* Coroa pontiaguda */}
      {[-0.3, 0, 0.3].map((x) => (
        <mesh key={x} position={[x, 3.8, 0]}>
          <coneGeometry args={[0.18, 0.9, 5]} />
          <meshStandardMaterial color="#202e47" />
        </mesh>
      ))}

      {/* Olhos vermelhos */}
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, 3.13, 0.43]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#e53a43" />
        </mesh>
      ))}
    </group>
  );
}

function Horizonte3D() {
  const elefante = useRef();
  const navio1 = useRef();
  const navio2 = useRef();
  const misterioso = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (elefante.current) {
      elefante.current.position.x =
        -32 + (t * 0.45) % 64;
      elefante.current.position.y =
        -1.7 + Math.sin(t * 0.4) * 0.08;
    }

    if (navio1.current) {
      navio1.current.position.x =
        32 - (t * 1.1) % 64;
      navio1.current.position.y =
        -0.2 + Math.sin(t) * 0.1;
    }

    if (navio2.current) {
      navio2.current.position.x =
        37 - (t * 0.8) % 74;
      navio2.current.position.y =
        -0.2 + Math.sin(t * 0.7) * 0.08;
    }

    if (misterioso.current) {
      misterioso.current.position.x =
        -38 + (t * 0.6) % 76;
    }
  });

  return (
    <group>
      {/* Zunesha atravessando o horizonte */}
      <group ref={elefante} position={[-32, -1.7, -35]}>
        <Zunesha />
      </group>

      {/* Navios da Marinha */}
      <group ref={navio1} position={[32, -0.2, -28]}>
        <NavioMarinha />
      </group>

      <group ref={navio2} position={[37, -0.2, -33]} scale={0.7}>
        <NavioMarinha />
      </group>

      {/* Figura misteriosa mais distante */}
      <group ref={misterioso} position={[-38, 0, -42]}>
        <FiguraMisteriosa />
      </group>
    </group>
  );
}

export default Horizonte3D;
