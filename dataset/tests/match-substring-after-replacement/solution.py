class Solution:
    def matchReplacement(self, s: str, sub: str, mappings: list[list[str]]) -> bool:
        allowed = set((u, v) for u, v in mappings)
        n, m = len(s), len(sub)
        for i in range(n - m + 1):
            matched = True
            for j in range(m):
                sc, tc = s[i + j], sub[j]
                if sc != tc and (tc, sc) not in allowed:
                    matched = False
                    break
            if matched:
                return True
        return False
