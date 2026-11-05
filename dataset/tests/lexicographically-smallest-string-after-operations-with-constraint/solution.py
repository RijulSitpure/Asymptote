class Solution:
    def getSmallestString(self, s: str, k: int) -> str:
        res = []
        for ch in s:
            diff = ord(ch) - ord('a')
            dist = min(diff, 26 - diff)
            if dist <= k:
                res.append('a')
                k -= dist
            else:
                res.append(chr(ord(ch) - k))
                k = 0
        return ''.join(res)
