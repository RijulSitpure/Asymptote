class Solution:
    def longestString(self, x: int, y: int, z: int) -> int:
        pairs = min(x, y)
        extra = 1 if x != y else 0
        return (2 * pairs + extra + z) * 2
