class Solution:
    def edgeScore(self, edges: list[int]) -> int:
        n = len(edges)
        scores = [0] * n
        for i, target in enumerate(edges):
            scores[target] += i
        best_node = 0
        max_score = -1
        for i in range(n):
            if scores[i] > max_score:
                max_score = scores[i]
                best_node = i
        return best_node
