class Solution:
    def maximizeExpression(self, nums: list[int]) -> int:
        # Maximize nums[i] - nums[j] + nums[k] with i < j < k
        max_i = -float('inf')
        max_ij = -float('inf')
        max_ijk = -float('inf')
        for x in nums:
            if max_ij != -float('inf'):
                max_ijk = max(max_ijk, max_ij + x)
            if max_i != -float('inf'):
                max_ij = max(max_ij, max_i - x)
            max_i = max(max_i, x)
        return max_ijk

def run_tests():
    sol = Solution()
    # [1, 2, 3, 4] -> nums[0] - nums[1] + nums[3] = 1 - 2 + 4 = 3; or 2 - 3 + 4 = 3; 1 - 2 + 3 = 2
    assert sol.maximizeExpression([1, 2, 3, 4]) == 3
    # [10, 1, 20] -> 10 - 1 + 20 = 29
    assert sol.maximizeExpression([10, 1, 20]) == 29
    assert sol.maximizeExpression([5, 5, 5]) == 5 # 5 - 5 + 5 = 5
    print("All tests passed for 3745.")

if __name__ == "__main__":
    run_tests()