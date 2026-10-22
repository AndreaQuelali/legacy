"use client"

import { Environment, Lightformer } from "@react-three/drei"

/**
 * Self-contained studio lighting. Replaces drei's `preset` environments,
 * which download multi-megabyte HDR files from a third-party CDN at runtime.
 */
export default function LocalEnvironment() {
  return (
    <Environment resolution={128} frames={1}>
      <Lightformer form="rect" intensity={2.5} position={[0, 5, -6]} scale={[12, 3, 1]} />
      <Lightformer form="rect" intensity={1.5} position={[-5, 1, -2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 4, 1]} />
      <Lightformer form="rect" intensity={1.5} position={[5, 1, -2]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 4, 1]} />
      <Lightformer form="ring" color="#eab308" intensity={1.2} position={[0, 2, 6]} scale={4} />
    </Environment>
  )
}
