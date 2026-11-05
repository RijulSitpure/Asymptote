class Solution:
    def minimumOperationsToMakeKPeriodic(self, word: str, k: int) -> int:
        n = len(word)
        counts = {}
        for i in range(0, n, k):
            sub = word[i:i + k]
            counts[sub] = counts.get(sub, 0) + 1
        return (n // k) - max(counts.values())
