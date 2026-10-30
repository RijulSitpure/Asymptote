class Solution:
    def maxAlternatingSum(self, nums: list[int]) -> int:
        even_sum = 0
        odd_sum = 0
        for x in nums:
            new_even = max(even_sum, odd_sum + x)
            new_odd = max(odd_sum, even_sum - x)
            even_sum, odd_sum = new_even, new_odd
        return even_sum

def test_max_alternating():
    sol = Solution()
    assert sol.maxAlternatingSum([4, 2, 5, 3]) == 7
    assert sol.maxAlternatingSum([5, 6, 7, 8]) == 8
    assert sol.maxAlternatingSum([6, 2, 1, 2, 4, 5]) == 10

