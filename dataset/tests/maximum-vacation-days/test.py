import sys
from typing import List

class Solution:
    def maxVacationDays(self, flights: List[List[int]], days: List[List[int]]) -> int:
        n = len(flights)
        k = len(days[0])
        dp = [-1] * n
        dp[0] = 0

        for w in range(k):
            next_dp = [-1] * n
            for curr in range(n):
                if dp[curr] == -1:
                    continue
                for dest in range(n):
                    if dest == curr or flights[curr][dest] == 1:
                        val = dp[curr] + days[dest][w]
                        if val > next_dp[dest]:
                            next_dp[dest] = val
            dp = next_dp

        return max(dp)

def test():
    sol = Solution()
    f1 = [[0,1,1],[1,0,1],[1,1,0]]
    d1 = [[1,3,1],[6,0,3],[3,3,3]]
    assert sol.maxVacationDays(f1, d1) == 12, "test 1 failed"
    f2 = [[0,0,0],[0,0,0],[0,0,0]]
    d2 = [[1,1,1],[7,7,7],[7,7,7]]
    assert sol.maxVacationDays(f2, d2) == 3, "test 2 failed"
    print("✓ maximum-vacation-days passed")

if __name__ == "__main__":
    test()
