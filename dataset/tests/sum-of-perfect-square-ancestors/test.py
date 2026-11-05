import math

class Solution:
    def sumOfPerfectSquareAncestors(self, n: int, edges: list[list[int]], vals: list[int]) -> list[int]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        def is_square(x: int) -> bool:
            if x < 0: return False
            r = int(math.isqrt(x))
            return r * r == x
            
        res = [0] * n
        def dfs(u: int, p: int, cur_sum: int):
            res[u] = cur_sum
            next_sum = cur_sum + (vals[u] if is_square(vals[u]) else 0)
            for v in adj[u]:
                if v != p:
                    dfs(v, u, next_sum)
                    
        dfs(0, -1, 0)
        return res

def run_tests():
    sol = Solution()
    # Tree: 0(val=4) -> 1(val=3) -> 2(val=9)
    # Node 0 has no ancestors -> 0
    # Node 1 has ancestor 0 (val 4 is square) -> 4
    # Node 2 has ancestors 0(4) and 1(3) -> 4
    assert sol.sumOfPerfectSquareAncestors(3, [[0, 1], [1, 2]], [4, 3, 9]) == [0, 4, 4]
    # Single node tree
    assert sol.sumOfPerfectSquareAncestors(1, [], [16]) == [0]
    print("All tests passed for 3715.")

if __name__ == "__main__":
    run_tests()