from typing import List
from collections import deque

class Solution:
    def maxScore(self, n: int, edges: List[List[int]]) -> int:
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)
        seen = [False] * n
        cycle_sizes = []
        path_sizes = []
        for i in range(n):
            if seen[i]:
                continue
            comp = [i]
            seen[i] = True
            for u in comp:
                for v in graph[u]:
                    if not seen[v]:
                        seen[v] = True
                        comp.append(v)
            if all(len(graph[u]) == 2 for u in comp):
                cycle_sizes.append(len(comp))
            elif len(comp) > 1:
                path_sizes.append(len(comp))

        ans = 0
        rem_n = n
        for sz in cycle_sizes:
            left, right = rem_n - sz + 1, rem_n
            w = deque([right, right])
            score = 0
            for val in range(right - 1, left - 1, -1):
                fv = w.popleft()
                score += fv * val
                w.append(val)
            ans += score + w[0] * w[1]
            rem_n -= sz

        for sz in path_sizes:
            left, right = rem_n - sz + 1, rem_n
            w = deque([right, right])
            score = 0
            for val in range(right - 1, left - 1, -1):
                fv = w.popleft()
                score += fv * val
                w.append(val)
            ans += score
            rem_n -= sz
        return ans

def run_tests():
    s = Solution()
    res = s.maxScore(3, [[0, 1], [1, 2], [2, 0]])
    assert res == 11, f"Expected 11, got {res}"
    print("3547 maximum-sum-of-edge-values-in-a-graph PASSED")

if __name__ == "__main__":
    run_tests()
