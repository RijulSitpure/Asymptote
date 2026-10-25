from collections import defaultdict

class Solution:
    def frogPosition(self, n: int, edges: list[list[int]], t: int, target: int) -> float:
        if n == 1:
            return 1.0
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        visited = set([1])
        prob = {1: 1.0}
        q = [(1, 0)]
        while q:
            u, time_spent = q.pop(0)
            unvisited = [v for v in adj[u] if v not in visited]
            count = len(unvisited)
            if u == target:
                if time_spent == t or (time_spent < t and count == 0):
                    return prob[u]
                return 0.0
            if time_spent < t and count > 0:
                for v in unvisited:
                    visited.add(v)
                    prob[v] = prob[u] / count
                    q.append((v, time_spent + 1))
        return 0.0

def test():
    sol = Solution()
    assert sol.frogPosition(7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 2, 4) == 0.16666666666666666, "test 1 failed"
    assert sol.frogPosition(7, [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], 1, 7) == 0.3333333333333333, "test 2 failed"
    print("✓ frog-position-after-t-seconds passed")

if __name__ == "__main__":
    test()
