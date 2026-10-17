
/**
 * ArchitecturalBackground
 * High-precision architectural drafting grid inspired by Abatable.
 * Features:
 * - 64px square checkered drafting grid.
 * - Boundary-to-center vignette fade (crisper framing grid along edges, smooth soft spotlight in center for content readability).
 * - Warm ambient radial glow.
 * - Terracotta registration crosshairs (+) at perimeter coordinates.
 */
export function ArchitecturalBackground() {
  return (
    <div className="architectural-grid-canvas" aria-hidden="true">
      {/* Warm ambient backlight */}
      <div className="architectural-ambient-glow" />

      {/* Checkered drafting grid with boundary-to-center vignette fade */}
      <div className="architectural-grid-pattern" />

      {/* Architectural registration crosshair marks (+) */}
      {/* Top perimeter */}
      <span className="architectural-crosshair top-4 left-6 sm:left-12">+</span>
      <span className="architectural-crosshair top-4 left-1/2 -translate-x-1/2 hidden md:block">+</span>
      <span className="architectural-crosshair top-4 right-6 sm:right-12">+</span>

      {/* Mid perimeter */}
      <span className="architectural-crosshair top-1/2 left-6 sm:left-12 -translate-y-1/2 hidden sm:block">+</span>
      <span className="architectural-crosshair top-1/2 right-6 sm:right-12 -translate-y-1/2 hidden sm:block">+</span>

      {/* Bottom perimeter */}
      <span className="architectural-crosshair bottom-6 left-6 sm:left-12">+</span>
      <span className="architectural-crosshair bottom-6 left-1/2 -translate-x-1/2 hidden md:block">+</span>
      <span className="architectural-crosshair bottom-6 right-6 sm:right-12">+</span>
    </div>
  );
}
