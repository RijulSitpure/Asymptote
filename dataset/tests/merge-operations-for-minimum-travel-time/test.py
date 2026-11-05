from typing import List

class Solution:
    def minTravelTime(self, l: int, n: int, k: int, position: List[int], time: List[int]) -> int:
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + time[i]

        memo = {}

        def dp(i: int, skips: int, last: int) -> int:
            if i == n - 1:
                return 0 if skips == 0 else float("inf")
            state = (i, skips, last)
            if state in memo:
                return memo[state]
            res = float("inf")
            rate = prefix[i + 1] - prefix[last]
            end = min(n - 1, i + skips + 1)
            for j in range(i + 1, end + 1):
                dist = position[j] - position[i]
                res = min(res, dist * rate + dp(j, skips - (j - i - 1), i + 1))
            memo[state] = res
            return res

        return dp(0, k, 0)

def run_tests():
    s = Solution()
    res = s.minTravelTime(10, 3, 1, [0, 5, 10], [2, 3, 1])
    assert res == 20, f"Expected 20, got {res}"
    print("3538 merge-operations-for-minimum-travel-time PASSED")

if __name__ == "__main__":
    run_tests()
