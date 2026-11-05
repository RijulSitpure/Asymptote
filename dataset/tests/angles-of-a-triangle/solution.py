import math

def triangleAngles(a: float, b: float, c: float) -> list[float]:
    sides = sorted([a, b, c])
    if sides[0] + sides[1] <= sides[2]:
        return []
    
    def get_angle(x: float, y: float, z: float) -> float:
        cos_val = (y**2 + z**2 - x**2) / (2 * y * z)
        cos_val = max(-1.0, min(1.0, cos_val))
        return math.degrees(math.acos(cos_val))

    ang_a = get_angle(a, b, c)
    ang_b = get_angle(b, a, c)
    ang_c = get_angle(c, a, b)
    return sorted([round(ang_a, 2), round(ang_b, 2), round(ang_c, 2)])