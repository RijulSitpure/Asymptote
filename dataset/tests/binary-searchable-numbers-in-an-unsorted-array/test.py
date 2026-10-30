class Solution:
    def binarySearchableNumbers(self, nums: list[int]) -> int:
        n = len(nums)
        suffix_min = [0] * n
        curr_min = float("inf")
        for i in range(n - 1, -1, -1):
            curr_min = min(curr_min, nums[i])
            suffix_min[i] = curr_min
            
        ans = 0
        curr_max = float("-inf")
        for i in range(n):
            if curr_max < nums[i] and nums[i] <= suffix_min[i]:
                ans += 1
            curr_max = max(curr_max, nums[i])
        return ans

def test_binary_searchable():
    sol = Solution()
    assert sol.binarySearchableNumbers([7]) == 1
    assert sol.binarySearchableNumbers([-1, 5, 2]) == 1

