from typing import List

class Solution:
    def subtreeInversionSum(self, edges: List[List[int]], nums: List[int], k: int) -> int:
        n = len(edges) + 1
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)
        parent = [-1] * n
        memo = {}

        def dfs(u: int, steps: int, inverted: bool) -> int:
            state = (u, steps, inverted)
            if state in memo:
                return memo[state]
            val = -nums[u] if inverted else nums[u]
            neg_val = -val
            for v in graph[u]:
                if v != parent[u]:
                    parent[v] = u
                    val += dfs(v, min(k, steps + 1), inverted)
                    if steps == k:
                        neg_val += dfs(v, 1, not inverted)
            res = max(val, neg_val) if steps == k else val
            memo[state] = res
            return res

        return dfs(0, k, False)

def run_tests():
    s = Solution()
    res = s.subtreeInversionSum([[0, 1], [0, 2]], [1, 2, 3], 1)
    assert res == 6, f"Expected 6, got {res}"
    print("3544 subtree-inversion-sum PASSED")

if __name__ == "__main__":
    run_tests()
