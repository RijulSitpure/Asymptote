from typing import List

class Solution:
    def maxWeight(self, n: int, edges: List[List[int]], k: int, t: int) -> int:
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))
        dp = [set() for _ in range(n)]
        for u in range(n):
            dp[u].add(0)
        for _ in range(k):
            new_dp = [set() for _ in range(n)]
            for u in range(n):
                for s in dp[u]:
                    for v, w in graph[u]:
                        if s + w < t:
                            new_dp[v].add(s + w)
            dp = new_dp
        ans = -1
        for u in range(n):
            if dp[u]:
                ans = max(ans, max(dp[u]))
        return ans

def run_tests():
    s = Solution()
    res = s.maxWeight(3, [[0, 1, 2], [1, 2, 3]], 2, 10)
    assert res == 5, f"Expected 5, got {res}"
    print("3543 maximum-weighted-k-edge-path PASSED")

if __name__ == "__main__":
    run_tests()
