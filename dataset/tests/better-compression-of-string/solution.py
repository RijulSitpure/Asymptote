class Solution:
    def betterCompression(self, compressed: str) -> str:
        counts = [0] * 26
        n = len(compressed)
        i = 0
        while i < n:
            ch = compressed[i]
            i += 1
            val = 0
            while i < n and compressed[i].isdigit():
                val = val * 10 + int(compressed[i])
                i += 1
            counts[ord(ch) - ord('a')] += val
        
        res = []
        for c in range(26):
            if counts[c] > 0:
                res.append(f"{chr(ord('a') + c)}{counts[c]}")
        return "".join(res)