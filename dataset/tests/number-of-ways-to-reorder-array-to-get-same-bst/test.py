import math

class Solution:
    def numOfWays(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        def count_ways(arr):
            if len(arr) <= 2: return 1
            root = arr[0]
            left = [x for x in arr[1:] if x < root]
            right = [x for x in arr[1:] if x > root]
            ways = math.comb(len(left) + len(right), len(left)) % MOD
            return (ways * count_ways(left) * count_ways(right)) % MOD
        return (count_ways(nums) - 1) % MOD

sol = Solution()
assert sol.numOfWays([2,1,3]) == 1
assert sol.numOfWays([3,4,5,1,2]) == 5
print("All tests passed successfully.")
