class Solution:
    def minimumDeletions(self, word: str, k: int) -> int:
        from collections import Counter
        counts = list(Counter(word).values())
        ans = float('inf')
        for f in counts:
            deletions = 0
            for c in counts:
                if c < f:
                    deletions += c
                elif c > f + k:
                    deletions += c - (f + k)
            ans = min(ans, deletions)
        return ans
