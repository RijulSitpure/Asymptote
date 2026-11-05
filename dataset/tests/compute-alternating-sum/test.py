class Solution:
    def computeAlternatingSum(self, nums: list[int]) -> int:
        total = 0
        sign = 1
        for x in nums:
            total += sign * x
            sign = -sign
        return total

def run_tests():
    sol = Solution()
    assert sol.computeAlternatingSum([4, 2, 5, 3]) == 4 # 4 - 2 + 5 - 3 = 4
    assert sol.computeAlternatingSum([1]) == 1
    assert sol.computeAlternatingSum([10, 20]) == -10
    print("All tests passed for 3701.")

if __name__ == "__main__":
    run_tests()