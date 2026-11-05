
class Solution:
    def minCost(self, nums: list[int]) -> int:
        n = len(nums)
        memo = {}

        def dp(last: int, i: int) -> int:
            if i >= n:
                return nums[last]
            if i == n - 1:
                return max(nums[last], nums[i])
            state = (last, i)
            if state in memo:
                return memo[state]
            c1 = max(nums[i], nums[i + 1]) + dp(last, i + 2)
            c2 = max(nums[last], nums[i]) + dp(i + 1, i + 2)
            c3 = max(nums[last], nums[i + 1]) + dp(i, i + 2)
            res = min(c1, c2, c3)
            memo[state] = res
            return res

        return dp(0, 1)

def test_find_minimum_cost_to_remove_array_elements():
    sol = Solution()
    assert sol.minCost([6, 2, 8, 4]) == 12
    assert sol.minCost([2, 1, 3, 3]) == 5

if __name__ == '__main__':
    test_find_minimum_cost_to_remove_array_elements()
    print('All tests passed.')
