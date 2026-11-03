from collections import Counter

class Solution:
    def minimumPushes(self, word: str) -> int:
        counts = sorted(Counter(word).values(), reverse=True)
        ans = 0
        for i, c in enumerate(counts):
            ans += (i // 8 + 1) * c
        return ans
