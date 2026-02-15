"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

// Website building block component
function WebsiteBlock({
  position,
  size,
  color,
  delay = 0,
  label,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  delay?: number;
  label: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1] + 8;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Animate entry with delay
    const animProgress = Math.min(1, Math.max(0, (time - delay) / 1.5));
    const eased = 1 - Math.pow(1 - animProgress, 3);

    meshRef.current.position.y = THREE.MathUtils.lerp(
      initialY,
      position[1],
      eased
    );

    // Subtle floating animation after entry
    if (animProgress >= 1) {
      meshRef.current.position.y +=
        Math.sin(time * 0.5 + delay * 2) * 0.02;
    }

    // Rotation based on mouse
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.02;
    meshRef.current.rotation.y = Math.cos(time * 0.2) * 0.02;

    // Scale animation
    const scale = eased;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <RoundedBox
      ref={meshRef}
      position={[position[0], initialY, position[2]]}
      args={size}
      radius={0.05}
      smoothness={4}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.1}
        roughness={0.3}
        envMapIntensity={0.8}
      />
    </RoundedBox>
  );
}

// Glowing accent sphere
function GlowingSphere({
  position,
  size = 0.15,
  color = "#f59e0b",
}: {
  position: [number, number, number];
  size?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
    const scale = 1 + Math.sin(time * 3) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

// Connection lines between blocks
function ConnectionLine({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const points = useMemo(() => {
    return [start, end] as [number, number, number][];
  }, [start, end]);

  return (
    <Line
      points={points}
      color="#f59e0b"
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
}

// Main scene with all elements
function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle rotation following mouse
    const mouseX = state.pointer.x * 0.1;
    const mouseY = state.pointer.y * 0.05;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseY,
      0.02
    );
  });

  // Website structure blocks
  const blocks = [
    // Header
    { pos: [0, 1.5, 0] as [number, number, number], size: [3, 0.4, 0.1] as [number, number, number], color: "#1e293b", delay: 0.2, label: "Header" },
    // Hero section
    { pos: [0, 0.8, 0] as [number, number, number], size: [3, 0.8, 0.1] as [number, number, number], color: "#334155", delay: 0.5, label: "Hero" },
    // Content blocks
    { pos: [-0.8, -0.1, 0] as [number, number, number], size: [1.2, 0.6, 0.1] as [number, number, number], color: "#475569", delay: 0.8, label: "Content" },
    { pos: [0.8, -0.1, 0] as [number, number, number], size: [1.2, 0.6, 0.1] as [number, number, number], color: "#475569", delay: 1.0, label: "Content" },
    // Features
    { pos: [-1, -0.9, 0] as [number, number, number], size: [0.8, 0.5, 0.1] as [number, number, number], color: "#64748b", delay: 1.3, label: "Feature" },
    { pos: [0, -0.9, 0] as [number, number, number], size: [0.8, 0.5, 0.1] as [number, number, number], color: "#64748b", delay: 1.5, label: "Feature" },
    { pos: [1, -0.9, 0] as [number, number, number], size: [0.8, 0.5, 0.1] as [number, number, number], color: "#64748b", delay: 1.7, label: "Feature" },
    // Footer
    { pos: [0, -1.5, 0] as [number, number, number], size: [3, 0.3, 0.1] as [number, number, number], color: "#1e293b", delay: 2.0, label: "Footer" },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Website blocks */}
      {blocks.map((block, i) => (
        <WebsiteBlock
          key={i}
          position={block.pos}
          size={block.size}
          color={block.color}
          delay={block.delay}
          label={block.label}
        />
      ))}

      {/* Accent elements */}
      <GlowingSphere position={[1.8, 1.5, 0.2]} size={0.08} />
      <GlowingSphere position={[-1.8, 0.5, 0.15]} size={0.06} color="#60a5fa" />
      <GlowingSphere position={[1.5, -0.5, 0.2]} size={0.05} color="#a78bfa" />

      {/* Connection lines */}
      <ConnectionLine start={[-1.5, 1.5, 0.1]} end={[-1.5, -1.5, 0.1]} />
      <ConnectionLine start={[1.5, 1.5, 0.1]} end={[1.5, -1.5, 0.1]} />

      {/* Glass panel behind */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[0, 0, -0.5]} scale={[4, 4, 0.02]}>
          <boxGeometry />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.1}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            metalness={0}
            roughness={0}
            color="#1e293b"
            transmission={0.95}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["transparent"]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#60a5fa" />
        <pointLight position={[0, 2, 3]} intensity={0.5} color="#f59e0b" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Main scene */}
        <Scene />
      </Canvas>
    </div>
  );
}
