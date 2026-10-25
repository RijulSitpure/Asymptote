import heapq

class Solution:
    def maxProbability(self, n: int, edges: list[list[int]], succProb: list[float], start_node: int, end_node: int) -> float:
        graph = [[] for _ in range(n)]
        for (u, v), p in zip(edges, succProb):
            graph[u].append((v, p))
            graph[v].append((u, p))
        prob = [0.0] * n
        prob[start_node] = 1.0
        pq = [(-1.0, start_node)]
        while pq:
            p_neg, u = heapq.heappop(pq)
            cur_p = -p_neg
            if u == end_node:
                return cur_p
            if cur_p < prob[u]:
                continue
            for v, weight in graph[u]:
                if cur_p * weight > prob[v]:
                    prob[v] = cur_p * weight
                    heapq.heappush(pq, (-prob[v], v))
        return 0.0

def test():
    sol = Solution()
    assert sol.maxProbability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2) == 0.25, "test 1 failed"
    assert sol.maxProbability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.3], 0, 2) == 0.3, "test 2 failed"
    assert sol.maxProbability(3, [[0,1]], [0.5], 0, 2) == 0, "test 3 failed"
    print("✓ path-with-maximum-probability passed")

if __name__ == "__main__":
    test()
