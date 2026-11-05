from collections import Counter

class Solution:
    def isPossibleToRearrange(self, s: str, t: str, k: int) -> bool:
        n = len(s)
        sz = n // k
        chunks_s = [s[i:i + sz] for i in range(0, n, sz)]
        chunks_t = [t[i:i + sz] for i in range(0, n, sz)]
        return Counter(chunks_s) == Counter(chunks_t)
