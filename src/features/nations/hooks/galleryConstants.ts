export const GOLDEN_RATIO = 1.61803398875

export const IDLE_FRAME_WIDTH = 13.0
export const IDLE_FRAME_HEIGHT = IDLE_FRAME_WIDTH * GOLDEN_RATIO
export const IDLE_SPACING = 16.2
export const TOTAL_CARDS = 6

export const TARGET_BALL_DIAMETER = 2.0
export const BALL_RADIUS = TARGET_BALL_DIAMETER / 2
// Keeps the intro-ball inside the visible camera frustum.
export const BALL_PEAK_MAX = 3.2
export const FLOOR_Y = -IDLE_FRAME_HEIGHT / 2 - 0.1 + BALL_RADIUS
export const FLOOR_Z = 2.5

export const CARD_X_POSITIONS: number[] = Array.from({ length: TOTAL_CARDS }, (_, i) => {
  const normalizedPos = i / (TOTAL_CARDS - 1) - 0.5
  return normalizedPos * (TOTAL_CARDS - 1) * IDLE_SPACING
})

/** Matches idle frame Z curve in PlayerGallery3D */
export function cardZAtIndex(index: number, total = TOTAL_CARDS): number {
  const normalizedPos = index / (total - 1) - 0.5
  const absNorm = Math.abs(normalizedPos) * 2
  return -(absNorm * absNorm) * 2.5
}

export const ROLL_ENTRY_X = CARD_X_POSITIONS[0] - 38
export const ROLL_EXIT_X = CARD_X_POSITIONS[TOTAL_CARDS - 1] + 24
