from typing import List
from collections import deque

class Solution:
    def assignEdgeWeights(self, edges: List[List[int]]) -> int:
        MOD = 1_000_000_007
        n = len(edges) + 1

        graph = [[] for _ in range(n + 1)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        queue = deque([1])
        seen = [False] * (n + 1)
        seen[1] = True

        max_depth = -1
        while queue:
            for _ in range(len(queue)):
                u = queue.popleft()
                for v in graph[u]:
                    if not seen[v]:
                        seen[v] = True
                        queue.append(v)
            max_depth += 1

        if max_depth <= 0:
            return 0

        return pow(2, max_depth - 1, MOD)

def run_tests():
    s = Solution()
    res = s.assignEdgeWeights([[1, 2], [2, 3]])
    assert res == 2, f"Expected 2, got {res}"
    print("3558 number-of-ways-to-assign-edge-weights-i PASSED")

if __name__ == "__main__":
    run_tests()
