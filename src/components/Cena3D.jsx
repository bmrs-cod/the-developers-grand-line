
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

import Navio3D from "./Navio3D";
import Oceano3D from "./Oceano3D";
import Ilha3D from "./Ilha3D";
import Nuvens3D from "./Nuvens3D";
import OndasVisuais from "./OndasVisuais";

function Cena3D({ tema = "claro" }) {
  const navigate = useNavigate();

  const modoNoite = tema === "escuro";

  return (
    <Canvas
      camera={{
        position: [0, 13, 29],
        fov: 48,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        powerPreference: "low-power",
      }}
    >
      {/* Céu e horizonte */}
      <color
        attach="background"
        args={[modoNoite ? "#071526" : "#89cde9"]}
      />

      <fog
        attach="fog"
        args={[
          modoNoite ? "#071526" : "#89cde9",
          45,
          100,
        ]}
      />

      {/* Iluminação do cenário */}
      <ambientLight
        intensity={modoNoite ? 0.85 : 1.8}
      />

      <directionalLight
        position={[-8, 15, 8]}
        intensity={modoNoite ? 1.4 : 2.7}
        color={modoNoite ? "#a9c9ff" : "#ffffff"}
      />

      {/* Luz suave da lua */}
      {modoNoite && (
        <directionalLight
          position={[12, 18, -10]}
          intensity={0.7}
          color="#8ebeff"
        />
      )}

      {/* Mar e espuma */}
      <Oceano3D tema={tema} />
      <OndasVisuais tema={tema} />

      {/* Nuvens 3D */}
      <Nuvens3D tema={tema} />

      
{/* Going Merry com iluminação noturna */}
<Suspense fallback={null}>
  {modoNoite && (
    <>
      <pointLight
        position={[0, 6, 5]}
        color="#a8d8ff"
        intensity={35}
        distance={18}
        decay={2}
      />

      <pointLight
        position={[-3, 3, -2]}
        color="#d6eaff"
        intensity={12}
        distance={10}
        decay={2}
      />
    </>
  )}

  <Navio3D />
</Suspense>


      {/* Vila Foosha */}
      <Ilha3D
        tipo="foosha"
        nome="Início"
        position={[-12, -0.3, 1]}
        onClick={() => navigate("/")}
      />

      {/* Marineford */}
      <Ilha3D
        tipo="marineford"
        nome="Contato"
        position={[0, -0.3, -17]}
        onClick={() => navigate("/contato")}
      />

      {/* Egghead */}
      <Ilha3D
        tipo="egghead"
        nome="Projetos"
        position={[12, -0.3, 1]}
        onClick={() => navigate("/projetos")}
      />
    </Canvas>
  );
}

export default Cena3D;
