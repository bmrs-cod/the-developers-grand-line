
import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

function Navio3D() {
  const navio = useRef(null);

  // Carrega o modelo do Going Merry
  
const gltf = useLoader(
  GLTFLoader,
  "/models/going-merry/going-merry-otimizado.glb"
);


  // Ajusta o tamanho e centraliza somente ao carregar
  const modelo = useMemo(() => {
    const copia = gltf.scene.clone(true);

    copia.updateMatrixWorld(true);

    const caixa = new THREE.Box3().setFromObject(copia);
    const tamanho = caixa.getSize(new THREE.Vector3());
    const centro = caixa.getCenter(new THREE.Vector3());

    const maiorDimensao = Math.max(
      tamanho.x,
      tamanho.y,
      tamanho.z
    );

    const escala =
      maiorDimensao > 0 ? 7 / maiorDimensao : 1;

    copia.position.set(
      -centro.x,
      -caixa.min.y,
      -centro.z
    );

    const grupo = new THREE.Group();
    grupo.scale.setScalar(escala);
    grupo.add(copia);

    return grupo;
  }, [gltf.scene]);

  // Rotação suave com o mouse
  useFrame(({ pointer }, delta) => {
    if (!navio.current) return;

    const rotacaoHorizontal =
      -0.35 + pointer.x * Math.PI;

    const rotacaoVertical =
      -pointer.y * 0.12;

    const suavidade = 1 - Math.exp(-3 * delta);

    navio.current.rotation.y = THREE.MathUtils.lerp(
      navio.current.rotation.y,
      rotacaoHorizontal,
      suavidade
    );

    navio.current.rotation.x = THREE.MathUtils.lerp(
      navio.current.rotation.x,
      rotacaoVertical,
      suavidade
    );

  });

  return (
    <group
      ref={navio}
      position={[0, -1.1, 0]}
    >
      <primitive object={modelo} />
    </group>
  );
}

export default Navio3D;
