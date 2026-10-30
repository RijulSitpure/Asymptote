class Solution:
    def putMarbles(self, weights: list[int], k: int) -> int:
        if k == 1 or k == len(weights):
            return 0
        pairs = sorted(weights[i] + weights[i + 1] for i in range(len(weights) - 1))
        return sum(pairs[-(k - 1):]) - sum(pairs[:k - 1])
