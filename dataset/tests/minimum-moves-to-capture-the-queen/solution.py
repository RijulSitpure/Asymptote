class Solution:
    def minMovesToCaptureTheQueen(self, a: int, b: int, c: int, d: int, e: int, f: int) -> int:
        if a == e:
            if not (c == a and min(b, f) < d < max(b, f)):
                return 1
        if b == f:
            if not (d == b and min(a, e) < c < max(a, e)):
                return 1
        if abs(c - e) == abs(d - f):
            rook_blocks = (abs(c - a) == abs(d - b) and abs(e - a) == abs(f - b) and min(c, e) < a < max(c, e) and min(d, f) < b < max(d, f))
            if not rook_blocks:
                return 1
        return 2
