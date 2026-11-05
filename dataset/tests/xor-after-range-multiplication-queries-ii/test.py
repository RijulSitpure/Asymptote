from typing import List

class Solution:
    def xorQueries(self, nums: List[int], queries: List[List[int]]) -> int:
        MOD = 10**9 + 7
        for l, r, val in queries:
            for i in range(l, r + 1):
                nums[i] = (nums[i] * val) % MOD
        ans = 0
        for x in nums:
            ans ^= x
        return ans

def run_tests():
    sol = Solution()
    assert sol.xorQueries([1, 2, 3], [[0, 1, 2], [1, 2, 3]]) == 7
    assert sol.xorQueries([5], [[0, 0, 2]]) == 10
    print("All tests passed for 3655.")

if __name__ == "__main__":
    run_tests()
