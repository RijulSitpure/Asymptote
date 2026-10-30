from typing import List

class Solution:
    def divideString(self, s: str, k: int, fill: str) -> List[str]:
        res = []
        for i in range(0, len(s), k):
            chunk = s[i:i + k]
            if len(chunk) < k:
                chunk += fill * (k - len(chunk))
            res.append(chunk)
        return res
