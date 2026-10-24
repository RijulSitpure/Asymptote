from typing import List

class Solution:
    def assignBikes(self, workers: List[List[int]], bikes: List[List[int]]) -> int:
        n, m = len(workers), len(bikes)
        memo = {}

        def dfs(w: int, mask: int) -> int:
            if w == n:
                return 0
            state = (w, mask)
            if state in memo:
                return memo[state]
            res = float('inf')
            wx, wy = workers[w]
            for b in range(m):
                if not (mask & (1 << b)):
                    d = abs(wx - bikes[b][0]) + abs(wy - bikes[b][1])
                    res = min(res, d + dfs(w + 1, mask | (1 << b)))
            memo[state] = res
            return res

        return dfs(0, 0)

def test():
    sol = Solution()
    w1 = [[0,0],[2,1]]
    b1 = [[1,2],[3,3]]
    assert sol.assignBikes(w1, b1) == 6, "test 1 failed"
    w2 = [[0,0],[1,1],[2,0]]
    b2 = [[1,0],[2,2],[2,1]]
    assert sol.assignBikes(w2, b2) == 4, "test 2 failed"
    print("✓ campus-bikes-ii passed")

if __name__ == "__main__":
    test()
