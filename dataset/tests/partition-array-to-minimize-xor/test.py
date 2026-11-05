from typing import List

class Solution:
    def minXorSum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] ^ nums[i]
            
        def range_xor(i: int, j: int) -> int:
            return pref[j + 1] ^ pref[i]

        # dp[i][p]: min max-xor partitioning nums[:i] into p segments
        dp = [[float('inf')] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 0
        
        for p in range(1, k + 1):
            for i in range(p, n + 1):
                best = float('inf')
                for j in range(p - 1, i):
                    cost = max(dp[j][p - 1], range_xor(j, i - 1))
                    if cost < best:
                        best = cost
                dp[i][p] = best
                
        return dp[n][k]

def run_tests():
    s = Solution()
    res1 = s.minXorSum([1, 2, 3], 2) # [1], [2, 3] -> 1 and (2^3 = 1) -> max is 1
    assert res1 == 1, f"Expected 1, got {res1}"
    res2 = s.minXorSum([1, 2, 3], 3) # [1], [2], [3] -> max is 3
    assert res2 == 3, f"Expected 3, got {res2}"
    print("3599 partition-array-to-minimize-xor PASSED")

if __name__ == "__main__":
    run_tests()
