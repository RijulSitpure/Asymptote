import math
from collections import Counter

class Solution:
    def mostFrequentPrime(self, mat: list[list[int]]) -> int:
        def is_prime(x: int) -> bool:
            if x < 2:
                return False
            for i in range(2, math.isqrt(x) + 1):
                if x % i == 0:
                    return False
            return True

        m, n = len(mat), len(mat[0])
        cnt = Counter()
        dirs = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]
        for i in range(m):
            for j in range(n):
                for dr, dc in dirs:
                    r, c = i + dr, j + dc
                    v = mat[i][j]
                    while 0 <= r < m and 0 <= c < n:
                        v = v * 10 + mat[r][c]
                        if is_prime(v):
                            cnt[v] += 1
                        r += dr
                        c += dc
        if not cnt:
            return -1
        max_freq = max(cnt.values())
        return max(v for v, c in cnt.items() if c == max_freq)
