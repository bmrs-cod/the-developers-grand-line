
import { Html } from "@react-three/drei";
import * as THREE from "three";

// Geometrias reutilizadas pelas três ilhas
const geometriaCaixa = new THREE.BoxGeometry(1, 1, 1);
const geometriaTronco = new THREE.CylinderGeometry(
  0.09, 0.15, 1.1, 8
);
const geometriaFolhas = new THREE.IcosahedronGeometry(0.48, 1);
const geometriaTelhadoCasa = new THREE.ConeGeometry(
  0.84, 0.65, 4
);

// Evita criar materiais idênticos várias vezes
const materiais = new Map();

function obterMaterial(cor) {
  if (!materiais.has(cor)) {
    materiais.set(
      cor,
      new THREE.MeshStandardMaterial({ color: cor })
    );
  }

  return materiais.get(cor);
}

function Caixa({ position, size, color, ...props }) {
  return (
    <mesh
      position={position}
      geometry={geometriaCaixa}
      material={obterMaterial(color)}
      scale={size}
      {...props}
    />
  );
}

function Arvore({ position, escala = 1 }) {
  return (
    <group position={position} scale={escala}>
      <mesh
        position={[0, 0.55, 0]}
        geometry={geometriaTronco}
        material={obterMaterial("#80512e")}
      />

      {[
        [0, 1.25, 0],
        [-0.25, 1.1, 0],
        [0.2, 1.12, 0.15],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p}
          geometry={geometriaFolhas}
          material={obterMaterial(
            i === 0 ? "#398a48" : "#56a455"
          )}
        />
      ))}
    </group>
  );
}

function Casa({ position, cor = "#fff0d4", escala = 1 }) {
  return (
    <group position={position} scale={escala}>
      <Caixa
        position={[0, 0.42, 0]}
        size={[0.95, 0.84, 0.8]}
        color={cor}
      />

      <mesh
        position={[0, 1.05, 0]}
        rotation={[0, Math.PI / 4, 0]}
        geometry={geometriaTelhadoCasa}
        material={obterMaterial("#ba493c")}
      />

      <Caixa
        position={[0, 0.27, 0.41]}
        size={[0.25, 0.5, 0.04]}
        color="#815638"
      />

      {[-0.29, 0.29].map((x) => (
        <Caixa
          key={x}
          position={[x, 0.65, 0.42]}
          size={[0.18, 0.2, 0.04]}
          color="#76bdd1"
        />
      ))}
    </group>
  );
}

function Foosha() {
  return (
    <group position={[0, 0.43, 0]}>
      <Caixa
        position={[0, 0.04, 0.8]}
        size={[0.65, 0.04, 3]}
        color="#dbc494"
      />

      <Casa position={[-1.65, 0, 0]} escala={1.2} />
      <Casa position={[0, 0, -1.6]} cor="#fae4bb" />
      <Casa position={[1.7, 0, -0.6]} escala={1.15} />
      <Casa
        position={[1.4, 0, 1.1]}
        cor="#f3e0c7"
        escala={0.8}
      />

      <Arvore position={[-2.6, 0, -1.3]} />
      <Arvore position={[2.4, 0, -1.6]} escala={0.85} />
      <Arvore position={[-2.2, 0, 1.4]} escala={0.75} />

      {/* Moinho da Vila Foosha */}
      <group position={[-0.2, 0, -0.15]}>
        <mesh position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.34, 0.52, 2.5, 10]} />
          <meshStandardMaterial color="#f4e9d3" />
        </mesh>

        <mesh position={[0, 2.72, 0]}>
          <coneGeometry args={[0.58, 0.72, 10]} />
          <meshStandardMaterial color="#b74436" />
        </mesh>

        <group position={[0, 1.8, 0.43]}>
          {[0, 1, 2, 3].map((i) => (
            <group
              key={i}
              rotation={[0, 0, i * Math.PI / 2]}
            >
              <Caixa
                position={[0, 0.72, 0]}
                size={[0.19, 1.25, 0.06]}
                color="#fff6e2"
              />
            </group>
          ))}
        </group>
      </group>

      {/* Cais */}
      <Caixa
        position={[0.4, -0.07, 3.35]}
        size={[1.1, 0.15, 1.8]}
        color="#9a633a"
      />

      {[-0.45, 0.45].map((x) => (
        <mesh
          key={x}
          position={[0.4 + x, -0.36, 3.9]}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.65, 8]} />
          <meshStandardMaterial color="#694329" />
        </mesh>
      ))}
    </group>
  );
}

function TelhadoMarinha({ y, largura, profundidade }) {
  return (
    <group position={[0, y, 0]}>
      <mesh
        rotation={[0, Math.PI / 4, 0]}
        scale={[largura, 0.36, profundidade]}
      >
        <coneGeometry args={[1, 1, 4]} />
        <meshStandardMaterial color="#315c83" />
      </mesh>

      <Caixa
        position={[0, -0.22, 0]}
        size={[
          largura * 1.35,
          0.11,
          profundidade * 1.35,
        ]}
        color="#244b70"
      />
    </group>
  );
}

function Marineford() {
  return (
    <group position={[0, 0.4, 0]}>
      {/* Muralhas */}
      <Caixa
        position={[0, 0.7, 1.55]}
        size={[6, 1.4, 0.65]}
        color="#e8e8e2"
      />

      <Caixa
        position={[-2.85, 0.65, 0]}
        size={[0.55, 1.3, 3.8]}
        color="#e8e8e2"
      />

      <Caixa
        position={[2.85, 0.65, 0]}
        size={[0.55, 1.3, 3.8]}
        color="#e8e8e2"
      />

      {/* Fortaleza principal */}
      <Caixa
        position={[0, 1.5, -0.55]}
        size={[4.8, 3, 2.5]}
        color="#f0eee6"
      />

      <TelhadoMarinha
        y={3.15}
        largura={3.15}
        profundidade={2}
      />

      <Caixa
        position={[0, 3.85, -0.55]}
        size={[3.5, 1.6, 2]}
        color="#e9e7e0"
      />

      <TelhadoMarinha
        y={4.8}
        largura={2.4}
        profundidade={1.6}
      />

      <Caixa
        position={[0, 5.35, -0.55]}
        size={[2, 1.1, 1.4]}
        color="#f2eee6"
      />

      <TelhadoMarinha
        y={6.05}
        largura={1.5}
        profundidade={1.15}
      />

      {/* Torres */}
      {[-2.35, 2.35].map((x) => (
        <group key={x}>
          <Caixa
            position={[x, 1.9, 0.4]}
            size={[1.15, 3.8, 1.15]}
            color="#e9e9e3"
          />

          <mesh position={[x, 4.1, 0.4]}>
            <coneGeometry args={[0.95, 1.1, 4]} />
            <meshStandardMaterial color="#315c83" />
          </mesh>
        </group>
      ))}

      {/* Portão */}
      <Caixa
        position={[0, 0.6, 1.92]}
        size={[1.35, 1.2, 0.1]}
        color="#244159"
      />

      {/* Janelas */}
      {[-1.5, -0.75, 0, 0.75, 1.5].map((x) => (
        <group key={x}>
          <Caixa
            position={[x, 1.65, 0.72]}
            size={[0.3, 0.5, 0.04]}
            color="#4d748b"
          />

          <Caixa
            position={[x * 0.65, 3.85, 0.48]}
            size={[0.25, 0.4, 0.04]}
            color="#4d748b"
          />
        </group>
      ))}

      <Html
        center
        position={[0, 2.4, 0.77]}
        distanceFactor={20}
      >
        <span
          style={{
            color: "#244b70",
            fontWeight: 900,
            fontSize: 24,
          }}
        >
          MARINE
        </span>
      </Html>
    </group>
  );
}

function Cupula({
  position,
  raio = 0.65,
  cor = "#7bd9ef",
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry
          args={[
            raio,
            24,
            12,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2,
          ]}
        />

        <meshStandardMaterial
          color={cor}
          metalness={0.2}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[raio, 0.045, 8, 32]} />
        <meshStandardMaterial color="#42b6da" />
      </mesh>
    </group>
  );
}

function Egghead() {
  return (
    <group position={[0, 0.43, 0]}>
      {/* Praça central */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[2.35, 2.35, 0.16, 32]} />
        <meshStandardMaterial color="#d9e8ef" />
      </mesh>

      {/* Laboratório */}
      <Caixa
        position={[0, 0.85, -0.65]}
        size={[2.7, 1.5, 1.8]}
        color="#f3f5fb"
      />

      <Caixa
        position={[0, 1.65, -0.65]}
        size={[3, 0.15, 2]}
        color="#72c9e6"
      />

      <Cupula
        position={[0, 1.75, -0.65]}
        raio={0.95}
      />

      {/* Prédios futuristas */}
      {[
        [-2, 0.2, "#80d8f0"],
        [2, 0, "#e99bcf"],
        [-1.75, 1.5, "#e99bcf"],
        [1.75, 1.5, "#80d8f0"],
      ].map(([x, z, cor], i) => (
        <group key={i} position={[x, 0, z]}>
          <Caixa
            position={[0, 0.5, 0]}
            size={[0.95, 1, 0.95]}
            color="#f1f5fb"
          />

          <Cupula
            position={[0, 1, 0]}
            raio={0.48}
            cor={cor}
          />

          <Caixa
            position={[0, 0.45, 0.49]}
            size={[0.55, 0.2, 0.03]}
            color="#69c8e9"
          />
        </group>
      ))}

      {/* Ruas */}
      <Caixa
        position={[0, 0.18, 1.8]}
        size={[0.7, 0.05, 1.9]}
        color="#6fd0e9"
      />

      <Caixa
        position={[0, 0.18, 0.2]}
        size={[4.8, 0.05, 0.22]}
        color="#6fd0e9"
      />

      {/* Painel */}
      <group position={[0, 0, 2.4]}>
        <Caixa
          position={[0, 0.75, 0]}
          size={[1.2, 0.75, 0.08]}
          color="#51c6ea"
        />

        <Html
          center
          position={[0, 0.75, 0.07]}
          distanceFactor={15}
        >
          <span
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            PUNK
          </span>
        </Html>
      </group>

      {/* Luzes */}
      {[-2.5, -1.2, 1.2, 2.5].map((x) => (
        <mesh key={x} position={[x, 0.22, 2]}>
          <sphereGeometry args={[0.11, 10, 8]} />

          <meshStandardMaterial
            color="#79f4ff"
            emissive="#38c5e9"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Ilha3D({ tipo, position, onClick }) {
  const cores = {
    foosha: "#79b96b",
    marineford: "#b3c5cb",
    egghead: "#b4e1e7",
  };

  return (
    <group position={position}>
      {/* Rocha */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[3.7, 3.1, 1.05, 32]} />
        <meshStandardMaterial color="#a57a55" flatShading />
      </mesh>

      {/* Praia */}
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[3.65, 3.7, 0.16, 32]} />
        <meshStandardMaterial color="#f2d49a" />
      </mesh>

      {/* Terreno */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[3.35, 3.4, 0.14, 32]} />
        <meshStandardMaterial color={cores[tipo]} />
      </mesh>

      {tipo === "foosha" && <Foosha />}
      {tipo === "marineford" && <Marineford />}
      {tipo === "egghead" && <Egghead />}

      {/* Área clicável da ilha */}
      <mesh
        position={[0, 1.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <cylinderGeometry args={[3.4, 3.4, 3, 20]} />

        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default Ilha3D;
