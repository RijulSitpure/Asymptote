class Solution:
    def maxProduct(self, nums: list[int], target: int) -> int:
        # Replace one element in nums with target to maximize product of three distinct elements
        n = len(nums)
        best = -float('inf')
        for i in range(n):
            # Form candidate array by replacing nums[i] with target
            cand = nums[:i] + [target] + nums[i+1:]
            cand.sort()
            prod1 = cand[-1] * cand[-2] * cand[-3]
            prod2 = cand[0] * cand[1] * cand[-1]
            best = max(best, prod1, prod2)
        return best

def run_tests():
    sol = Solution()
    # [1, 2, 3] with target = 10 -> replace 1 with 10 gives 10*3*2 = 60
    assert sol.maxProduct([1, 2, 3], 10) == 60
    # [-10, -10, 1] with target = 2 -> replace 1 with 2 gives (-10)*(-10)*2 = 200
    assert sol.maxProduct([-10, -10, 1], 2) == 200
    print("All tests passed for 3732.")

if __name__ == "__main__":
    run_tests()