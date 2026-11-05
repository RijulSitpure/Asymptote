class Solution:
    def stringHash(self, s: str, k: int) -> str:
        n = len(s)
        res = []
        for i in range(0, n, k):
            block = s[i:i + k]
            total = sum(ord(c) - ord('a') for c in block)
            res.append(chr(ord('a') + (total % 26)))
        return "".join(res)
