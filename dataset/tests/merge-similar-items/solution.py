from collections import defaultdict

class Solution:
    def mergeSimilarItems(self, items1: list[list[int]], items2: list[list[int]]) -> list[list[int]]:
        weights = defaultdict(int)
        for v, w in items1 + items2:
            weights[v] += w
        return [[v, weights[v]] for v in sorted(weights)]
